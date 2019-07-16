import React, {Component} from 'react';
import classes from './channel-view.module.css';
import { MessageCreate } from '../message-create';
import { ChannelMessages } from '../channel-messages';
import { ChannelHeader } from '../channel-header';
import classnames from 'classnames';
import { ChannelsService, withChannelsService } from '../channels-context';
import { ReactComponent as EmptyImage} from './empty.svg';

export interface ChannelViewProps {
    className?: string
    channelsService: ChannelsService;

}

export const ChannelView  = withChannelsService(class extends Component<ChannelViewProps> {
    render() {
        const { className, channelsService: {activeChannel} } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
	            <ChannelHeader className={classes.channelHeader} />
	            <div className={classes.content}>
                {activeChannel ?
                    <ChannelMessages/>
                    :
                    <div className={classes.emptyContainer}>
                        <EmptyImage className={classes.emptyImage} />
                        <div className={classes.emptyText}>Select channel from the sidebar</div>
                    </div>
                }
                </div>
                <MessageCreate className={classes.messageCreate} />
            </div>
        );
    }
});
