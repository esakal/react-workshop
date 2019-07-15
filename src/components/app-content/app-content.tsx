import React, {Component} from 'react';
import classes from './app-content.module.css';
import { ChannelView } from '../channel-view';
import { Sidebar } from '../sidebar';

export class AppContent extends Component {
	render() {
		return (
		<div className={classes.container}>
			<Sidebar className={classes.sideBar} />
			<ChannelView className={classes.channelView} />
		</div>
		);
	}
}
