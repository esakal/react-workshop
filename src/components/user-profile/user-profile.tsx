import React, {Component} from 'react';
import classes from './user-profile.module.css';
import classnames from 'classnames';

export interface UserProfileProps {
    className?: string;
}

export class UserProfile extends Component<UserProfileProps> {
    render() {
       const { className } = this.props;
        return (
            <div className={classnames(classes.container, className)}>
            </div>
        );
    }
}

