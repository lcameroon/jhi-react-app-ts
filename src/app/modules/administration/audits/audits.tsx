import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Input, Row, Table } from 'reactstrap';
import {
    Translate,
    TextFormat,
    JhiPagination,
    JhiItemCount,
    getSortState,
    IPaginationBaseState
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_TIMESTAMP_FORMAT } from '../../../config/constants';
import { ITEMS_PER_PAGE } from '../../../shared/util/pagination.constants';

import { IRootState } from '../../../shared/reducers';
import { getAudits } from '../administration.reducer';

export interface IAuditsPageProps
    extends StateProps,
        DispatchProps,
        RouteComponentProps<{}> {}

export interface IAuditsPageState extends IPaginationBaseState {
    fromDate: string;
    toDate: string;
}

const previousMonth = (): string => {
    const now: Date = new Date();
    const fromDate =
        now.getMonth() === 0
            ? new Date(now.getFullYear() - 1, 11, now.getDate())
            : new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return fromDate.toISOString().slice(0, 10);
};

const today = (): string => {
    // Today + 1 day - needed if the current day must be included
    const day: Date = new Date();
    day.setDate(day.getDate() + 1);
    const toDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return toDate.toISOString().slice(0, 10);
};

export class AuditsPage extends React.Component<IAuditsPageProps, IAuditsPageState> {
    state: IAuditsPageState = {
        ...getSortState(this.props.location, ITEMS_PER_PAGE),
        fromDate: previousMonth(),
        toDate: today()
    };

    componentDidMount() {
        this.getAudits();
    }

    onChangeFromDate = evt => {
        this.setState(
            {
                fromDate: evt.target.value
            },
            () => this.getAudits()
        );
    };
    onChangeToDate = evt => {
        this.setState(
            {
                toDate: evt.target.value
            },
            () => this.getAudits()
        );
    };

    sort = prop => () => {
        this.setState(
            {
                order: this.state.order === 'asc' ? 'desc' : 'asc',
                sort: prop
            },
            () => this.transition()
        );
    };

    transition = () => {
        this.getAudits();
        this.props.history.push(
            `${this.props.location.pathname}?page=${this.state.activePage}&sort=${this
                .state.sort},${this.state.order}`
        );
    };

    handlePagination = activePage =>
        this.setState({ activePage }, () => this.transition());

    getAudits = () => {
        const { activePage, itemsPerPage, sort, order, fromDate, toDate } = this.state;
        this.props.getAudits(
            activePage - 1,
            itemsPerPage,
            `${sort},${order}`,
            fromDate,
            toDate
        );
    };

    render() {
        const { audits, totalItems } = this.props as any;
        const { fromDate, toDate } = this.state;
        return (
            <div>
                <h2 id="audits-page-heading">Audits</h2>
                <span>
                    <Translate contentKey="audits.filter.from">from</Translate>
                </span>
                <Input
                    type="date"
                    value={fromDate}
                    onChange={this.onChangeFromDate}
                    name="fromDate"
                    id="fromDate"
                />
                <span>
                    <Translate contentKey="audits.filter.to">to</Translate>
                </span>
                <Input
                    type="date"
                    value={toDate}
                    onChange={this.onChangeToDate}
                    name="toDate"
                    id="toDate"
                />
                {audits && audits.length > 0 ? (
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th onClick={this.sort('auditEventDate')}>
                                    <Translate contentKey="audits.table.header.date">
                                        Date
                                    </Translate>
                                    <FontAwesomeIcon icon="sort" />
                                </th>
                                <th onClick={this.sort('principal')}>
                                    <Translate contentKey="audits.table.header.principal">
                                        User
                                    </Translate>
                                    <FontAwesomeIcon icon="sort" />
                                </th>
                                <th onClick={this.sort('auditEventType')}>
                                    <Translate contentKey="audits.table.header.status">
                                        State
                                    </Translate>
                                    <FontAwesomeIcon icon="sort" />
                                </th>
                                <th>
                                    <Translate contentKey="audits.table.header.data">
                                        Extra data
                                    </Translate>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {audits.map((audit: any, i) => (
                                <tr key={`audit-${i}`}>
                                    <td>
                                        {
                                            <TextFormat
                                                value={audit.timestamp}
                                                type="date"
                                                format={APP_TIMESTAMP_FORMAT}
                                            />
                                        }
                                    </td>
                                    <td>{audit.principal}</td>
                                    <td>{audit.type}</td>
                                    <td>
                                        {audit.data ? audit.data.message : null}
                                        {audit.data ? audit.data.remoteAddress : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <div className="alert alert-warning">
                        <Translate contentKey="audits.notFound">No audit found</Translate>
                    </div>
                )}
                <div className={audits && audits.length > 0 ? '' : 'd-none'}>
                    <Row className="justify-content-center">
                        <JhiItemCount
                            page={this.state.activePage}
                            total={totalItems}
                            itemsPerPage={this.state.itemsPerPage}
                            i18nEnabled
                        />
                    </Row>
                    <Row className="justify-content-center">
                        <JhiPagination
                            activePage={this.state.activePage}
                            onSelect={this.handlePagination}
                            maxButtons={5}
                            itemsPerPage={this.state.itemsPerPage}
                            totalItems={this.props.totalItems}
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    audits: storeState.administration.audits,
    totalItems: storeState.administration.totalItems
});

const mapDispatchToProps = { getAudits };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AuditsPage);
