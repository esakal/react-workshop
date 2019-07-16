import React, {Component} from 'react';
import classes from './channel-header.module.css';
import classnames from 'classnames';

export interface ChannelHeaderProps {
    className?: string;
}

export class ChannelHeader extends Component<ChannelHeaderProps> {
    render() {
       const { className } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
}

