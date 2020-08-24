import React from 'react'
import { Text, View, KeyboardAvoidingView, StyleSheet, FlatList, TextInput } from 'react-native';
import {Button} from 'react-native-elements'

import Step from '../components/Step'

export default class AddStepsScreen extends React.Component {

  state = {
    steps: [{id: 0, description: ''}],
    isFormValid: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.steps != this.state.steps){
      this.validateForm()
    }
  }

  onStepChange = (index, description) => {
    const newSteps = [...this.state.steps]
    newSteps[index] = {...newSteps[index], description: description}
    this.setState({steps: newSteps})
  }

  renderItem = ({item, index}) => (
    <Step step={item} onStepChange={this.onStepChange} color={this.props.route.params?.color} index={index}  />
  )

  onAddStep = () => {
    this.setState({steps: [...this.state.steps, {id: this.state.steps.length, description: ''}]})
    console.log(this.props.route.params)
  }

  onRemoveStep = () => {
    const newSteps = [...this.state.steps].splice(0, this.state.steps.length - 1)

    if (this.state.steps.length > 1){
      this.setState({steps: newSteps})
    }
  }

  validateForm = () => {
    const valid = this.state.steps.map(this.isStepValid).reduce((validityUntilNow, validityIngredient) => validityUntilNow && validityIngredient, true)
    this.setState({isFormValid: valid})
  }

  isStepValid = (step) => {
    return (step.description !== '')
  }

  onNextButtonPressed = () => {
    console.log('Next Button pressed')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behaviour='position'>
        <View style={styles.steps}>
          <FlatList
            data={this.state.steps}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.id}`}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title='ADD STEP'
            type='outline'
            buttonStyle={{borderColor: this.props.route.params?.color}}
            titleStyle={{color: this.props.route.params?.color}}
            onPress={this.onAddStep}
          />
          <Button
            title='REMOVE STEP'
            type='outline'
            buttonStyle={{borderColor: this.props.route.params?.color}}
            titleStyle={{color: this.props.route.params?.color}}
            onPress={this.onRemoveStep}
          />
        </View>
        <View>
          <Button
            title='SUBMIT'
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
  steps: {
    height: 350,
  },
  buttons: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nextButton: {
    height: 50,
  }
})
