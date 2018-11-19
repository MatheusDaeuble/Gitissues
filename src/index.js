
import React, {Component} from 'react';
import createNavigator from 'routes';
import './config/ReactotronConfig'

export default class App extends Component {


  render () {
    const Routes = createNavigator();
    return (
      <Routes />
    );
  }
}
