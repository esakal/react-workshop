import React, {Component} from 'react';
import classes from './channel-list.module.css';
import classnames from 'classnames';
import { ChannelsService, ChatChannel, withChannelsService } from '../channels-context';
import { ChannelSection } from './channel-section';

export interface ChannelListProps {
    className?: string;
    channelsService: ChannelsService;
}

export const ChannelList = withChannelsService(class extends Component<ChannelListProps> {
    private _onChannelSelected = (channel: ChatChannel) => {
        this.props.channelsService.activateRoom(channel.id);
    }

    private _handleRefresh = () => {
        this.props.channelsService.updateJoinableRooms();
    }

    render() {
        const {
            className,
            channelsService: {joinableRooms, userRooms, activeChannel}
        } = this.props;

        return (
            <div className={classnames(classes.container, className)}>
                { userRooms && <ChannelSection onChannelSelected={this._onChannelSelected} activeChannel={activeChannel} title={'User Channels'} channels={userRooms}/> }
                { joinableRooms && <ChannelSection showRefresh={true} onRefresh={this._handleRefresh} onChannelSelected={this._onChannelSelected} activeChannel={activeChannel} title={'Available Channels'} channels={joinableRooms}/> }
            </div>
        );
    }
});
