import React, {Component} from 'react';
import classes from './channel-messages.module.css';
import classnames from 'classnames';
import { withChannelsService, ChannelsService, ChatMessage } from '../channels-context';
import { ChannelMessage } from './channel-message';

export interface ChannelMessagesProps {
    className?: string;
    channelsService: ChannelsService
}

// interface DateSeperatorsProps {
// }

// function DateSeperator(props: DateSeperatorsProps) {
//     return (
//     <div className={classes.dateSeperator}>
//         <hr className={classes.dateSeperatorHR} />
//         <div className={classes.dateSeperatorText}>
//             <span>Sun, Jul 14, 2019</span>
//         </div>
//     </div>
//     )
// }

export const ChannelMessages = withChannelsService(class extends Component<ChannelMessagesProps> {

    renderMessages() {
        const { channelsService: { activeChannelMessages}} = this.props;

        return activeChannelMessages.map(message => {
            return (
                <ChannelMessage onDelete={this.onDelete} key={message.id} message={message} />
            )
        })
    }

    onDelete = (message: ChatMessage) => {
        const {channelsService: {deleteMessage}} = this.props;
        deleteMessage(message.id);
    }

    render() {
        const { className } = this.props;

        const messages = this.renderMessages();
        return (
            <div className={classnames(classes.container, className)}>
                {messages}
            </div>
        );
    }
});
