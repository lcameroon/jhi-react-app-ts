import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../shared/reducers';
import { getEntity } from './bank-account.reducer';

export interface IBankAccountDetailProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ id: string }> {}

export class BankAccountDetail extends React.Component<IBankAccountDetailProps> {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }

    render() {
        const { bankAccountEntity } = this.props as any;
        return (
            <Row>
                <Col md="8">
                    <h2>
                        <Translate contentKey="jhiApp.bankAccount.detail.title">
                            BankAccount
                        </Translate>{' '}
                        [
                        <b>{bankAccountEntity.id}</b>]
                    </h2>
                    <dl className="jh-entity-details">
                        <dt>
                            <span id="name">
                                <Translate contentKey="jhiApp.bankAccount.name">
                                    Name
                                </Translate>
                            </span>
                        </dt>
                        <dd>{bankAccountEntity.name}</dd>
                        <dt>
                            <span id="balance">
                                <Translate contentKey="jhiApp.bankAccount.balance">
                                    Balance
                                </Translate>
                            </span>
                        </dt>
                        <dd>{bankAccountEntity.balance}</dd>
                        <dt>
                            <Translate contentKey="jhiApp.bankAccount.user">
                                User
                            </Translate>
                        </dt>
                        <dd>
                            {bankAccountEntity.userLogin ? (
                                bankAccountEntity.userLogin
                            ) : (
                                ''
                            )}
                        </dd>
                    </dl>
                    <Button tag={Link} to="/entity/bank-account" replace color="info">
                        <FontAwesomeIcon icon="arrow-left" />{' '}
                        <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.back">Back</Translate>
                        </span>
                    </Button>
                    &nbsp;
                    <Button
                        tag={Link}
                        to={`/entity/bank-account/${bankAccountEntity.id}/edit`}
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

const mapStateToProps = ({ bankAccount }: IRootState) => ({
    bankAccountEntity: bankAccount.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountDetail);
