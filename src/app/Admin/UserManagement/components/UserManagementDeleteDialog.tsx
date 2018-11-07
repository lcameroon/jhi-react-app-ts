import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, deleteUser, selectUserManagementUser } from '../reducer';
import { IRootState } from '../../../rootReducer';

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

    confirmDelete = event => {
        this.props.deleteUser(this.props.user.login);
        this.handleClose(event);
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    render() {
        return (
            <Modal isOpen toggle={this.handleClose}>
                <ModalHeader toggle={this.handleClose}>
                    Confirm delete operation
                </ModalHeader>
                <ModalBody>Are you sure you want to delete this User?</ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleClose}>
                        <FontAwesomeIcon icon="ban" />&nbsp; Cancel
                    </Button>
                    <Button color="danger" onClick={this.confirmDelete}>
                        <FontAwesomeIcon icon="trash" />&nbsp; Delete
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (store: IRootState) => ({
    user: selectUserManagementUser(store)
});

const mapDispatchToProps = { getUser, deleteUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDeleteDialog);
