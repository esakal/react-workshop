import React, {Component} from 'react';
import classes from './channel-create.module.css';
import classnames from 'classnames';

export interface ChannelCreateProps {
    className?: string;
}

export class ChannelCreate extends Component<ChannelCreateProps> {
    render() {
       const { className } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
}

