import React from 'react';
import styles from './TableHead.module.css';

interface TableHeadProps extends React.ComponentPropsWithRef<'thead'> {}

class TableHead extends React.Component<TableHeadProps> {
    render(): JSX.Element {
        const { className, ...rest } = this.props;
        return (
            <thead
                className={[styles.tableHead, className].join(' ')}
                {...rest}
            />
        );
    }
}

export default TableHead;
