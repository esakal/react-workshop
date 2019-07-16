import React, {Component} from 'react';
import classes from './sidebar.module.css';
import { UserProfile } from '../user-profile';
import { ChannelList } from '../channel-list';
import { ChannelCreate } from '../channel-create';
import classnames from 'classnames';

export interface SidebarProps {
	className?: string;
}

export class Sidebar extends Component<SidebarProps> {
	render() {
		const { className } = this.props;
		return <div className={classnames(classes.container, className)}>
			<UserProfile className={classes.userProfile} />
			<ChannelList className={classes.channelList} />
			<ChannelCreate className={classes.channelCreate}/>
		</div>;
	}
}
