import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements'

import SortButtonGroup from '../components/SortButtonGroup'
import Recipe from '../components/Recipe'

import AddNewRecipeScreen from './AddNewRecipeScreen'

const HOME_COLOR= 'crimson'

export default class HomeScreen extends React.Component {

  buttons = [{name: 'NAME', up: true,}, {name: 'TIME', up: true}]

  onSortButtonPress = (index) => {
    console.log('Sort button pressed ' + this.buttons[index].name + ' pressed')
    console.log('Up is: ' + this.buttons[index].up)
  }

  onAddNewRecipeButtonPress = () => {
    this.props.navigation.navigate('AddNewRecipe')
  }

  render () {
    return (
      <View style={styles.container} >
        <View style={styles.sortButtonBox}>
          <SortButtonGroup buttons={this.buttons} color={HOME_COLOR} onSortButtonPress={this.onSortButtonPress}/>
        </View>
        <View style={styles.recipesBox}>
          <Recipe
            color={HOME_COLOR}
            time={12}
            title='Pasta al Pesto'
            uri='https://www.ricettealvolo.it/wp-content/uploads/2016/10/spaghetti-al-pesto.jpg'
            saved={true}
          />
        </View>
        <View style={styles.addButtonBox}>
          <Button title='ADD NEW' type='outline' buttonStyle={styles.buttonContainer} titleStyle={styles.buttonContainer} onPress={this.onAddNewRecipeButtonPress} raised/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sortButtonBox: {
    flex: 1,
  },
  recipesBox: {
    flex: 6,
    backgroundColor: 'white',
  },
  addButtonBox: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    borderColor: HOME_COLOR,
    color: HOME_COLOR,
  }
});
