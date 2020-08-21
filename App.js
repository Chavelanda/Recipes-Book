import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';

import HomeStackScreen from './screens/HomeStackScreen';
import SearchScreen from './screens/SearchScreen';
import OptionsScreen from './screens/OptionsScreen';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeStack"
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStackScreen}
            options={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                return (
                  <Icon
                    name="ios-restaurant"
                    type="ionicon"
                    color={`${focused ? 'crimson' : 'gray'}`}
                  />
                );
              },
              tabBarLabel: ({ focused }) => {
                return (
                  <Text
                    style={[
                      styles.tabBarLabel,
                      { color: `${focused ? 'crimson' : 'gray'}` },
                    ]}>
                    Home
                  </Text>
                );
              },
            })}
          />
          <Tab.Screen
            name="SearchStack"
            component={SearchScreen}
            options={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <Icon
                    name="ios-search"
                    type="ionicon"
                    color={`${focused ? 'coral' : 'gray'}`}
                  />
                );
              },
              tabBarLabel: ({ focused }) => {
                return (
                  <Text
                    style={[
                      styles.tabBarLabel,
                      { color: `${focused ? 'coral' : 'gray'}` },
                    ]}>
                    Search
                  </Text>
                );
              },
            })}
          />
          <Tab.Screen
            name="OptionsStack"
            component={OptionsScreen}
            options={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <Icon
                    name="ios-list"
                    type="ionicon"
                    color={`${focused ? 'teal' : 'gray'}`}
                  />
                );
              },
              tabBarLabel: ({ focused }) => {
                return (
                  <Text
                    style={[
                      styles.tabBarLabel,
                      { color: `${focused ? 'teal' : 'gray'}` },
                    ]}>
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
    fontSize: 10,
  },
});
