import React from 'react';
import CheckBoxIconChecked from '../../icons/CheckBoxIconChecked';
import CheckBoxIconIntermediate from '../../icons/CheckBoxIconIntermediate';
import CheckBoxIconUnchecked from '../../icons/CheckBoxIconUnchecked';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    /**
     * @param {Function} onChange Returns checkbox check-status when it changes
     */
    onChange?: (isChecked: boolean) => void;
    /**
     * @param {string} ariaLabel Accessibility label
     */
    ariaLabel?: string;
    /**
     * @param {string} label Label for checkbox
     */
    label?: string;
    /**
     * @param {boolean} checked Set checkbox checked value
     */
    checked?: boolean;
    /**
     * @param {boolean} indeterminate Set checkbox indeterminate value
     */
    indeterminate?: boolean;
}

interface CheckboxState {
    checked?: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    inputRef: React.RefObject<HTMLInputElement>;
    constructor(props: CheckboxProps) {
        super(props);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.inputRef = React.createRef<HTMLInputElement>();
        this.state = {};
    }

    componentDidMount(): void {
        const current = this.inputRef.current;
        if (current) {
            current.checked = this.state.checked === true;
            current.indeterminate = this.props.indeterminate === true;
        }
        this.setState({ checked: this.props.checked });
    }

    componentDidUpdate(prevProps: CheckboxProps): void {
        const current = this.inputRef.current;
        if (current) {
            current.checked = this.state.checked === true;
            current.indeterminate = this.props.indeterminate === true;
        }
        if (prevProps.checked !== this.props.checked) {
            this.setState({ checked: this.props.checked });
        }
    }

    handleCheckChange(): void {
        if (this.props.onChange !== undefined) {
            this.props.onChange(!this.state.checked);
        }
        this.setState({ checked: !this.state.checked });
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <input
                    className={styles.hideVisually}
                    type={'checkbox'}
                    ref={this.inputRef}
                    aria-label={this.props.ariaLabel ?? this.props.label}
                    readOnly
                ></input>
                {this.props.indeterminate ? (
                    <CheckBoxIconIntermediate
                        className={styles.icon}
                        onClick={this.handleCheckChange}
                    />
                ) : this.state.checked ? (
                    <CheckBoxIconChecked
                        className={styles.icon}
                        onClick={this.handleCheckChange}
                    />
                ) : (
                    <CheckBoxIconUnchecked
                        className={styles.icon}
                        onClick={this.handleCheckChange}
                    />
                )}
                {this.props.label ? (
                    <label className={styles.label}>{this.props.label}</label>
                ) : null}
            </React.Fragment>
        );
    }
}

export default Checkbox;
