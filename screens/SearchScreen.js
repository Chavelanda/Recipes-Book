import * as React from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import {Button, Icon} from 'react-native-elements'
import { connect } from 'react-redux'

import SortButtonGroup from '../components/SortButtonGroup'
import Recipe from '../components/Recipe'
import {compareRecipeByName, compareRecipeByTime} from '../utils/recipeUtils'
import {addNewRecipe} from '../redux/actions'
import {fetchRecipesByName} from '../api/api'

class SearchScreen extends React.Component {

  state = {
    searchedRecipes: [],
    searchByName: true,
    index: 0,
    up: false,
    searchInput: '',
  }

  handleSearchInputChange = (searchInput) => {
    this.setState({searchInput})
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
      color={this.props.colors[1]}
      time={+item.time}
      title={item.title}
      image={item.image}
      saved={this.isRecipeSaved(item)}
      onStarPressed={this.onStarPressed}
      onModifyPressed={this.onModifyPressed}
      onRecipePressed={this.onRecipePressed}
    />)
  }

  isRecipeSaved = (recipe) => {
    const isSaved = this.props.savedRecipes.find((savedRecipe) => recipe.id === savedRecipe.id && recipe.created === savedRecipe.created)
    return isSaved ? true : false
  }

  onStarPressed = (id, created, saved) => {
    if (saved){
      this.deleteFromSaved(id, created)
    } else {
      this.props.addNewRecipe(this.state.searchedRecipes.find((recipe) => recipe.id === id))
    }
  }

  deleteFromSaved = (id, created) => {
    let sure = false
    Alert.alert(
      'Sure?',
      'If you go ahead you will delete your recipe.',
      [{text: 'Delete it!', onPress: () => this.props.deleteRecipe({id: id, created: created}), style:'default'}, {text: 'Go back', style: 'cancel'} ],
      {cancelable: true}
    )
  }

  onModifyPressed = (id, created) => {
    this.props.navigation.navigate('AddMainInfo', {color: this.props.colors[1], ...this.state.searchedRecipes.find((recipe) => recipe.id === id && recipe.created === created)})
  }

  onRecipePressed = (id, created) => {
    const recipe = this.state.searchedRecipes.find((recipe) => recipe.id === id && recipe.created === created)
    this.props.navigation.navigate('MainInfo', {...recipe, color: this.props.colors[1]})
  }

  onSearchButtonPressed = async () => {
    const recipes = await fetchRecipesByName(this.state.searchInput)
    this.setState({searchedRecipes: recipes})
  }

  render () {
    return (
      <KeyboardAvoidingView style={styles.container} behaviour='height'>
        <View style={styles.searchBox} >
          <Icon name='ios-swap' type='ionicon' color={this.props.colors[1]} onPress={() => console.log('swap pressed')} reverse/>
          <TextInput style={[styles.searchInput, {borderColor: this.props.colors[1]}]} placeholder='Search Recipe by Name' value={this.state.searchInput} onChangeText={this.handleSearchInputChange}/>
        </View>
        <View style={styles.sortButtonBox} >
          <SortButtonGroup buttons={this.buttons} color={this.props.colors[1]} onSortButtonPress={this.onSortButtonPress}/>
        </View>
        <View style={styles.recipesBox} >
        {this.state.searchedRecipes[0] ? (
          <FlatList
            data={this.sortRecipes(this.state.searchedRecipes)}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.id} ${item.created}`}
          />) :
          (<Text style={[styles.noRecipesText, {color: this.props.colors[1]}]}>Search Recipes to have them here!</Text>)
        }
        </View>
        <View style={styles.searchButtonBox}>
          <Button title='SEARCH' containerStyle={styles.searchButtonContainer} buttonStyle={{borderColor: this.props.colors[1]}} titleStyle={{color: this.props.colors[1]}} type='outline' disabled={this.state.searchInput === '' ? true : false} onPress={this.onSearchButtonPressed} raised/>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 5,
    height: 30,
    margin: 10,
    fontSize: 15,
    flex: 1,
  },
  sortButtonBox: {
    height: 50,
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
  searchButtonBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  searchButtonContainer: {
    flex: 1,
    marginHorizontal: 30
  },
});

mapStateToProps = ({savedRecipes, themeColors}) => ({
  savedRecipes: savedRecipes,
  colors: themeColors,
})

export default connect(mapStateToProps, {addNewRecipe})(SearchScreen)
