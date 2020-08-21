import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from './SearchScreen'

const SearchStack = createStackNavigator();

export default class SearchStackScreen extends React.Component {
  render () {
    return (
      <SearchStack.Navigator initialRouteName='Search' screenOptions={{headerTitleAlign: 'center', headerStyle: styles.headerStyle,}}>
        <SearchStack.Screen name='Search' component={SearchScreen} options={{headerTitle: 'SEARCH'}} />
      </SearchStack.Navigator>
    )
  }
}

const styles=StyleSheet.create({
  headerStyle: {
    backgroundColor: 'coral',
  }
})
