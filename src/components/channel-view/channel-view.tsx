import React, {Component} from 'react';
import classes from './channel-view.module.css';
import { MessageCreate } from '../message-create';
import { ChannelMessages } from '../channel-messages';
import { ChannelHeader } from '../channel-header';
import classnames from 'classnames';

export interface ChannelViewProps {
    className?: string
}

export class ChannelView extends Component<ChannelViewProps> {
    render() {
        const { className } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
	            <ChannelHeader className={classes.channelHeader} />
                <ChannelMessages className={classes.channelMessages} />
                <MessageCreate className={classes.messageCreate} />
            </div>
        );
    }
}
