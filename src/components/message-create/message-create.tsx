import React, {Component} from 'react';
import classes from './message-create.module.css';

export interface MessageCreateProps {
	className?: string;
}

export interface MessageCreateState {
	value: string;
}

export class MessageCreate extends Component<MessageCreateProps, MessageCreateState> {

	state = {
		value: ''
	}

	handleChange = (e: any) => {
		// this.setState({
		// 	value: e.target.value
		// });
	}

	handleKeyDown = (e: any) => {
		if (e.which === 13) {
			console.log('enter clicked')
		}
	}

	render() {
		const { value } = this.state;
		return (
		<>
			<div className={classes.caption}>Type your message here</div>
			<input value={value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
		</>);
	}
}
