import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, deleteUser } from './user-management.reducer';
import { IRootState } from '../../../shared/reducers';

export interface IUserManagementDeleteDialogProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ login: string }> {}

export class UserManagementDeleteDialog extends React.Component<
    IUserManagementDeleteDialogProps
> {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }

    confirmDelete = (event?: any) => {
        this.props.deleteUser(this.props.user.login);
        this.handleClose(event);
    };

    handleClose = (event?: any) => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        const { user } = this.props as any;
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="entity.delete.title">
                        Confirm delete operation
                    </Translate>
                </ModalHeader>
                <ModalBody>
                    <Translate
                        contentKey="userManagement.delete.question"
                        interpolate={{ login: user.login }}>
                        Are you sure you want to delete this User?
                    </Translate>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleClose}>
                        <FontAwesomeIcon icon="ban" />
                        &nbsp;
                        <Translate contentKey="entity.action.cancel">Cancel</Translate>
                    </Button>
                    <Button color="danger" onClick={this.confirmDelete}>
                        <FontAwesomeIcon icon="trash" />
                        &nbsp;
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    user: storeState.userManagement.user
});

const mapDispatchToProps = { getUser, deleteUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDeleteDialog);
