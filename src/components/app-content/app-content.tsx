import React, {Component} from 'react';
import classes from './app-content.module.css';
import { ChannelView } from '../channel-view';
import { Sidebar } from '../sidebar';
import { ChannelsService, withChannelsService } from '../channels-context';

export interface AppContentProps {
	channelsService: ChannelsService
}
export const AppContent = withChannelsService(class extends Component<AppContentProps> {
	componentDidMount() {
		this.props.channelsService.connect()
			.then((result) => {
				// TODO
			}, error => {
				// TODO
			});
	}

	render() {
		return (
		<div className={classes.container}>
			<Sidebar className={classes.sideBar} />
			<ChannelView  className={classes.channelView} />
		</div>
		);
	}
});
