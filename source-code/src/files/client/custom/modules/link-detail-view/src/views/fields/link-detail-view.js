// import BaseFieldView from 'views/fields/base';
import LinkFieldView from 'views/fields/link';
import RecordModal from 'helpers/record-modal';

console.log("LinkDetailView");

class LinkDetailView extends LinkFieldView {

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

                let convertEntityViewName = this.getMetadata()
                    .get(['clientDefs', scope, 'recordViews', 'detail']) || 'views/record/detail';
                // .get(['clientDefs', scope, 'recordViews', 'edit']) || 'views/record/edit';


                this.createView('recordDetail', convertEntityViewName, {
                    model: model,
                    buttonsPosition: false,
                    buttonsDisabled: true,
                    layoutName: 'detailConvert',
                    exit: () => {},
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

export default LinkDetailView;
