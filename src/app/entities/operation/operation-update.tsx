import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from '../../shared/reducers';
import { getEntities as getBankAccounts } from '../../entities/bank-account/bank-account.reducer';
import { getEntities as getLabels } from '../../entities/label/label.reducer';
import { getEntity, updateEntity, createEntity, reset } from './operation.reducer';
import {
    convertDateTimeFromServer,
    convertDateTimeToServer
} from '../../shared/util/date-utils';
import { mapIdList } from '../../shared/util/entity-utils';

export interface IOperationUpdateProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{ id: string }> {}

export interface IOperationUpdateState {
    isNew: boolean;
    idslabel: any[];
    bankAccountId: string;
}

export class OperationUpdate extends React.Component<
    IOperationUpdateProps,
    IOperationUpdateState
> {
    constructor(props) {
        super(props);
        this.state = {
            idslabel: [],
            bankAccountId: '0',
            isNew: !this.props.match.params || !this.props.match.params.id
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (
            nextProps.updateSuccess !== this.props.updateSuccess &&
            nextProps.updateSuccess
        ) {
            this.handleClose();
        }
    }

    componentDidMount() {
        if (!this.state.isNew) {
            this.props.getEntity(this.props.match.params.id);
        }

        this.props.getBankAccounts();
        this.props.getLabels();
    }

    saveEntity = (event, errors, values) => {
        values.date = convertDateTimeToServer(values.date);

        if (errors.length === 0) {
            const { operationEntity } = this.props as any;
            const entity = {
                ...operationEntity,
                ...values,
                labels: mapIdList(values.labels)
            };

            if (this.state.isNew) {
                this.props.createEntity(entity);
            } else {
                this.props.updateEntity(entity);
            }
        }
    };

    handleClose = () => {
        this.props.history.push('/entity/operation');
    };

    render() {
        const { operationEntity, bankAccounts, labels, loading, updating } = this
            .props as any;
        const { isNew } = this.state;

        return (
            <div>
                <Row className="justify-content-center">
                    <Col md="8">
                        <h2 id="jhiApp.operation.home.createOrEditLabel">
                            <Translate contentKey="jhiApp.operation.home.createOrEditLabel">
                                Create or edit a Operation
                            </Translate>
                        </h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <AvForm
                                model={isNew ? {} : operationEntity}
                                onSubmit={this.saveEntity}>
                                {!isNew ? (
                                    <AvGroup>
                                        <Label for="operation-id">
                                            <Translate contentKey="global.field.id">
                                                ID
                                            </Translate>
                                        </Label>
                                        <AvInput
                                            id="operation-id"
                                            type="text"
                                            className="form-control"
                                            name="id"
                                            required
                                            readOnly
                                        />
                                    </AvGroup>
                                ) : null}
                                <AvGroup>
                                    <Label id="dateLabel" for="operation-date">
                                        <Translate contentKey="jhiApp.operation.date">
                                            Date
                                        </Translate>
                                    </Label>
                                    <AvInput
                                        id="operation-date"
                                        type="datetime-local"
                                        className="form-control"
                                        name="date"
                                        placeholder={'YYYY-MM-DD HH:mm'}
                                        value={
                                            isNew ? null : (
                                                convertDateTimeFromServer(
                                                    this.props.operationEntity.date
                                                )
                                            )
                                        }
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: translate(
                                                    'entity.validation.required'
                                                )
                                            }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label
                                        id="descriptionLabel"
                                        for="operation-description">
                                        <Translate contentKey="jhiApp.operation.description">
                                            Description
                                        </Translate>
                                    </Label>
                                    <AvField
                                        id="operation-description"
                                        type="text"
                                        name="description"
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label id="amountLabel" for="operation-amount">
                                        <Translate contentKey="jhiApp.operation.amount">
                                            Amount
                                        </Translate>
                                    </Label>
                                    <AvField
                                        id="operation-amount"
                                        type="text"
                                        name="amount"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: translate(
                                                    'entity.validation.required'
                                                )
                                            },
                                            number: {
                                                value: true,
                                                errorMessage: translate(
                                                    'entity.validation.number'
                                                )
                                            }
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup>
                                    <Label for="operation-bankAccount">
                                        <Translate contentKey="jhiApp.operation.bankAccount">
                                            Bank Account
                                        </Translate>
                                    </Label>
                                    <AvInput
                                        id="operation-bankAccount"
                                        type="select"
                                        className="form-control"
                                        name="bankAccountId">
                                        <option value="" key="0" />
                                        {bankAccounts ? (
                                            bankAccounts.map(otherEntity => (
                                                <option
                                                    value={otherEntity.id}
                                                    key={otherEntity.id}>
                                                    {otherEntity.name}
                                                </option>
                                            ))
                                        ) : null}
                                    </AvInput>
                                </AvGroup>
                                <AvGroup>
                                    <Label for="operation-label">
                                        <Translate contentKey="jhiApp.operation.label">
                                            Label
                                        </Translate>
                                    </Label>
                                    <AvInput
                                        id="operation-label"
                                        type="select"
                                        multiple
                                        className="form-control"
                                        name="labels"
                                        value={
                                            operationEntity.labels &&
                                            operationEntity.labels.map(e => e.id)
                                        }>
                                        <option value="" key="0" />
                                        {labels ? (
                                            labels.map(otherEntity => (
                                                <option
                                                    value={otherEntity.id}
                                                    key={otherEntity.id}>
                                                    {otherEntity.label}
                                                </option>
                                            ))
                                        ) : null}
                                    </AvInput>
                                </AvGroup>
                                <Button
                                    tag={Link}
                                    id="cancel-save"
                                    to="/entity/operation"
                                    replace
                                    color="info">
                                    <FontAwesomeIcon icon="arrow-left" />
                                    &nbsp;
                                    <span className="d-none d-md-inline">
                                        <Translate contentKey="entity.action.back">
                                            Back
                                        </Translate>
                                    </span>
                                </Button>
                                &nbsp;
                                <Button
                                    color="primary"
                                    id="save-entity"
                                    type="submit"
                                    disabled={updating}>
                                    <FontAwesomeIcon icon="save" />
                                    &nbsp;
                                    <Translate contentKey="entity.action.save">
                                        Save
                                    </Translate>
                                </Button>
                            </AvForm>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    bankAccounts: storeState.bankAccount.entities,
    labels: storeState.label.entities,
    operationEntity: storeState.operation.entity,
    loading: storeState.operation.loading,
    updating: storeState.operation.updating,
    updateSuccess: storeState.operation.updateSuccess
});

const mapDispatchToProps = {
    getBankAccounts,
    getLabels,
    getEntity,
    updateEntity,
    createEntity,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OperationUpdate);
