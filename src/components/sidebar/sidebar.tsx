import React, {Component} from 'react';
import classes from './sidebar.module.css';
import classnames from 'classnames';

export interface SidebarProps {
	className?: string;
}

export class Sidebar extends Component<SidebarProps> {
	render() {
		const { className } = this.props;
		return <div className={classnames(classes.container, className)}>
		</div>;
	}
}
