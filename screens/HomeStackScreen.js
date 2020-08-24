import * as React from 'react';
import {StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen'
import AddMainInfoScreen from './AddMainInfoScreen'
import AddIngredientsScreen from './AddIngredientsScreen'
import AddStepsScreen from './AddStepsScreen'

const HomeStack = createStackNavigator();

export default class HomeStackScreen extends React.Component {
  render () {
    return (
      <HomeStack.Navigator initialRouteName='Home' screenOptions={{headerTitleAlign: 'center', headerStyle: styles.headerStyle, headerTitleStyle: styles.headerTitleStyle}}>
        <HomeStack.Screen name='Home' component={HomeScreen} options={{headerTitle: 'HOME'}}/>
        <HomeStack.Screen name='AddMainInfo' component={AddMainInfoScreen} options={{headerTitle: 'ADD NEW RECIPE'}}/>
        <HomeStack.Screen name='AddIngredients' component={AddIngredientsScreen} options={{headerTitle: 'ADD NEW RECIPE'}}/>
        <HomeStack.Screen name='AddSteps' component={AddStepsScreen} options={{headerTitle: 'ADD NEW RECIPE'}}/>
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
