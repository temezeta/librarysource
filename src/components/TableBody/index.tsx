import React from 'react';
import styles from './TableBody.module.css';

interface TableBodyProps extends React.ComponentPropsWithRef<'tbody'> {}

class TableBody extends React.Component<TableBodyProps> {
    render(): JSX.Element {
        const { className, ...rest } = this.props;
        return (
            <tbody
                className={[styles.tableBody, className].join(' ')}
                {...rest}
            />
        );
    }
}

export default TableBody;
