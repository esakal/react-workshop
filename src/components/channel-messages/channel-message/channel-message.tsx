import React, {Component} from 'react';
import classes from './channel-message.module.css';
import classnames from 'classnames';
import { ChatMessage } from '../../channels-context';
import { Avatar } from '@material-ui/core';
import moment from 'moment';

export interface ChannelMessageProps {
    className?: string;
    message: ChatMessage
    onDelete?: (message: ChatMessage) => void;

}

export class ChannelMessage extends Component<ChannelMessageProps> {
    render() {
       const { className, message, onDelete } = this.props;
        return (
            <div className={classnames(className, classes.container)}>
                <Avatar src={message.sender.avatarURL} />
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.senderName}>{message.sender.name}</div>
                        <div className={classes.messageTimestamp}>
                            {moment(message.createdAt).fromNow()}
                        </div>
                        <div className={classes.grow} />
                        {/*<button className={classes.delete} onClick={() => onDelete && onDelete(message)}>delete</button>*/}
                    </div>
                    <div className={classes.message}>
                        {message.content}
                    </div>
                </div>
            </div>
        );
    }
}
