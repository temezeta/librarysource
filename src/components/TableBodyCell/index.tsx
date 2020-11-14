import React from 'react';
import styles from './TableBodyCell.module.css';

interface TableBodyCellProps extends React.ComponentPropsWithRef<'td'> {}

class TableBodyCell extends React.Component<TableBodyCellProps> {
    render(): JSX.Element {
        const { className, ...rest } = this.props;
        return (
            <td
                className={[styles.tableBodyCell, className].join(' ')}
                {...rest}
            />
        );
    }
}

export default TableBodyCell;
