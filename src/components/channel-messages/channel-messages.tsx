import React, {Component} from 'react';
import classes from './channel-messages.module.css';
import classnames from 'classnames';

export interface ChannelMessagesProps {
    className?: string;
}

export class ChannelMessages extends Component<ChannelMessagesProps> {
    render() {
        const { className } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
}
