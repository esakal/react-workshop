import React, {Component} from 'react';
import classes from './channel-view.module.css';
import classnames from 'classnames';

export interface ChannelViewProps {
    className?: string
}

export class ChannelView extends Component<ChannelViewProps> {
    render() {
        const { className } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
}
