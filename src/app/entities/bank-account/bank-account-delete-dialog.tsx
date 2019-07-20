import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../shared/reducers';
import { getEntity, deleteEntity } from './bank-account.reducer';

export interface IBankAccountDeleteDialogProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ id: string }> {}

export class BankAccountDeleteDialog extends React.Component<
    IBankAccountDeleteDialogProps
> {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }

    confirmDelete = (event?: any) => {
        this.props.deleteEntity(this.props.bankAccountEntity.id);
        this.handleClose(event);
    };

    handleClose = (event?: any) => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { bankAccountEntity } = this.props as any;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="entity.delete.title">
                        Confirm delete operation
                    </Translate>
                </ModalHeader>
                <ModalBody id="jhiApp.bankAccount.delete.question">
                    <Translate
                        contentKey="jhiApp.bankAccount.delete.question"
                        interpolate={{ id: bankAccountEntity.id }}>
                        Are you sure you want to delete this BankAccount?
                    </Translate>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleClose}>
                        <FontAwesomeIcon icon="ban" />
                        &nbsp;
                        <Translate contentKey="entity.action.cancel">Cancel</Translate>
                    </Button>
                    <Button
                        id="jhi-confirm-delete-bankAccount"
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

const mapStateToProps = ({ bankAccount }: IRootState) => ({
    bankAccountEntity: bankAccount.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountDeleteDialog);
