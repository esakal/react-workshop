import React, {Component} from 'react';
import classes from './channel-header.module.css';
import classnames from 'classnames';
import { ChannelsService, withChannelsService } from '../channels-context';
import { Toolbar } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';


export interface ChannelHeaderProps {
    className?: string;
    channelsService: ChannelsService;
}

export interface ChannelHeaderState {
}

export const ChannelHeader = withChannelsService(class extends Component<ChannelHeaderProps, ChannelHeaderState> {

    state: ChannelHeaderState = {
    }

    render() {
        const {
            className,
            channelsService: {
                activeChannel
            }
        } = this.props;

        return (
            <div className={classnames(className, classes.container)}>
                <Toolbar className={classes.toolbar}>
                    <button className={classes.channelName}>
                        Channel name
                        <EditIcon className={classes.editButton} fontSize="inherit"></EditIcon>
                </button>
                    <div className={classes.grow}/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'Search'}}
                        />
                    </div>

                </Toolbar>
            </div>
        );
    }
});
