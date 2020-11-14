import React from 'react';
import styles from './TableHeadCell.module.css';

interface TableHeadCellProps extends React.ComponentPropsWithRef<'th'> {}

class TableHeadCell extends React.Component<TableHeadCellProps> {
    render(): JSX.Element {
        const { className, ...rest } = this.props;
        return (
            <th
                className={[styles.tableHeadCell, className].join(' ')}
                {...rest}
            />
        );
    }
}

export default TableHeadCell;
