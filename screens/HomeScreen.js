import * as React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux'

import SortButtonGroup from '../components/SortButtonGroup'
import {compareRecipeByName, compareRecipeByTime} from '../utils/recipeUtils'
import Recipe from '../components/Recipe'
import AddMainInfoScreen from './AddMainInfoScreen'

const HOME_COLOR= 'crimson'

class HomeScreen extends React.Component {

  state={
    index: 0,
    up: true,
  }

  buttons = [{name: 'NAME', up: true,}, {name: 'TIME', up: true}]

  onSortButtonPress = (index) => {
    this.setState({index: index, up: this.buttons[index].up})
  }

  sortRecipes = (recipes) => {

    console.log(recipes)

    let sortedRecipes = [...recipes]

    if (this.state.index === 0){
      sortedRecipes.sort(compareRecipeByName)

    } else {
      sortedRecipes.sort(compareRecipeByTime)
    }

    console.log(sortedRecipes)

    if (this.state.up){
      sortedRecipes.reverse()
    }

    console.log(sortedRecipes)

    return sortedRecipes

  }

  renderItem = ({item}) => {

    return (
    <Recipe
      color={HOME_COLOR}
      time={+item.time}
      title={item.title}
      uri={item.image.uri}
      saved={true}
    />)
  }


  onAddNewRecipeButtonPress = () => {
    this.props.navigation.navigate('AddMainInfo', {color: HOME_COLOR})
  }

  render () {
    return (
      <View style={styles.container} >
        <View style={styles.sortButtonBox}>
          <SortButtonGroup buttons={this.buttons} color={HOME_COLOR} onSortButtonPress={this.onSortButtonPress}/>
        </View>
        <View style={styles.recipesBox}>
          {this.props.savedRecipes[0] ? (
            <FlatList
              data={this.sortRecipes(this.props.savedRecipes)}
              renderItem={this.renderItem}
              keyExtractor={item => item.title}
            />) :
            (<Text style={styles.noRecipesText}>You don't have any saved recipe yet!</Text>)
          }
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
  noRecipesText: {
    color: HOME_COLOR,
    fontSize: 30,
    textAlign: 'center',
    padding: 30,
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

mapStateToProps = ({savedRecipes}) => ({
  savedRecipes: savedRecipes
})

export default connect(mapStateToProps)(HomeScreen)
