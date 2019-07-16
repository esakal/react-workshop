import React, {Component} from 'react';
import { ChatkitService } from './chatkit-service';
import classes from './app.module.css';
import { MessageCreate } from './components/message-create';

export interface AppProps {

}

export interface AppState {
    loading: boolean;
    error: boolean;
    fullName: string;
    connected: boolean;
    message: string;
}

export class App extends Component<AppProps, AppState> {
    private chatkitService: ChatkitService = new ChatkitService();

    state: AppState = {
        loading: true,
        error: false,
        fullName: '',
        connected: false,
        message: ''
    }

    componentDidMount(): void {
        this.chatkitService.connect()
            .then((result) => {
                this.setState({
                    fullName: result.user.name,
                    loading: false,
                    connected: true
                });
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    loading: false,
                });
            });
    }

    handleMessageSend = () => {
        const roomId = String(process.env.REACT_APP_CHATKIT_TEST_ROOM_ID);
        // Note: in real application you should handle optimistic use case and error use case as well
        this.chatkitService.sendMessage(roomId, this.state.message);
        this.setState({
            message: ''
        });
    }


    handleChange = (e: any) => {
        this.setState({
            message: e.target.value
        });
    }


    render() {
        const {loading, error, fullName, connected, message} = this.state;
        return (
            <div>
	            <div className={classes.caption}>Chat Application</div> {/* Notice - please untouch this line */}
	            {loading && <div>Loading...</div>}
                {error && <div>Failed to connect...</div>}
                { connected && <>
                    {fullName && <div>Hello {fullName}</div>}
                    <MessageCreate value={message} onSend={this.handleMessageSend} onChange={this.handleChange} />
                </>}

            </div>
        );
    }
}

export default App;
