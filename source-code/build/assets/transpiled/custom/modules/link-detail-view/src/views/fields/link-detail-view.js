define("modules/link-detail-view/views/fields/link-detail-view", ["exports", "views/fields/link"], function (_exports, _link) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _link = _interopRequireDefault(_link);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  console.log("LinkDetailView");
  class LinkDetailView extends _link.default {
    detailTemplate = 'link-detail-view:fields/link-detail-view/detail';
    /** @inheritDoc */
    editTemplate = 'fields/link/edit';
    data() {
      let scopeValue = Espo.Utils.toDom(this.foreignScope);
      return {
        ...super.data(),
        scopeValue: scopeValue
      };
    }
    events = {
      /** @this LinkFieldView */
      'auxclick a[href]:not([role="button"])': function (e) {
        if (!this.isReadMode()) {
          return;
        }
        let isCombination = e.button === 1 && (e.ctrlKey || e.metaKey);
        if (!isCombination) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        this.quickView();
      }
    };
    setup() {
      super.setup.call(this);
      this.getForeignModel();
    }
    getForeignModel() {
      let scope = this.foreignScope;
      let id = this.model.get(this.idName);
      if (this.getMetadata().get(['scopes', scope, 'disabled'])) {
        return;
      }
      if (!this.getAcl().check(scope, 'view')) {
        return;
      }
      Espo.Ajax.getRequest(scope + '/' + id, {
        // get params
      }).then(data => {
        this.getModelFactory().create(scope, model => {
          // console.log("model", model);
          model.populateDefaults();
          model.set(data || {}, {
            silent: true
          });
          let convertEntityViewName = this.getMetadata().get(['clientDefs', scope, 'recordViews', 'detail']) || 'views/record/detail';
          // .get(['clientDefs', scope, 'recordViews', 'edit']) || 'views/record/edit';

          this.createView('recordDetail', convertEntityViewName, {
            model: model,
            buttonsPosition: false,
            buttonsDisabled: true,
            layoutName: 'detail',
            exit: () => {},
            isWide: true,
            sideDisabled: true,
            bottomDisabled: true,
            portalLayoutDisabled: true,
            fullSelector: '#main .link-detail-view-' + Espo.Utils.toDom(scope) + '-' + id
          }, view => {
            view.render().then(() => {
              view.$el.find('.middle-tabs > button').click(e => {
                let tab = parseInt($(e.currentTarget).attr('data-tab'));
                view.selectTab(tab);
                e.stopPropagation();
              });
            });
          });
        });
      });
    }
  }
  var _default = _exports.default = LinkDetailView;
});
//# sourceMappingURL=link-detail-view.js.map ;