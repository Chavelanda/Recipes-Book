import * as React from 'react';
import {StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen'
import AddNewRecipeScreen from './AddNewRecipeScreen'

const HomeStack = createStackNavigator();

export default class HomeStackScreen extends React.Component {
  render () {
    return (
      <HomeStack.Navigator initialRouteName='Home' screenOptions={{headerTitleAlign: 'center', headerStyle: styles.headerStyle, headerTitleStyle: styles.headerTitleStyle}}>
        <HomeStack.Screen name='Home' component={HomeScreen} options={{headerTitle: 'HOME'}}/>
        <HomeStack.Screen name='AddNewRecipe' component={AddNewRecipeScreen} options={{headerTitle: 'ADD NEW RECIPE'}}/>
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
