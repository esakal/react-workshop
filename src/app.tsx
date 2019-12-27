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
    banUser: boolean;
}

const ForbiddenWord = 'coffee break';
const LanguageFilterWords = ['badass', 'sexy', 'motherfucker'];
const SafeWord = 'nice guy';
const DisconnectWord = 'lo tzarich tovot';

export class App extends Component<AppProps, AppState> {
    private chatkitService: ChatkitService = new ChatkitService();

    state: AppState = {
        loading: true,
        error: false,
        fullName: '',
        connected: false,
        message: '',
        banUser: false
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
        const message = e.target.value;

        if (message === DisconnectWord) {
            this.setState({
                connected: false
            });
            return;
        }

        if (message.indexOf(ForbiddenWord) !== -1) {
            this.setState({
                message: 'No! Go back to work dude',
                banUser: true
            });
            return;
        }

        // Notice: in real application you should compare it with case insensitive
        const formattedMessage = message.split(' ').map((word: string) => {
            if (LanguageFilterWords.includes(word)) {
                return SafeWord;
            }

            return word;
        }).join(' ');

        this.setState({
            message: formattedMessage
        });
    }

    handleSaySorry = () => {
        this.setState({
            banUser: false,
            message: 'Ok, I forgive you...'
        })
    }


    render() {
        const {loading, error, fullName, banUser, connected, message} = this.state;
        return (
            <div>
	            <div className={classes.caption}>Chat Application</div> {/* Notice - please untouch this line */}
	            {loading && <div>Loading...</div>}
                {error && <div>Failed to connect...</div>}
                { connected && <>
                    {fullName && <div>Hello {fullName}</div>}
                    <MessageCreate onSaySorry={this.handleSaySorry} disabled={banUser} value={message} onSend={this.handleMessageSend} onChange={this.handleChange} />
                </>}

            </div>
        );
    }
}

export default App;
