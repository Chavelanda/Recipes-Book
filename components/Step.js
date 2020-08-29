import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

const Step = (props) => (
  <View style={styles.step}>
    <Text style={[styles.text, {color: props.color}]}>{props.step.id + 1})</Text>
    <Text style={styles.text}>{props.step.description}</Text>
  </View>
)

const styles=StyleSheet.create({
  step: {
    alignItems: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 20,
    margin: 5,
  },
})

Step.propTypes = {
  step: PropTypes.object,
  color: PropTypes.string,
}

export default Step
