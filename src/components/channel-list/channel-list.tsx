import React, {Component} from 'react';
import classes from './channel-list.module.css';
import classnames from 'classnames';
import { ChannelsService, ChatChannel, withChannelsService } from '../channels-context';
import { ChannelSection } from './channel-section';

export interface ChannelListProps {
    className?: string;
    channelsService: ChannelsService;
}

const userChannels: ChatChannel[] = [
    {id: '1', name: 'channel 1'},
    {id: '2', name: 'channel 2'},
]

const joinableChannels: ChatChannel[] = [];

export const ChannelList = withChannelsService(class extends Component<ChannelListProps> {

    private _autoRefreshToken: any = null;

    componentDidMount() {
    }

    componentDidUnmount() {
    }

    private _onChannelSelected = (channel: ChatChannel) => {
    }

    private _handleRefresh = () => {
        // this.props.channelsService.updateJoinableChannels();
    }

    render() {
        const {
            className,
            channelsService: {activeChannel}
        } = this.props;

        return (
            <div className={classnames(classes.container, className)}>
                { userChannels && <ChannelSection onChannelSelected={this._onChannelSelected} activeChannel={activeChannel} title={'User Channels'} channels={userChannels}/> }
                { joinableChannels && <ChannelSection showRefresh={true} onRefresh={this._handleRefresh} onChannelSelected={this._onChannelSelected} activeChannel={activeChannel} title={'Available Channels'} channels={joinableChannels}/> }
            </div>
        );
    }
});
