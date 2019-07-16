import React, {Component} from 'react';
import { AppContent } from './components/app-content';
import { ChannelsProvider } from './components/channels-context';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});

export class App extends Component {
    render() {
        return (
            <StylesProvider injectFirst={true}>

                <ThemeProvider theme={theme}>
                    <ChannelsProvider>
                        <AppContent></AppContent>
                    </ChannelsProvider>
                </ThemeProvider>
            </StylesProvider>
        );
    }
}

export default App;
