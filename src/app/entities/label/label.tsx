import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../shared/reducers';
import { getEntities } from './label.reducer';

export interface ILabelProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ url: string }> {}

export class Label extends React.Component<ILabelProps> {
    componentDidMount() {
        this.props.getEntities();
    }

    render() {
        const { labelList, match } = this.props as any;
        return (
            <div>
                <h2 id="label-heading">
                    <Translate contentKey="jhiApp.label.home.title">Labels</Translate>
                    <Link
                        to={`${match.url}/new`}
                        className="btn btn-primary float-right jh-create-entity"
                        id="jh-create-entity">
                        <FontAwesomeIcon icon="plus" />
                        &nbsp;
                        <Translate contentKey="jhiApp.label.home.createLabel">
                            Create new Label
                        </Translate>
                    </Link>
                </h2>
                <div className="table-responsive">
                    {labelList && labelList.length > 0 ? (
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>
                                        <Translate contentKey="global.field.id">
                                            ID
                                        </Translate>
                                    </th>
                                    <th>
                                        <Translate contentKey="jhiApp.label.label">
                                            Label
                                        </Translate>
                                    </th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {labelList.map((label, i) => (
                                    <tr key={`entity-${i}`}>
                                        <td>
                                            <Button
                                                tag={Link}
                                                to={`${match.url}/${label.id}`}
                                                color="link"
                                                size="sm">
                                                {label.id}
                                            </Button>
                                        </td>
                                        <td>{label.label}</td>
                                        <td className="text-right">
                                            <div className="btn-group flex-btn-group-container">
                                                <Button
                                                    tag={Link}
                                                    to={`${match.url}/${label.id}`}
                                                    color="info"
                                                    size="sm">
                                                    <FontAwesomeIcon icon="eye" />{' '}
                                                    <span className="d-none d-md-inline">
                                                        <Translate contentKey="entity.action.view">
                                                            View
                                                        </Translate>
                                                    </span>
                                                </Button>
                                                <Button
                                                    tag={Link}
                                                    to={`${match.url}/${label.id}/edit`}
                                                    color="primary"
                                                    size="sm">
                                                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                                                    <span className="d-none d-md-inline">
                                                        <Translate contentKey="entity.action.edit">
                                                            Edit
                                                        </Translate>
                                                    </span>
                                                </Button>
                                                <Button
                                                    tag={Link}
                                                    to={`${match.url}/${label.id}/delete`}
                                                    color="danger"
                                                    size="sm">
                                                    <FontAwesomeIcon icon="trash" />{' '}
                                                    <span className="d-none d-md-inline">
                                                        <Translate contentKey="entity.action.delete">
                                                            Delete
                                                        </Translate>
                                                    </span>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="alert alert-warning">
                            <Translate contentKey="jhiApp.label.home.notFound">
                                No Labels found
                            </Translate>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ label }: IRootState) => ({
    labelList: label.entities
});

const mapDispatchToProps = {
    getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Label);
