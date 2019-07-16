import React, {Component} from 'react';
import './message-create.css';

export interface MessageCreateProps {
	className?: string;
}

export interface MessageCreateState {
	className?: string;
}

export class MessageCreate extends Component<MessageCreateProps, MessageCreateState> {
	render() {
		return (
		<>
			<div className={'caption'}>Type your message here</div>
			<input />
		</>);
	}
}
