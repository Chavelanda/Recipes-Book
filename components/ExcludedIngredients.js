import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, Alert, FlatList, Dimensions} from 'react-native';
import {ListItem, Icon, Overlay, Button, Divider} from 'react-native-elements'
import { connect } from 'react-redux'

import {addIngredient, removeIngredient} from '../redux/actions'


const ExcludedIngredients = (props) => {

  const [visible, setVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const mapIngredients = ({item, index}) => (
    <ListItem
      title={item}
      leftIcon={{name: 'ios-close', type: 'ionicon', color: props.colors[2]}}
      onPress={() => removeIngredient(item)}
      bottomDivider
    />
  )

  const removeIngredient = (ingredient) => {
    Alert.alert(
      'Sure?',
      'If you go ahead you will remove the ingredient from the list of excluded ones.',
      [{text: 'Remove it!', onPress: () => props.removeIngredient(ingredient), style:'default'}, {text: 'Go back', style: 'cancel'} ],
      {cancelable: true}
    )
  }

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const onValueChange = (value) => {
    setInputValue(value)
  }

  const onButtonPressed = () => {
    props.addIngredient(inputValue)
    setInputValue('')
    toggleOverlay()
  }

  const renderFooterComponent = (
    <ListItem
      title='Add Ingredient'
      leftIcon={{name: 'ios-add', type: 'ionicon', color: props.colors[2]}}
      onPress={toggleOverlay}
      bottomDivider
    />
  )

  return (
    <View style={styles.container}>
      <View style={styles.innerBox}>
        <Text style={styles.help}>Here you can insert ingredients. 'Search by Name' mode will exclude recipes including those ingredients.</Text>
        <Divider width={Dimensions.get('window').width}/>
        <FlatList
          data={props.excludedIngredients}
          renderItem={mapIngredients}
          keyExtractor={ingredient => ingredient}
          ListFooterComponent={renderFooterComponent}
        />
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.prompt}>
          <TextInput
            placeholder='Ingredient'
            style={[styles.input, {borderColor: props.colors[2]}]}
            value={inputValue}
            onChangeText={onValueChange}
          />
          <Button
            title='Add'
            type='outline'
            buttonStyle={{borderColor: props.colors[2]}}
            titleStyle={{color: props.colors[2]}}
            onPress={onButtonPressed}
            disabled={inputValue === ''}
          />
        </View>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerBox: {
    flex: 1
  },
  prompt: {
    height: 200,
    width: 150,
    justifyContent: 'space-around'
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    borderColor: 'black'
  },
  help: {
    padding: 8,
    textAlign: 'center'
  }
});

const mapStateToProps = ({themeColors, excludedIngredients}) => ({
  colors: themeColors,
  excludedIngredients: excludedIngredients
})

export default connect(mapStateToProps, {addIngredient, removeIngredient})(ExcludedIngredients)
