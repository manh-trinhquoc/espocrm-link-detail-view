define("modules/link-detail-view/views/fields/link-detail-view", ["exports", "views/fields/link", "helpers/record-modal"], function (_exports, _link, _recordModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _link = _interopRequireDefault(_link);
  _recordModal = _interopRequireDefault(_recordModal);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  // import BaseFieldView from 'views/fields/base';

  console.log("LinkDetailView");
  class LinkDetailView extends _link.default {
    detailTemplate = 'link-detail-view:fields/link-detail-view/detail';
    /** @inheritDoc */
    editTemplate = 'fields/link/edit';
    setup() {
      super.setup.call(this);
      this.getForeignModel();
    }
    getForeignModel() {
      let leadModel = this.model;
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
          console.log("model", model);
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
            layoutName: 'detailConvert',
            exit: () => {}
          }, view => {
            // this.wait(false);
            console.log("detailConvert");
            console.log("view", view);
            this.reRender();
          });
        });
      });
    }
  }
  var _default = _exports.default = LinkDetailView;
});
//# sourceMappingURL=link-detail-view.js.map ;