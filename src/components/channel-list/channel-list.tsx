import React, {Component} from 'react';
import classes from './channel-list.module.css';
import classnames from 'classnames';

export interface ChannelListProps {
    className?: string;
}

export class ChannelList extends Component<ChannelListProps> {
    render() {
       const { className } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
}

