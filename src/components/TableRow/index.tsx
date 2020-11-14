import React from 'react';
import styles from './TableRow.module.css';

interface TableRowProps extends React.ComponentPropsWithRef<'tr'> {}

class TableRow extends React.Component<TableRowProps> {
    render(): JSX.Element {
        const { className, ...rest } = this.props;
        return (
            <tr className={[styles.tableRow, className].join(' ')} {...rest} />
        );
    }
}

export default TableRow;
