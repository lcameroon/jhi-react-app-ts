import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TextFormat } from '../../../shared/components';
import { APP_DATE_FORMAT } from '../../../shared/constants';
import {
    getUsers,
    updateUser,
    selectUserManagementUsers,
    selectUserManagementTotalItems
} from '../reducer';
import { IRootState } from '../../../rootReducer';
import { selectAuthAccount } from 'src/app/Auth/reducers';

export interface IUserManagementProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{}> {}

export class UserManagement extends React.Component<IUserManagementProps> {
    state = {
        activePage: null,
        itemsPerPage: null,
        sort: null,
        order: null,
        ...this.props.location
    };

    componentDidMount() {
        this.getUsers();
    }

    sort = prop => () => {
        this.setState(
            {
                order: this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            },
            () => this.sortUsers()
        );
    };

    sortUsers() {
        this.getUsers();
        this.props.history.push(
            `${this.props.location.pathname}?page=${this.state.activePage}&sort=${this
                .state.sort},${this.state.order}`
        );
    }

    handlePagination = activePage =>
        this.setState({ activePage }, () => this.sortUsers());

    getUsers = () => {
        const { activePage, itemsPerPage, sort, order } = this.state;
        this.props.getUsers(activePage - 1, itemsPerPage, `${sort},${order}`);
    };

    toggleActive = user => () => {
        this.props.updateUser({
            ...user,
            activated: !user.activated
        });
    };

    render() {
        const { users, account, match } = this.props;
        return (
            <div>
                <h2 className="userManagement-page-heading">
                    Users
                    <Link
                        to={`${match.url}/new`}
                        className="btn btn-primary float-right jh-create-entity">
                        <FontAwesomeIcon icon="plus" /> Create a new user
                    </Link>
                </h2>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th className="hand" onClick={this.sort('id')}>
                                ID
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('login')}>
                                Login
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('email')}>
                                Email
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            <th />
                            <th className="hand" onClick={this.sort('langKey')}>
                                Lang Key
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>Profiles</th>
                            <th className="hand" onClick={this.sort('createdDate')}>
                                Created Date
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('lastModifiedBy')}>
                                Last Modified By
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={this.sort('lastModifiedDate')}>
                                Last Modified Date
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr id={user.login} key={`user-${i}`}>
                                <td>
                                    <Button
                                        tag={Link}
                                        to={`${match.url}/${user.login}`}
                                        color="link"
                                        size="sm">
                                        {user.id}
                                    </Button>
                                </td>
                                <td>{user.login}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.activated ? (
                                        <Button
                                            color="success"
                                            onClick={this.toggleActive(user)}>
                                            Activated
                                        </Button>
                                    ) : (
                                        <Button
                                            color="danger"
                                            onClick={this.toggleActive(user)}>
                                            Deactivated
                                        </Button>
                                    )}
                                </td>
                                <td>{user.langKey}</td>
                                <td>
                                    {user.authorities ? (
                                        user.authorities.map((authority, j) => (
                                            <div key={`user-auth-${i}-${j}`}>
                                                <Badge color="info">{authority}</Badge>
                                            </div>
                                        ))
                                    ) : null}
                                </td>
                                <td>
                                    <TextFormat
                                        value={user.createdDate}
                                        type="date"
                                        format={APP_DATE_FORMAT}
                                        blankOnInvalid
                                    />
                                </td>
                                <td>{user.lastModifiedBy}</td>
                                <td>
                                    <TextFormat
                                        value={user.lastModifiedDate}
                                        type="date"
                                        format={APP_DATE_FORMAT}
                                        blankOnInvalid
                                    />
                                </td>
                                <td className="text-right">
                                    <div className="btn-group flex-btn-group-container">
                                        <Button
                                            tag={Link}
                                            to={`${match.url}/${user.id}`}
                                            color="info"
                                            size="sm">
                                            <FontAwesomeIcon icon="eye" />{' '}
                                            <span className="d-none d-md-inline">
                                                View
                                            </span>
                                        </Button>
                                        <Button
                                            tag={Link}
                                            to={`${match.url}/${user.id}/edit`}
                                            color="primary"
                                            size="sm">
                                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                                            <span className="d-none d-md-inline">
                                                Edit
                                            </span>
                                        </Button>
                                        <Button
                                            tag={Link}
                                            to={`${match.url}/${user.id}/delete`}
                                            color="danger"
                                            size="sm"
                                            disabled={account.login === user.login}>
                                            <FontAwesomeIcon icon="trash" />{' '}
                                            <span className="d-none d-md-inline">
                                                Delete
                                            </span>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (store: IRootState) => ({
    users: selectUserManagementUsers(store),
    totalItems: selectUserManagementTotalItems(store),
    account: selectAuthAccount(store)
});

const mapDispatchToProps = { getUsers, updateUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
