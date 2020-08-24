import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types'

const Ingredient = (props) => {

  const handleAmountChange = (amount) => {
    props.onAmountChange(props.index, amount)
  }

  const handleUnitChange = (unit) => {
    props.onUnitChange(props.index, unit)
  }

  const handleIngredientChange = (ingredient) => {
    props.onIngredientChange(props.index, ingredient)
  }

  return (
    <View style={styles.ingredient}>
      <Text style={[styles.index, {color: props.color}]}>{props.index + 1 + ')'}</Text>
      <TextInput
        keyboardType='numeric'
        style={[styles.input, {borderColor: props.color, flex: 2}]}
        placeholder='Amount'
        value={props.ingredient.amount}
        onChangeText={handleAmountChange}
      />
      <TextInput
        style={[styles.input, {borderColor: props.color, flex: 2}]}
        placeholder='Unit  (g, cups...)'
        value={props.ingredient.unit}
        onChangeText={handleUnitChange}
      />
      <TextInput
        style={[styles.input, {borderColor: props.color, flex: 4}]}
        placeholder='Ingredient'
        value={props.ingredient.ingredient}
        onChangeText={handleIngredientChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  index: {
    fontSize: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 5,
    height: 30,
    margin: 10,
    fontSize: 15,
  },
})

Ingredient.propTypes = {
  color: PropTypes.string,
  index: PropTypes.number,
  ingredient: PropTypes.object,
  onAmountChange: PropTypes.func,
  onUnitChange: PropTypes.func,
  onIngredientChange: PropTypes.func
}

export default Ingredient
