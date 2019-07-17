import React, {Component} from 'react';
import classes from './channel-create.module.css';
import classnames from 'classnames';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withChannelsService, ChannelsService, ChatMessage } from '../channels-context';

export interface ChannelCreateProps {
    className?: string;
    channelsService: ChannelsService

}

export interface ChannelCreateState {
}

export const ChannelCreate = withChannelsService(class extends Component<ChannelCreateProps, ChannelCreateState> {
    private _newChannelInputRef = React.createRef<HTMLInputElement>();
    state: ChannelCreateState ={
    }

    handleOpen = () => {
    }

    handleClose = () => {
    }

    handleCreate = () => {
    }

    render() {
       const { className } = this.props;
       const open = false; // TODO replace with relevant implementation
        return (
            <>
            <div className={classnames(classes.container, className)}>
                <button onClick={this.handleOpen} className={classes.containerContent}>
                    Create Channel
                </button>
            </div>
                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create new Channel</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new channel, please enter channel name
                        </DialogContentText>
                        <TextField
                            inputRef={this._newChannelInputRef}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Channel name"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                </>
        );
    }
});

