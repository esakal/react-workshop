import React, {Component} from 'react';
import classes from './autosize-input.module.css';
import classnames from 'classnames';

export interface AutosizeInputProps {
    className?: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    value: string;
    onSend: () => void;
    disabled: boolean;
}

export class AutosizeInput extends Component<AutosizeInputProps> {
    private _onClick = (e: any) => {
        if (e.which === 13) {
            this.props.onSend();
        }
    }

    render() {
       const { className, placeholder, value, onChange, disabled } = this.props;
        return (
            <>

                <div className={classnames(className, classes.container)}>
                    <input
                        disabled={disabled}
                        onKeyUp={this._onClick}
                        value={value}
                        onChange={onChange}
                        placeholder={disabled ? 'Enter any channel to start chating...' : placeholder}
                        className={classes.textField} />
                </div>
            </>
        );
    }
}
