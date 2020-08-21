import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen'

const HomeStack = createStackNavigator();

export default class HomeStackScreen extends React.Component {
  render () {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name='Home' component={HomeScreen} />
      </HomeStack.Navigator>
    )
  }
}