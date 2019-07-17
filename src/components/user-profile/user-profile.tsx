import React, {Component} from 'react';
import classes from './user-profile.module.css';
import classnames from 'classnames';
import { ReactComponent as Menu } from './menu.svg';
import { ChannelsService, withChannelsService } from '../channels-context';

export interface UserProfileProps {
    className?: string;
    channelsService: ChannelsService
}

export const UserProfile = withChannelsService(class extends Component<UserProfileProps> {
    render() {
        const {
            className,
            channelsService : {
                user
            }
        } = this.props;

        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
});

