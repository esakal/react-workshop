import React, {Component} from 'react';
import classes from './message-create.module.css';

export interface MessageCreateProps {
	className?: string;
	value: string;
	onSend: () => void;
	disabled: boolean;
	onSaySorry?: () => void;
	onChange: React.ChangeEventHandler<HTMLInputElement>; // Notice: this is for demonstration only. setting `(event: any) => void` instead is accepted with syntethic events
}

export interface MessageCreateState {
}

const PretendToBeBusy = 'i need your help';

export class MessageCreate extends Component<MessageCreateProps, MessageCreateState> {

	static defaultProps = {
		disabled: false
	}

	busyToken: any = null;
	saySorryToken: any = null;

	state = {};

	componentWillUnmount(): void {
		if (this.saySorryToken) {
			clearTimeout(this.saySorryToken);
			this.saySorryToken = null;
		}

		if (!this.busyToken) {
			return;
		}

		clearTimeout(this.busyToken);
	}

	componentDidUpdate(prevProps: Readonly<MessageCreateProps>, prevState: Readonly<MessageCreateState>, snapshot?: any): void {
		const { onSaySorry } = this.props;

		if (prevProps.disabled !== this.props.disabled) {
			if (this.saySorryToken) {
				clearTimeout(this.saySorryToken);
				this.saySorryToken = null;
			}

			if (!this.props.disabled) {
				return;
			}

			this.saySorryToken = setTimeout(() => {
				this.saySorryToken = null;
				onSaySorry && onSaySorry()
			}, 2000);
		}

		if (prevProps.value != this.props.value && this.props.value === PretendToBeBusy) {
			if (this.busyToken) {
				return;
			}

			this.busyToken = setInterval(() => {
				console.warn(`Sorry, I'm very busy...`);
			}, 1000);
		}

	}

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
