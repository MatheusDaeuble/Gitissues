import React from 'react'
import { StackNavigator } from 'react-navigation';
import Repositories from 'pages/repositories';
import Issues from 'pages/issues';
import { metrics } from 'styles'

const createNavigator = () => StackNavigator ({
  Repositories: { screen: Repositories },
  Issues: { screen: Issues },
},{
  initialRouteName: 'Repositories',

});

export default createNavigator;
