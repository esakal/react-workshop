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

    private _autoRefreshToken: any = null;

    componentDidMount() {
        this._autoRefreshToken = setInterval(() => {
            this._handleRefresh();
        }, 10000);
    }

    componentDidUnmount() {
        clearTimeout(this._autoRefreshToken);
    }

    private _onChannelSelected = (channel: ChatChannel) => {
        this.props.channelsService.activateChannel(channel.id);
    }

    private _handleRefresh = () => {
        this.props.channelsService.updateJoinableChannels();
    }

    render() {
        const {
            className,
            channelsService: {joinableChannels, userChannels, activeChannel}
        } = this.props;

        return (
            <div className={classnames(classes.container, className)}>
                { userChannels && <ChannelSection onChannelSelected={this._onChannelSelected} activeChannel={activeChannel} title={'User Channels'} channels={userChannels}/> }
                { joinableChannels && <ChannelSection showRefresh={true} onRefresh={this._handleRefresh} onChannelSelected={this._onChannelSelected} activeChannel={activeChannel} title={'Available Channels'} channels={joinableChannels}/> }
            </div>
        );
    }
});
