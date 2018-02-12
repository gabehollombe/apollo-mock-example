import React, { Component } from 'react';
import Galleries from './Galleries';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Galleries} />
        </Switch>
      </div>
    )
  }
}

export default App;