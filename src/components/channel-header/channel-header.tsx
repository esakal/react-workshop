import React, {Component} from 'react';
import classes from './channel-header.module.css';
import classnames from 'classnames';
import { ChannelsService, withChannelsService } from '../channels-context';
import { Toolbar } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export interface ChannelHeaderProps {
    className?: string;
    channelsService: ChannelsService;
}

export interface ChannelHeaderState {
    isHovering: boolean
}

export const ChannelHeader = withChannelsService(class extends Component<ChannelHeaderProps, ChannelHeaderState> {

    state: ChannelHeaderState = {
        isHovering: false,
    }

    handleMouseHover(value: boolean) {
        this.setState({
            isHovering: value
        });
    }

    editName = () => {

    }


    render() {
        const {
            className,
            channelsService: {
                activeChannel
            }
        } = this.props;

        const {
            isHovering
        } = this.state;

        return (
            <div className={classnames(className, classes.container)}>
                {activeChannel && <Toolbar className={classes.toolbar}>
                    <button className={classes.channelName}
                         onMouseEnter={() => this.handleMouseHover(true)}
                         onClick={this.editName}
                         onMouseLeave={() => this.handleMouseHover(false)}>
                        {activeChannel.name}
                        {isHovering &&
                            <EditIcon className={classes.editButton} fontSize="inherit"></EditIcon>
                        }
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
                }
            </div>
        );
    }
});
