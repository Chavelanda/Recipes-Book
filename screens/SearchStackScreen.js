import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'

import SearchScreen from './SearchScreen'
import AddMainInfoScreen from './AddMainInfoScreen'
import AddIngredientsScreen from './AddIngredientsScreen'
import AddStepsScreen from './AddStepsScreen'
import MainInfoScreen from './MainInfoScreen'
import IngredientsScreen from './IngredientsScreen'
import StepsScreen from './StepsScreen'

const SearchStack = createStackNavigator();

class SearchStackScreen extends React.Component {
  render () {
    return (
      <SearchStack.Navigator initialRouteName='Search' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: this.props.colors[1]}, headerTitleStyle: styles.headerTitleStyle}}>
        <SearchStack.Screen name='Search' component={SearchScreen} options={{headerTitle: 'SEARCH'}} />
        <SearchStack.Screen name='MainInfo' component={MainInfoScreen} options={({ navigation, route }) => ({headerTitle: route.params.title.toUpperCase(),})}/>
        <SearchStack.Screen name='Ingredients' component={IngredientsScreen} options={({ navigation, route }) => ({headerTitle: route.params.title.toUpperCase(),})}/>
        <SearchStack.Screen name='Steps' component={StepsScreen} options={({ navigation, route }) => ({headerTitle: route.params.title.toUpperCase(),})}/>
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
