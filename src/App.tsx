import React, { Component } from 'react';
import './App.css';
import InputText from './component/input-text/imput-text.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-body">
          <div className="App-search-box">
            <InputText />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
