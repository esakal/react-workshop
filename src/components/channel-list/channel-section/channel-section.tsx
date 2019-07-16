import React, {Component} from 'react';
import classes from './channel-section.module.css';
import classnames from 'classnames';
import { ReactComponent as Icon } from './chat.svg';
import { ChatChannel } from '../../channels-context';

export interface ChannelSectionProps {
    title: string;
    channels: ChatChannel[],
    activeChannel: ChatChannel | null
    onChannelSelected: (channel: ChatChannel) => void;
}

export class ChannelSection extends Component<ChannelSectionProps> {

    renderItem(channel: ChatChannel) {
        const { onChannelSelected, activeChannel } = this.props;
        const active = activeChannel && activeChannel.id === channel.id;
        return (
            <button onClick={() => onChannelSelected(channel)} key={channel.id} className={classnames(classes.itemButton, {[classes.active]: active})}>
                <Icon style={{fill: 'rgba(255, 255, 255, 0.6)', width: '24px', height: '24px'}}/>
                <div className={classes.itemText}>{channel.name}</div>
            </button>
        )
    }

    render() {
        const {channels, title} = this.props;

        const channelItems = channels.map(channel => this.renderItem(channel));
        return (
            <div className={classes.container}>
                <div className={classes.channelSectionTitle}>
                    {title}
                </div>
                <div className={classes.channels}>
                    {channelItems}
                </div>
            </div>
        );
    }
}
