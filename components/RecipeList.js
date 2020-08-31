import React from 'react'
import { FlatList, Alert } from 'react-native';
import { connect } from 'react-redux'
import { deleteRecipe, addNewRecipe } from '../redux/actions'
import PropTypes from 'prop-types'

import Recipe from './Recipe'


const RecipeList = (props) => {

  const renderItem = ({item}) => {
    return (
    <Recipe
      id={item.id}
      created={item.created}
      color={props.color}
      time={+item.time}
      title={item.title}
      image={item.image}
      saved={isRecipeSaved(item)}
      home={props.home}
      onStarPressed={onStarPressed}
      onModifyPressed={onModifyPressed}
      onRecipePressed={onRecipePressed}
    />)
  }

  const isRecipeSaved = (recipe) => {
    const isSaved = props.savedRecipes.find((savedRecipe) => recipe.id === savedRecipe.id && recipe.created === savedRecipe.created)
    return isSaved ? true : false
  }

  const onStarPressed = (id, created, saved) => {
    if (saved){
      deleteFromSaved(id, created)
    } else {
      props.addNewRecipe(props.sortedRecipes.find((recipe) => recipe.id === id))
    }
  }

  const deleteFromSaved = (id, created) => {
    Alert.alert(
      'Sure?',
      'If you go ahead you will delete your recipe.',
      [{text: 'Delete it!', onPress: () => props.deleteRecipe({id: id, created: created}), style:'default'}, {text: 'Go back', style: 'cancel'} ],
      {cancelable: true}
    )
  }

  const onModifyPressed = (id, created) => {
    props.navigation.navigate('AddMainInfo', {color: props.color, ...props.sortedRecipes.find((recipe) => recipe.id === id && recipe.created === created)})
  }

  const onRecipePressed = (id, created) => {
    const recipe = props.sortedRecipes.find((recipe) => recipe.id === id && recipe.created === created)
    props.navigation.navigate('MainInfo', {...recipe, color: props.color})
  }

  return (
    <FlatList
      data={props.sortedRecipes}
      renderItem={renderItem}
      keyExtractor={item => `${item.id} ${item.created}`}
    />
  )
}

RecipeList.propTypes = {
  sortedRecipes: PropTypes.array,
  color: PropTypes.string,
  home: PropTypes.bool,
  navigation: PropTypes.object
}

mapStateToProps = ({savedRecipes}) => ({
  savedRecipes: savedRecipes,
})

export default connect(mapStateToProps, {addNewRecipe, deleteRecipe})(RecipeList)
