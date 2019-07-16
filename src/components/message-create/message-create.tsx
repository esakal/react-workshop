import React, {Component} from 'react';
import classes from './message-create.module.css';

export interface MessageCreateProps {
	className?: string;
	value: string;
	onSend: () => void;
	disabled: boolean
	onChange: React.ChangeEventHandler<HTMLInputElement>; // Notice: this is for demonstration only. setting `(event: any) => void` instead is accepted with syntethic events
}

export interface MessageCreateState {
}

export class MessageCreate extends Component<MessageCreateProps, MessageCreateState> {

	static defaultProps = {
		disabled: false
	}

	state = {};

	handleKeyDown = (e: any) => {
		const { onSend } = this.props;

		if (e.which === 13) {
			onSend();
		}
	}

	render() {
		const { value, onChange, disabled } = this.props;
		return (
		<>
			<div className={classes.caption}>Type your message here</div>
			<input className={classes.input} disabled={disabled} value={value} onChange={onChange} onKeyDown={this.handleKeyDown}/>
		</>);
	}
}
