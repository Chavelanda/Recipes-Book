import React from 'react'
import { Text, View, KeyboardAvoidingView, StyleSheet, FlatList, TextInput } from 'react-native';
import {Button} from 'react-native-elements'
import { connect } from 'react-redux'
import {addNewRecipe} from '../redux/actions'
import { CommonActions } from '@react-navigation/native';

import StepInput from '../components/StepInput'

class AddStepsScreen extends React.Component {

  constructor(props) {
    super(props)

    const {steps} = this.props.route.params

    this.state = {
      steps: steps || [{id: 0, description: ''}],
      isFormValid: steps ? this.areStepsValid(steps) : false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.steps != this.state.steps){
      this.validateForm()
      this.props.navigation.dispatch(CommonActions.setParams({...this.props.route.params, steps: this.state.steps}))
    }
  }

  onStepChange = (index, description) => {
    const newSteps = [...this.state.steps]
    newSteps[index] = {...newSteps[index], description: description}
    this.setState({steps: newSteps})
  }

  renderItem = ({item, index}) => (
    <StepInput step={item} onStepChange={this.onStepChange} color={this.props.route.params?.color} index={index}  />
  )

  onAddStep = () => {
    this.setState({steps: [...this.state.steps, {id: this.state.steps.length, description: ''}]})

  }

  onRemoveStep = () => {
    const newSteps = [...this.state.steps].splice(0, this.state.steps.length - 1)

    if (this.state.steps.length > 1){
      this.setState({steps: newSteps})
    }
  }

  validateForm = () => {
    const valid = this.areStepsValid()
    this.setState({isFormValid: valid})
  }

  areStepsValid = (steps = this.state.steps) => {
    return steps.map(this.isStepValid).reduce((validityUntilNow, validityIngredient) => validityUntilNow && validityIngredient, true)
  }

  isStepValid = (step) => {
    return (step.description !== '')
  }

  onSubmitButtonPressed = () => {
    const {color, ...parameters} = this.props.route.params
    const steps = this.state.steps
    const id = this.props.idRecipe
    this.props.addNewRecipe({id: id, created: true, ...parameters, steps,})
    this.props.navigation.navigate('Home')
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
            onPress={this.onSubmitButtonPressed}
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
});

mapStateToProps = ({idRecipe}) => ({
  idRecipe: idRecipe,
})

export default connect(mapStateToProps, {addNewRecipe})(AddStepsScreen)
