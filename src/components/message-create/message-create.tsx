import React, {Component} from 'react';
import classes from './message-create.module.css';
import classnames from 'classnames';

export interface MessageCreateProps {
    className?: string;
}

export class MessageCreate extends Component<MessageCreateProps> {
    render() {
        const { className } = this.props;

        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
}
