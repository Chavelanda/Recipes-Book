import React from 'react'
import { Text, View, StyleSheet, FlatList, Picker } from 'react-native';
import {Button, Icon} from 'react-native-elements'
//import {Picker} from '@react-native-community/picker'


import Ingredient from '../components/Ingredient'

class IngredientsScreen extends React.Component {

  state = {
    selectedValue: +this.props.route.params.servings,
  }

  renderItem = ({item}) => (<Ingredient item={item} color={this.props.route.params.color} />)

  onNextButtonPressed = () => {
    props.navigation.navigate('Steps', {...this.props.route.params})
  }

  createPicker = (val, index) => {
    return (
      <Picker.Item key={index} label={(index + 1).toString()} value={index + 1} />
    )
  }

  pickerValueChanged = (itemValue) => {
    this.setState({selectedValue: itemValue})
  }

  remapQuantities = (ingredient) => {
    const newAmount = ingredient.amount / +this.props.route.params.servings * this.state.selectedValue
    return {...ingredient, amount: newAmount}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.servings}>
          <Text style={styles.text}>{'Servings: '}</Text>
          <Picker selectedValue={this.state.selectedValue} style={styles.picker} mode='dropdown' onValueChange={this.pickerValueChanged}>
            {Array.apply(null, Array(50)).map(this.createPicker)}
          </Picker>
        </View>
        <View style={styles.ingredients}>
          <FlatList
            data={this.props.route.params.ingredients.map(this.remapQuantities)}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.id}`}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='SEE STEPS'
            type='outline'
            buttonStyle={{borderColor: this.props.route.params?.color}}
            titleStyle={{color: this.props.route.params?.color}}
            onPress={this.onNextButtonPressed}
            raised
          />
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    backgroundColor: 'white'
  },
  servings: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picker: {
    height: 30,
    width: 90,
  },
  ingredients: {
    height: 350,
    flex: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default IngredientsScreen
