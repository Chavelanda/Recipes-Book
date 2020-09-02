import * as React from 'react';
import {StyleSheet } from 'react-native';
import { createStackNavigator, HeaderBackButton  } from '@react-navigation/stack';
import { connect } from 'react-redux'

import HomeScreen from './HomeScreen'
import MainInfoScreen from './MainInfoScreen'
import IngredientsScreen from './IngredientsScreen'
import StepsScreen from './StepsScreen'
import AddMainInfoScreen from './AddMainInfoScreen'
import AddIngredientsScreen from './AddIngredientsScreen'
import AddStepsScreen from './AddStepsScreen'

const HomeStack = createStackNavigator();

class HomeStackScreen extends React.Component {
  render () {
    return (
      <HomeStack.Navigator initialRouteName='Home' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: this.props.colors[0]}, headerTitleStyle: styles.headerTitleStyle, headerTintColor: 'white'}}>
        <HomeStack.Screen name='Home' component={HomeScreen} options={{headerTitle: 'HOME'}}/>
        <HomeStack.Screen name='MainInfo' component={MainInfoScreen} options={({ navigation, route }) => ({headerTitle: route.params.title.toUpperCase(),})}/>
        <HomeStack.Screen name='Ingredients' component={IngredientsScreen} options={({ navigation, route }) => ({headerTitle: route.params.title.toUpperCase(),})}/>
        <HomeStack.Screen name='Steps' component={StepsScreen} options={({ navigation, route }) => ({headerTitle: route.params.title.toUpperCase(),})}/>
        <HomeStack.Screen name='AddMainInfo' component={AddMainInfoScreen} options={{headerTitle: 'ADD NEW RECIPE'}}/>
        <HomeStack.Screen
          name='AddIngredients'
          component={AddIngredientsScreen}
          options={({ navigation, route }) => ({headerTitle: 'ADD NEW RECIPE', headerLeft: (props) => (<HeaderBackButton onPress={() => {navigation.navigate("AddMainInfo", route.params)}}/>),})}
        />
        <HomeStack.Screen
          name='AddSteps'
          component={AddStepsScreen}
          options={({ navigation, route }) => ({headerTitle: 'ADD NEW RECIPE', headerLeft: (props) => (<HeaderBackButton onPress={() => {navigation.navigate("AddIngredients", route.params)}}/>),})}
        />
      </HomeStack.Navigator>
    )
  }
}

const styles=StyleSheet.create({
  headerTitleStyle: {
    color: 'white'
  }
})

const mapStateToProps = ({themeColors}) => ({
  colors: themeColors,
})

export default connect(mapStateToProps)(HomeStackScreen)
