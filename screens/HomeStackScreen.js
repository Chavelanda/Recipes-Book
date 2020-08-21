import * as React from 'react';
import {StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen'

const HomeStack = createStackNavigator();

export default class HomeStackScreen extends React.Component {
  render () {
    return (
      <HomeStack.Navigator initialRouteName='Home' screenOptions={{headerTitleAlign: 'center', headerStyle: styles.headerStyle, headerTitleStyle: styles.headerTitleStyle}}>
        <HomeStack.Screen name='Home' component={HomeScreen} options={{headerTitle: 'HOME'}}/>
      </HomeStack.Navigator>
    )
  }
}

const styles=StyleSheet.create({
  headerStyle: {
    backgroundColor: 'crimson',
  },
  headerTitleStyle: {
    color: 'white'
  }
})
