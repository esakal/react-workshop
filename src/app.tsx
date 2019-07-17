import React, {Component} from 'react';
import { ChatkitService } from './chatkit-service';
import classes from './app.module.css';
import { MessageCreate } from './components/message-create';
import shortid from 'shortid';

export interface AppProps {

}

export interface AppState {
    loading: boolean;
    error: boolean;
    fullName: string;
    connected: boolean;
    message: string;
    banUser: boolean;
    bookmarks: {
        list: { id: string, value: string }[],
        ownerIdType: string
    }
}

const ForbiddenWord = 'coffee break';
const LanguageFilterWords = ['badass', 'sexy', 'motherfucker'];
const SafeWord = 'nice guy';
const DisconnectWord = 'lo tzarich tovot';
const AddToBookmarkRegex = /add bookmark (.*?)[!]/
const RemoveToBookmarkRegex = /remove bookmark (.*?)[!]/
const ModifyBookmarkRegex = /modify bookmark (.*?) (.*?)[!]/
const ShowBookmarks = 'show bookmarks';


export class App extends Component<AppProps, AppState> {
    private chatkitService: ChatkitService = new ChatkitService();

    state: AppState = {
        loading: true,
        error: false,
        fullName: '',
        connected: false,
        message: '',
        banUser: false,
        bookmarks: {
        	list: [],
	        ownerIdType: 'user'
        }
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

    _printBookmarks = () => {
        console.log(`bookmarks of owner id type '${this.state.bookmarks.ownerIdType}':`);
        this.state.bookmarks.list.forEach(bookmark =>{
            console.log(`${bookmark.id} ${bookmark.value}`);
        });
    }

    handleChange = (e: any) => {
        const message = e.target.value;

        if (message === ShowBookmarks) {
            this._printBookmarks();
            this.setState({
                message: ''
            });
            return;
        }

        if (AddToBookmarkRegex.test(message)) {
            const value = message.match(AddToBookmarkRegex)[1];
            const id = shortid();
            this.setState(prevState => ({
                ...prevState,
                message: '',
                bookmarks: {
                    ...prevState.bookmarks,
                    list: [
                        ...prevState.bookmarks.list,
                        {id , value}
                    ]
                }
            }), () => {
                this._printBookmarks();
            });
            return;
        }

        if (ModifyBookmarkRegex.test(message)) {
            const [,id, value] = message.match(ModifyBookmarkRegex);

            this.setState(prevState => ({
                ...prevState,
                message: '',
                bookmarks: {
                    ...prevState.bookmarks,
                    list: prevState.bookmarks.list.map(bookmark => {
                        if (bookmark.id !== id) {
                            return bookmark;
                        }

                        return { id, value }
                    })
                }
            }), () => {
                this._printBookmarks();
            });
            return;
        }

        if (RemoveToBookmarkRegex.test(message)) {
            const id = message.match(RemoveToBookmarkRegex)[1];
            this.setState(prevState => ({
                ...prevState,
                message: '',
                bookmarks: {
                    ...prevState.bookmarks,
                    list: prevState.bookmarks.list.filter(bookmark => bookmark.id !== id)
                }
            }), () => {
                this._printBookmarks();
            });
            return;
        }

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
