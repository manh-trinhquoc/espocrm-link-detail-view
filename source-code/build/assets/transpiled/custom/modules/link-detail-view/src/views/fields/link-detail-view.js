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
    // editTemplate = 'fields/link/edit';
    editTemplate = 'link-detail-view:fields/link-detail-view/edit';
    data() {
      let parentScope = Espo.Utils.toDom(this.model.entityType);
      return {
        ...super.data(),
        parentId: this.model.get('id'),
        parentScope: parentScope
      };
    }
    setup() {
      super.setup.call(this);
      this.listenTo(this.model, 'change:' + this.idName, this.getForeignModel);
    }

    // Called after contents is added to the DOM.
    afterRender() {
      super.afterRender();
      this.getForeignModel();
    }
    getForeignModel() {
      let scope = this.foreignScope;
      let id = this.model.get(this.idName);
      if (!id) {
        this.clearView('recordDetail');
        return;
      }
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
          model.populateDefaults();
          model.set(data || {}, {
            silent: true
          });
          this.createForeignView(model);
        });
      });
    }
    createForeignView(model, options = {}) {
      console.log("createForeignView");
      console.log(options);
      console.log(this.readOnly);
      console.log(this.mode);
      console.log('isReadMode', this.isReadMode());
      console.log('isListMode', this.isListMode());
      console.log('isDetailMode', this.isDetailMode());
      console.log('isEditMode', this.isEditMode());
      console.log('isSearchMode', this.isSearchMode());
      let scope = this.foreignScope;
      let convertEntityViewName = this.getMetadata().get(['clientDefs', scope, 'recordViews', 'detail']) || 'views/record/detail';
      // .get(['clientDefs', scope, 'recordViews', 'edit']) || 'views/record/edit';
      let parentScope = Espo.Utils.toDom(this.model.entityType);
      let parentId = this.model.get('id');
      this.createView('recordDetail', convertEntityViewName, {
        model: model,
        // buttonsDisabled: true,
        buttonsDisabled: false,
        layoutName: 'detail',
        exit: () => {
          console.log("exit");
        },
        isWide: true,
        sideDisabled: true,
        bottomDisabled: true,
        portalLayoutDisabled: true,
        fullSelector: '#main .link-detail-view.parent-' + parentScope + '-' + parentId
      }, view => {
        view.render().then(() => {
          view.$el.find('.middle-tabs > button').click(e => {
            let tab = parseInt($(e.currentTarget).attr('data-tab'));
            view.selectTab(tab);
            e.stopPropagation();
          });
        });
      });
    }
  }
  var _default = _exports.default = LinkDetailView;
});
//# sourceMappingURL=link-detail-view.js.map ;