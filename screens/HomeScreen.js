import * as React from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux'
import { deleteRecipe } from '../redux/actions'

import SortButtonGroup from '../components/SortButtonGroup'
import {compareRecipeByName, compareRecipeByTime} from '../utils/recipeUtils'
import Recipe from '../components/Recipe'
import AddMainInfoScreen from './AddMainInfoScreen'

class HomeScreen extends React.Component {

  state={
    index: 0,
    up: false,
  }

  buttons = [{name: 'NAME', up: false,}, {name: 'TIME', up: false}]

  onSortButtonPress = (index) => {
    this.setState({index: index, up: this.buttons[index].up})
  }

  sortRecipes = (recipes) => {
    let sortedRecipes = [...recipes]
    if (this.state.index === 0){
      sortedRecipes.sort(compareRecipeByName)
    } else {
      sortedRecipes.sort(compareRecipeByTime)
    }
    if (this.state.up){
      sortedRecipes.reverse()
    }
    return sortedRecipes
  }

  renderItem = ({item}) => {
    return (
    <Recipe
      id={item.id}
      created={item.created}
      color={this.props.colors[0]}
      time={+item.time}
      title={item.title}
      image={item.image}
      saved={true}
      home={true}
      onStarPressed={this.onStarPressed}
      onModifyPressed={this.onModifyPressed}
      onRecipePressed={this.onRecipePressed}
    />)
  }

//Since we are in the home it can only mean delete from saved
  onStarPressed = (id, created) => {
    let sure = false
    Alert.alert(
      'Sure?',
      'If you go ahead you will delete your recipe.',
      [{text: 'Delete it!', onPress: () => this.props.deleteRecipe({id: id, created: created}), style:'default'}, {text: 'Go back', style: 'cancel'} ],
      {cancelable: true}
    )
  }

  onModifyPressed = (id, created) => {
    this.props.navigation.navigate('AddMainInfo', {color: this.props.colors[0], ...this.props.savedRecipes.find((recipe) => recipe.id === id && recipe.created === created)})
  }

  onRecipePressed = (id, created) => {
    const recipe = this.props.savedRecipes.find((recipe) => recipe.id === id && recipe.created === created)
    this.props.navigation.navigate('MainInfo', {...recipe, color: this.props.colors[0]})
  }

  onAddNewRecipeButtonPress = () => {
    this.props.navigation.navigate('AddMainInfo', {color: this.props.colors[0]})
  }

  render () {
    return (
      <View style={styles.container} >
        <View style={styles.sortButtonBox}>
          <SortButtonGroup buttons={this.buttons} color={this.props.colors[0]} onSortButtonPress={this.onSortButtonPress}/>
        </View>
        <View style={styles.recipesBox}>
          {this.props.savedRecipes[0] ? (
            <FlatList
              data={this.sortRecipes(this.props.savedRecipes)}
              renderItem={this.renderItem}
              keyExtractor={item => `${item.id} ${item.created}`}
            />) :
            (<Text style={[styles.noRecipesText, {color: this.props.colors[0]}]}>You don't have any saved recipe yet!</Text>)
          }
        </View>
        <View style={styles.addButtonBox}>
          <Button title='ADD NEW' type='outline' buttonStyle={[styles.buttonContainer, {borderColor: this.props.colors[0]}]} titleStyle={[styles.buttonContainer, {color: this.props.colors[0]}]} onPress={this.onAddNewRecipeButtonPress} raised/>
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
    color: 'black',
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
    borderColor: 'black',
    color: 'black',
  }
});


mapStateToProps = ({savedRecipes, themeColors}) => ({
  savedRecipes: savedRecipes,
  colors: themeColors,
})

export default connect(mapStateToProps, {deleteRecipe})(HomeScreen)
