import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../shared/reducers';
import { getEntity, deleteEntity } from './label.reducer';

export interface ILabelDeleteDialogProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ id: string }> {}

export class LabelDeleteDialog extends React.Component<ILabelDeleteDialogProps> {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }

    confirmDelete = (event?: any) => {
        this.props.deleteEntity(this.props.labelEntity.id);
        this.handleClose(event);
    };

    handleClose = (event?: any) => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { labelEntity } = this.props as any;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="entity.delete.title">
                        Confirm delete operation
                    </Translate>
                </ModalHeader>
                <ModalBody id="jhiApp.label.delete.question">
                    <Translate
                        contentKey="jhiApp.label.delete.question"
                        interpolate={{ id: labelEntity.id }}>
                        Are you sure you want to delete this Label?
                    </Translate>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleClose}>
                        <FontAwesomeIcon icon="ban" />
                        &nbsp;
                        <Translate contentKey="entity.action.cancel">Cancel</Translate>
                    </Button>
                    <Button
                        id="jhi-confirm-delete-label"
                        color="danger"
                        onClick={this.confirmDelete}>
                        <FontAwesomeIcon icon="trash" />
                        &nbsp;
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = ({ label }: IRootState) => ({
    labelEntity: label.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LabelDeleteDialog);
