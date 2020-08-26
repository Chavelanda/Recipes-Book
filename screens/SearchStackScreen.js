import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'

import SearchScreen from './SearchScreen'

const SearchStack = createStackNavigator();

class SearchStackScreen extends React.Component {
  render () {
    return (
      <SearchStack.Navigator initialRouteName='Search' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: this.props.colors[1]}, headerTitleStyle: styles.headerTitleStyle}}>
        <SearchStack.Screen name='Search' component={SearchScreen} options={{headerTitle: 'SEARCH'}} />
      </SearchStack.Navigator>
    )
  }
}

const styles=StyleSheet.create({
  headerTitleStyle: {
    color: 'white',
  }
})

const mapStateToProps = ({themeColors}) => ({
  colors: themeColors,
})

export default connect(mapStateToProps)(SearchStackScreen)
