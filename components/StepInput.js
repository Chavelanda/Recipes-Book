import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types'

const StepInput = (props) => {

  const handleStepChange = (step) => {
    props.onStepChange(props.index, step)
  }
  return (
    <View style={styles.step}>
      <Text style={[styles.index, {color: props.color}]}>{props.index + 1 + ')'}</Text>
      <TextInput
        style={[styles.input, {borderColor: props.color, flex: 1}]}
        placeholder='Step description'
        value={props.step.description}
        onChangeText={handleStepChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  step: {
    flexDirection: 'row',
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

StepInput.propTypes = {
  color: PropTypes.string,
  index: PropTypes.number,
  step: PropTypes.object,
  onStepChange: PropTypes.func,
}

export default StepInput
