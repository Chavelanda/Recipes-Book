import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { createStackNavigator } from '@react-navigation/stack';

import OptionsScreen from './OptionsScreen'

const OptionsStack = createStackNavigator();

export default class OptionsStackScreen extends React.Component {
  render () {
    return (
      <OptionsStack.Navigator initialRouteName='Options' screenOptions={{headerTitleAlign: 'center', headerStyle: styles.headerStyle,}}>
        <OptionsStack.Screen name='Options' component={OptionsScreen} options={{headerTitle: 'OPTIONS'}} />
      </OptionsStack.Navigator>
    )
  }
}

const styles=StyleSheet.create({
  headerStyle: {
    backgroundColor: 'teal',
  }
})
