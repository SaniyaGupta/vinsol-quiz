import React from 'react';
import Quiz from './Quiz'
import './App.css';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
       <Quiz/>
        <div className="divider "></div>
        <Quiz/>
      </div>
    )
  }

}

export default App;
