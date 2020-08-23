import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import HomeStackScreen from './screens/HomeStackScreen';
import SearchStackScreen from './screens/SearchStackScreen';
import OptionsStackScreen from './screens/OptionsStackScreen';

const Tab = createBottomTabNavigator();

const HOME_COLOR = 'crimson'
const SEARCH_COLOR = 'coral'
const SETTINGS_COLOR = 'teal'

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="HomeStack" tabBarOptions={{inactiveTintColor: 'gray', keyboardHidesTabBar: true}}>
          <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              return (
                <Icon name="ios-restaurant" type="ionicon" color={`${focused ? HOME_COLOR : color}`} size={30} />
              );
            },
            tabBarLabel: ({ focused, color }) => {
              return (
                <Text style={[styles.tabBarLabel, { color: `${focused ? HOME_COLOR : color}` }]}>
                  Home
                </Text>
              );
            },
          })}
          />
          <Tab.Screen
          name="SearchStack"
          component={SearchStackScreen}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon name="ios-search" type="ionicon" color={`${focused ? SEARCH_COLOR : color}`} size={30} />
              );
            },
            tabBarLabel: ({ focused, color }) => {
              return (
                <Text style={[styles.tabBarLabel, { color: `${focused ? SEARCH_COLOR : color}` }]}>
                  Search
                </Text>
              );
            },
          })}
          />
          <Tab.Screen
          name="OptionsStack"
          component={OptionsStackScreen}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon name="ios-list" type="ionicon" color={`${focused ? SETTINGS_COLOR : color}`} size={30} />
              );
            },
            tabBarLabel: ({ focused, color }) => {
              return (
                <Text style={[styles.tabBarLabel, { color: `${focused ? SETTINGS_COLOR : color}` }]}>
                  Options
                </Text>
              );
            },
          })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
  },
});
