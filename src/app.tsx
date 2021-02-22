import React, {Component} from 'react';
import { ChatkitService } from './chatkit-service';
import './app.css';
import { MessageCreate } from './components/message-create';

export interface AppProps {

}

export interface AppState {
    loading: boolean;
    error: boolean;
    fullName: string;
    connected: boolean;
}

export class App extends Component<AppProps, AppState> {
    private chatkitService: ChatkitService = new ChatkitService();

    state: AppState = {
        loading: true,
        error: false,
        fullName: '',
        connected: false
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

    render() {
        const {loading, error, fullName, connected} = this.state;
        return (
            <div>
	            <div className={'caption'}>Chat Application</div> {/* Notice - please untouch this line */}
	            {loading && <div>Loading...</div>}
                {error && <div>Failed to connect...</div>}
                { connected && <>
                    {fullName && <div>Hello {fullName}</div>}
                    <MessageCreate />
                </>}

            </div>
        );
    }
}

export default App;
