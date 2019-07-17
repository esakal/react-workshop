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
    open: boolean
}

export const ChannelCreate = withChannelsService(class extends Component<ChannelCreateProps, ChannelCreateState> {
    private _newChannelInputRef = React.createRef<HTMLInputElement>();
    state: ChannelCreateState ={
        open: false
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleCreate = () => {
        if (!this._newChannelInputRef.current) {
            return;
        }

        const name = (this._newChannelInputRef.current.value || '').trim();

        if (!name) {
            this.handleClose();
            return;
        }

        this.props.channelsService.createChannel(name);
        this.handleClose();
    }

    render() {
       const { className } = this.props;
       const { open } = this.state;
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

