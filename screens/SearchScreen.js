import * as React from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import {Button, Icon} from 'react-native-elements'
import { connect } from 'react-redux'

import SortButtonGroup from '../components/SortButtonGroup'
import RecipeList from '../components/RecipeList'
import {compareRecipeByName, compareRecipeByTime} from '../utils/recipeUtils'
import {fetchRecipesByName, fetchRecipesByIngredients} from '../api/api'

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

  swapSearchType = () => {
    this.setState((prevState) => ({searchByName: !prevState.searchByName}))
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

  onSearchByNameButtonPressed = async () => {
    const recipes = await fetchRecipesByName(this.state.searchInput)
    this.setState({searchedRecipes: recipes})
  }

  maximizeUsagePressed = async () => {
    const recipes = await fetchRecipesByIngredients(this.state.searchInput, 1)
    this.setState({searchedRecipes: recipes})
  }

  minimizeExcessPressed = async () => {
    const recipes = await fetchRecipesByIngredients(this.state.searchInput, 2)
    this.setState({searchedRecipes: recipes})
  }

  render () {
    return (
      <KeyboardAvoidingView style={styles.container} behaviour='height'>
        <View style={styles.searchBox} >
          <Icon name='ios-swap' type='ionicon' color={this.props.colors[1]} onPress={this.swapSearchType} reverse/>
          <TextInput
            style={[styles.searchInput, {borderColor: this.props.colors[1]}]}
            placeholder={this.state.searchByName ? 'Recipe\'s Name' : 'Comma separated Ingredients'}
            value={this.state.searchInput}
            onChangeText={this.handleSearchInputChange}
          />
        </View>
        <View style={styles.sortButtonBox} >
          <SortButtonGroup buttons={this.buttons} color={this.props.colors[1]} onSortButtonPress={this.onSortButtonPress}/>
        </View>
        <View style={styles.recipesBox} >
        {this.state.searchedRecipes[0] ? (
          <RecipeList sortedRecipes={this.sortRecipes(this.state.searchedRecipes)} color={this.props.colors[1]} home={false} navigation={this.props.navigation}/>
        ) :
          (<Text style={[styles.noRecipesText, {color: this.props.colors[1]}]}>Search Recipes to have them here!</Text>)
        }
        </View>
        <View style={styles.searchButtonBox}>
          {this.state.searchByName ? (
            <Button
              title='SEARCH BY NAME'
              containerStyle={styles.searchButtonContainer}
              buttonStyle={{borderColor: this.props.colors[1]}}
              titleStyle={{color: this.props.colors[1]}}
              type='outline'
              disabled={this.state.searchInput === '' ? true : false}
              onPress={this.onSearchByNameButtonPressed} raised
            />
          ) : (
            <View style={styles.searchButtonBox}>
              <Button
                title='MAXIMIZE INGREDIENTS USAGE'
                containerStyle={styles.searchButtonContainer}
                buttonStyle={{borderColor: this.props.colors[1]}}
                titleStyle={{color: this.props.colors[1]}}
                type='outline'
                disabled={this.state.searchInput === '' ? true : false}
                onPress={this.maximizeUsagePressed} raised
              />
              <Button
                title='MINIMIZE INGREDIENTS EXCESS'
                containerStyle={styles.searchButtonContainer}
                buttonStyle={{borderColor: this.props.colors[1]}}
                titleStyle={{color: this.props.colors[1]}}
                type='outline'
                disabled={this.state.searchInput === '' ? true : false}
                onPress={this.minimizeExcessPressed} raised
              />
            </View>
          )}
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
    flex: 5,
    backgroundColor: 'white',
  },
  noRecipesText: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    padding: 30,
  },
  searchButtonBox: {
      flex: 2,
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

export default connect(mapStateToProps)(SearchScreen)
