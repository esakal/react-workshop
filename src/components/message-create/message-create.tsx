import React, {Component} from 'react';
import classes from './message-create.module.css';
import classnames from 'classnames';
import { ChannelsService, withChannelsService } from '../channels-context';
import { AutosizeInput } from '../autosize-input';

export interface MessageCreateProps {
    className?: string;
    channelsService: ChannelsService;
}

interface MessageCreateState {
    message: string;
}

export const MessageCreate = withChannelsService(class extends Component<MessageCreateProps, MessageCreateState> {
    state: MessageCreateState = {
        message: ''
    }

    private _onChange = (e: any): void => {
        this.setState(
            {
                message: e.target.value
            }
        )
    }

    private _onSend = () => {
        this.props.channelsService.sendMessage(this.state.message);

        this.setState({
            message: ''
        });
    }

    render() {
       const { className, channelsService: {activeChannel} } = this.props;
       const { message } = this.state;

        return (
            <div className={classnames(classes.container, className)}>
                <AutosizeInput disabled={!activeChannel} onChange={this._onChange} onSend={this._onSend} value={message} placeholder={'Write a message...'} />
            </div>
        );
    }
});
