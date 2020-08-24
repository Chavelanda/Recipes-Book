import React from 'react'
import { Text, View, KeyboardAvoidingView, StyleSheet, FlatList, TextInput } from 'react-native';
import {Button} from 'react-native-elements'

import Ingredient from '../components/Ingredient'

export default class AddIngredientsScreen extends React.Component {
  state = {
    ingredients: [{id: 0, amount: '', unit: '', ingredient: ''}],
    isFormValid: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ingredients != this.state.ingredients){
      this.validateForm()
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
    <Ingredient ingredient={item} onAmountChange={this.onAmountChange} onUnitChange={this.onUnitChange} onIngredientChange={this.onIngredientChange} color={this.props.route.params?.color} index={index}  />
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
    const valid = this.state.ingredients.map(this.isIngredientValid).reduce((validityUntilNow, validityIngredient) => validityUntilNow && validityIngredient, true)
    this.setState({isFormValid: valid})
  }

  isIngredientValid = (ingredient) => {
    return (+ingredient.amount > 0 && ingredient.ingredient !== '')
  }

  onNextButtonPressed = () => {
    let {isFormValid, ...parameters} = this.state
    this.props.navigation.navigate('AddSteps', {...parameters, ...this.props.route.params})
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
