import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'

import HomeStackScreen from './HomeStackScreen';
import SearchStackScreen from './SearchStackScreen';
import OptionsStackScreen from './OptionsStackScreen';

const Tab = createBottomTabNavigator();

const TabsScreen = (props) =>  {

  const HOME_COLOR = 'crimson'
  const SEARCH_COLOR = 'coral'
  const SETTINGS_COLOR = 'teal'

  return (
          <NavigationContainer>
            <Tab.Navigator initialRouteName="HomeStack" tabBarOptions={{inactiveTintColor: 'gray', keyboardHidesTabBar: true}}>
              <Tab.Screen
              name="HomeStack"
              component={HomeStackScreen}
              options={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                  return (
                    <Icon name="ios-restaurant" type="ionicon" color={`${focused ? props.colors[0] : color}`} size={30} />
                  );
                },
                tabBarLabel: ({ focused, color }) => {
                  return (
                    <Text style={[styles.tabBarLabel, { color: `${focused ? props.colors[0] : color}` }]}>
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
                    <Icon name="ios-search" type="ionicon" color={`${focused ? props.colors[1] : color}`} size={30} />
                  );
                },
                tabBarLabel: ({ focused, color }) => {
                  return (
                    <Text style={[styles.tabBarLabel, { color: `${focused ? props.colors[1] : color}` }]}>
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
                    <Icon name="ios-list" type="ionicon" color={`${focused ? props.colors[2] : color}`} size={30} />
                  );
                },
                tabBarLabel: ({ focused, color }) => {
                  return (
                    <Text style={[styles.tabBarLabel, { color: `${focused ? props.colors[2] : color}` }]}>
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

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
  },
});

const mapStateToProps = ({themeColors}) => ({
  colors: themeColors,
})

export default connect(mapStateToProps)(TabsScreen)
