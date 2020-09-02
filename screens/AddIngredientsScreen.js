import React from 'react'
import { Text, View, KeyboardAvoidingView, StyleSheet, FlatList, TextInput } from 'react-native';
import {Button} from 'react-native-elements'
import { CommonActions } from '@react-navigation/native';

import IngredientInput from '../components/IngredientInput'

export default class AddIngredientsScreen extends React.Component {

  constructor(props){
      super(props)

      const {ingredients} = this.props.route.params

      this.state = {
        ingredients: ingredients || [{id: 0, amount: '', unit: '', ingredient: ''}],
        isFormValid: ingredients ? this.areIngredientsValid(ingredients) : false,
      }
  }



  componentDidUpdate(prevProps, prevState) {

    if (prevState.ingredients != this.state.ingredients){
      this.validateForm()
      this.props.navigation.dispatch(CommonActions.setParams({...this.props.route.params, ingredients: this.state.ingredients}))
    }
  }

  onAmountChange = (index, amount) => {
    const newIngredients = [...this.state.ingredients]
    newIngredients[index] = {...newIngredients[index], amount: amount}
    this.setState({ingredients: newIngredients})
  }

  onUnitChange = (index, unit) => {
    const newIngredients = [...this.state.ingredients]
    newIngredients[index] = {...newIngredients[index], unit: unit}
    this.setState({ingredients: newIngredients})
  }

  onIngredientChange = (index, ingredient) => {
    const newIngredients = [...this.state.ingredients]
    newIngredients[index] = {...newIngredients[index], ingredient: ingredient}
    this.setState({ingredients: newIngredients})
  }

  renderItem = ({item, index}) => (
    <IngredientInput ingredient={item} onAmountChange={this.onAmountChange} onUnitChange={this.onUnitChange} onIngredientChange={this.onIngredientChange} color={this.props.route.params?.color} index={index}  />
  )

  onAddIngredient = () => {
    this.setState({ingredients: [...this.state.ingredients, {id: this.state.ingredients.length, amount: '', unit: '', ingredient: ''}]})
  }

  onRemoveIngredient = () => {
    const newIngredients = [...this.state.ingredients].splice(0, this.state.ingredients.length - 1)

    if (this.state.ingredients.length > 1){
      this.setState({ingredients: newIngredients})
    }
  }

  validateForm = () => {
    const valid = this.areIngredientsValid()
    this.setState({isFormValid: valid})
  }

  areIngredientsValid = (ingredients = this.state.ingredients) => {
    return ingredients.map(this.isIngredientValid).reduce((validityUntilNow, validityIngredient) => validityUntilNow && validityIngredient, true)
  }

  isIngredientValid = (ingredient) => {
    return (ingredient.ingredient !== '')
  }

  onNextButtonPressed = () => {
    const {isFormValid, ingredients} = this.state
    const qbIngredients = [...ingredients].map((ingredient) => ({...ingredient, amount: +ingredient.amount > 0 ? ingredient.amount : 'q.b.'}))
    this.props.navigation.navigate('AddSteps', {...this.props.route.params, ingredients: qbIngredients,})
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behaviour='position'>
        <View style={styles.ingredients}>
          <FlatList
            data={this.state.ingredients}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.id}`}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title='ADD INGREDIENT'
            type='outline'
            buttonStyle={{borderColor: this.props.route.params?.color}}
            titleStyle={{color: this.props.route.params?.color}}
            onPress={this.onAddIngredient}
          />
          <Button
            title='REMOVE INGREDIENT'
            type='outline'
            buttonStyle={{borderColor: this.props.route.params?.color}}
            titleStyle={{color: this.props.route.params?.color}}
            onPress={this.onRemoveIngredient}
          />
        </View>
        <View>
          <Button
            title='NEXT'
            type='outline'
            buttonStyle={{borderColor: this.props.route.params?.color}}
            titleStyle={{color: this.props.route.params?.color}}
            onPress={this.onNextButtonPressed}
            disabled={!this.state.isFormValid}
            raised
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white'
  },
  ingredients: {
    height: 350,
  },
  buttons: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButton: {
    height: 50,
  }
})
