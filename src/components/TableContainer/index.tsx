import React from 'react';
import styles from './TableContainer.module.css';

interface TableContainerProps extends React.ComponentPropsWithRef<'table'> {}

class TableContainer extends React.Component<TableContainerProps> {
    render(): JSX.Element {
        const { className, ...rest } = this.props;
        return (
            <table
                className={[styles.tableContainer, className].join(' ')}
                {...rest}
            />
        );
    }
}

export default TableContainer;
