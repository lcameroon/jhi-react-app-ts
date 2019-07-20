import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../shared/reducers';
import { getEntity } from './label.reducer';

export interface ILabelDetailProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ id: string }> {}

export class LabelDetail extends React.Component<ILabelDetailProps> {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }

    render() {
        const { labelEntity } = this.props as any;
        return (
            <Row>
                <Col md="8">
                    <h2>
                        <Translate contentKey="jhiApp.label.detail.title">
                            Label
                        </Translate>{' '}
                        [<b>{labelEntity.id}</b>]
                    </h2>
                    <dl className="jh-entity-details">
                        <dt>
                            <span id="label">
                                <Translate contentKey="jhiApp.label.label">
                                    Label
                                </Translate>
                            </span>
                        </dt>
                        <dd>{labelEntity.label}</dd>
                    </dl>
                    <Button tag={Link} to="/entity/label" replace color="info">
                        <FontAwesomeIcon icon="arrow-left" />{' '}
                        <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.back">Back</Translate>
                        </span>
                    </Button>
                    &nbsp;
                    <Button
                        tag={Link}
                        to={`/entity/label/${labelEntity.id}/edit`}
                        replace
                        color="primary">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({ label }: IRootState) => ({
    labelEntity: label.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LabelDetail);
