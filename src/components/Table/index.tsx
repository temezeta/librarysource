import React from 'react';
import { SortOrder } from '../../common/enums';
import { Dictionary } from '../../common/types';
import Checkbox from '../Checkbox';
import TableBody from '../TableBody';
import TableBodyCell from '../TableBodyCell';
import TableContainer from '../TableContainer';
import TableHead from '../TableHead';
import TableHeadCell from '../TableHeadCell';
import TableRow from '../TableRow';
import styles from './Table.module.css';

interface TableHeader {
    label: React.ReactNode;
    key: string;
}

interface TableProps {
    /**
     * @param {Array.<Object.<string>>} inputData Array of key-value pairs, key needs to match value headers-array
     */
    inputData: Dictionary<string | number | undefined>[];
    /**
     * Label: displayed value, key: key used for the column
     * @param {Array.<TableHeader>} headers Array of TableHeader-objects
     * */
    headers: TableHeader[];
    /**
     * @param {boolean} sortable Makes table sortable by column
     * */
    sortable?: boolean;
    /**
     * @param {boolean} rowSelect Makes table rows selectable
     * */
    rowSelect?: boolean;
    /**
     * @param {Function} onSelectedRowsChange Returns values for selected rows when it changes
     * */
    onSelectedRowsChange?: (
        selectedRows: Dictionary<string | number | undefined>[]
    ) => void;
}

interface TableState {
    selectedHeader?: string;
    sortDirection?: SortOrder;
    selectedRowIds: number[];
    dataWithUniqueKey: (Dictionary<string | number | undefined> & {
        UNIQUE_ID: number;
    })[];
    data: (Dictionary<string | number | undefined> & {
        UNIQUE_ID: number;
    })[];
}

class Table extends React.Component<TableProps, TableState> {
    constructor(props: TableProps) {
        super(props);
        this.handleSortByColumn = this.handleSortByColumn.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
        this.handleSelectAllRows = this.handleSelectAllRows.bind(this);
        this.flipSortDirection = this.flipSortDirection.bind(this);
        this.sortByHeader = this.sortByHeader.bind(this);
        this.renderSortedRowIndicator = this.renderSortedRowIndicator.bind(
            this
        );
        this.isSelected = this.isSelected.bind(this);
        this.handleUpdateData = this.handleUpdateData.bind(this);
        this.state = {
            selectedRowIds: [],
            dataWithUniqueKey: [],
            data: []
        };
    }

    componentDidMount(): void {
        this.handleUpdateData();
    }

    componentDidUpdate(prevProps: TableProps, prevState: TableState): void {
        if (
            this.props.onSelectedRowsChange &&
            JSON.stringify(prevState.selectedRowIds) !==
                JSON.stringify(this.state.selectedRowIds)
        ) {
            this.props.onSelectedRowsChange(
                this.props.inputData.filter((x, i) =>
                    this.state.selectedRowIds.some((it) => it === i)
                        ? x
                        : undefined
                )
            );
        }
        if (
            prevState.sortDirection !== this.state.sortDirection ||
            prevState.selectedHeader !== this.state.selectedHeader ||
            prevProps.inputData !== this.props.inputData
        )
            this.handleUpdateData();
    }

    handleUpdateData(): void {
        // Insert unique identifier to each data entry
        const dataWithKey = this.props.inputData.map((it, i) =>
            Object.assign(it, { UNIQUE_ID: i })
        );
        // Sort data if sortable
        const data =
            this.props.sortable && this.state.sortDirection !== undefined
                ? dataWithKey.sort(this.handleSortByColumn)
                : dataWithKey;
        this.setState({
            ...this.state,
            dataWithUniqueKey: dataWithKey,
            data: data
        });
    }

    // Compare row values for select column
    handleSortByColumn(
        a: Dictionary<string | number | undefined>,
        b: Dictionary<string | number | undefined>
    ): number {
        const value1 = a[this.state.selectedHeader ?? 'UNIQUE_ID'];
        const value2 = b[this.state.selectedHeader ?? 'UNIQUE_ID'];
        if (value1 !== undefined && value2 !== undefined) {
            if (value1 > value2) {
                return this.state.sortDirection === SortOrder.ASC ? 1 : -1;
            } else if (value1 < value2) {
                return this.state.sortDirection === SortOrder.ASC ? -1 : 1;
            }
            return 0;
        } else {
            if (value2 !== undefined && value1 === undefined) {
                return this.state.sortDirection === SortOrder.ASC ? 1 : -1;
            } else {
                return this.state.sortDirection === SortOrder.ASC ? -1 : 1;
            }
        }
    }

    // Handle select for single row
    handleSelectRow(row: Dictionary<number | string | undefined>): void {
        const id = row['UNIQUE_ID'] as number;
        const selectedIndex = this.state.selectedRowIds.indexOf(id);
        let newSelectedIds: number[] = [];
        // Add to back if not found
        if (selectedIndex === -1) {
            newSelectedIds = newSelectedIds.concat(
                this.state.selectedRowIds,
                id
            );
            //Remove from front
        } else if (selectedIndex === 0) {
            newSelectedIds = newSelectedIds.concat(
                this.state.selectedRowIds.slice(1)
            );
            //Remove from back
        } else if (selectedIndex === this.state.selectedRowIds.length - 1) {
            newSelectedIds = newSelectedIds.concat(
                this.state.selectedRowIds.slice(0, -1)
            );
            // Remove from middle
        } else if (selectedIndex > 0) {
            newSelectedIds = newSelectedIds.concat(
                this.state.selectedRowIds.slice(0, selectedIndex),
                this.state.selectedRowIds.slice(selectedIndex + 1)
            );
        }
        this.setState({ ...this.state, selectedRowIds: newSelectedIds });
    }

    // Handle select for all rows
    handleSelectAllRows(isChecked: boolean): void {
        if (isChecked) {
            const uniqueIds = this.state.dataWithUniqueKey.map(
                (it) => it['UNIQUE_ID'] as number
            );
            this.setState({
                ...this.state,
                selectedRowIds: uniqueIds
            });
            return;
        }
        this.setState({
            ...this.state,
            selectedRowIds: []
        });
    }

    // Change sort order from ASC to DESC and vice versa
    flipSortDirection(): SortOrder | undefined {
        if (this.state.sortDirection === undefined) {
            return SortOrder.ASC;
        } else if (this.state.sortDirection === SortOrder.ASC) {
            return SortOrder.DESC;
        } else {
            return undefined;
        }
    }

    // Change header which table is sorted by
    sortByHeader(header: TableHeader): void {
        if (
            this.state.selectedHeader === header.key &&
            this.state.sortDirection === SortOrder.DESC
        ) {
            this.setState({
                ...this.state,
                selectedHeader: undefined,
                sortDirection:
                    this.state.selectedHeader === header.key
                        ? this.flipSortDirection()
                        : SortOrder.ASC
            });
        } else {
            this.setState({
                ...this.state,
                selectedHeader: header.key,
                sortDirection:
                    this.state.selectedHeader === header.key
                        ? this.flipSortDirection()
                        : SortOrder.ASC
            });
        }
    }

    // Render simple indicator for header which the table is sorted by
    renderSortedRowIndicator(headerKey: string): React.ReactNode | null {
        if (
            !this.props.sortable ||
            (this.props.sortable && this.state.selectedHeader !== headerKey)
        ) {
            return null;
        }
        return this.state.sortDirection === SortOrder.ASC ? '\u25B2' : '\u25BC';
    }

    // Check if row is selected
    isSelected(row: Dictionary<string | number | undefined>): boolean {
        return (
            this.state.selectedRowIds.indexOf(row['UNIQUE_ID'] as number) !== -1
        );
    }

    render(): JSX.Element {
        return (
            <TableContainer>
                <TableHead>
                    <TableRow key={`th`}>
                        {this.props.rowSelect ? (
                            <TableHeadCell>
                                <Checkbox
                                    ariaLabel='Select all'
                                    onChange={this.handleSelectAllRows}
                                    indeterminate={
                                        this.state.selectedRowIds.length !==
                                            0 &&
                                        this.state.selectedRowIds.length <
                                            this.state.data.length
                                    }
                                    checked={
                                        this.state.selectedRowIds.length ===
                                        this.state.data.length
                                    }
                                />
                            </TableHeadCell>
                        ) : null}
                        {this.props.headers.map((header, i) => (
                            <TableHeadCell
                                onClick={
                                    this.props.sortable
                                        ? () => this.sortByHeader(header)
                                        : undefined
                                }
                                key={`thc-${i}`}
                            >
                                <React.Fragment>
                                    <span
                                        className={
                                            this.props.sortable
                                                ? styles.sortableHeaderText
                                                : undefined
                                        }
                                    >
                                        {this.renderSortedRowIndicator(
                                            header.key
                                        )}
                                        {header.label}
                                    </span>
                                </React.Fragment>
                            </TableHeadCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.data.map((row, i) => (
                        <TableRow key={`tb-${i}`}>
                            {this.props.rowSelect ? (
                                <TableBodyCell>
                                    <Checkbox
                                        ariaLabel={`Select row number ${i}`}
                                        checked={this.isSelected(row)}
                                        onChange={() =>
                                            this.handleSelectRow(row)
                                        }
                                    />
                                </TableBodyCell>
                            ) : null}
                            {this.props.headers.map((header, index) => (
                                <TableBodyCell key={`tbc-${index}`}>
                                    {row[header.key]}
                                </TableBodyCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        );
    }
}

export default Table;
