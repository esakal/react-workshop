import React, {Component} from 'react';
import './app.css'

export interface AppProps {

}

export interface AppState {

}

export class App extends Component<AppProps, AppState> {
  render() {
      return (
          <div>
	          <div className={'caption'}>Chat Application</div> {/* Notice - please untouch this line */}
          </div>
      );
  }
}

export default App;
