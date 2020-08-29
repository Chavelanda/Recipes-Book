import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import {Icon} from 'react-native-elements'
import PropTypes from 'prop-types'

const Ingredient = (props) => (
  <View style={styles.ingredient}>
    <Icon name='ios-arrow-forward' type='ionicon' color={props.color} />
    <Text style={styles.text}>{' ' + props.item.amount + ' ' + props.item.unit + ' '}</Text>
    <Text style={styles.textBold}>{props.item.ingredient}</Text>
  </View>
)

const styles=StyleSheet.create({
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 20,
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

Ingredient.propTypes = {
  item: PropTypes.object,
  color: PropTypes.string,
}

export default Ingredient
