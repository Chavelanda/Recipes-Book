import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements'

import RecipeMainInfoInput from '../components/RecipeMainInfoInput'

const HOME_COLOR = 'crimson'

export default class AddNewRecipeScreen extends React.Component {

  handleMainInfoUpdate = (title, time, servings, image) => {
    console.log(image)
    console.log(title)
    console.log(time)
    console.log(servings)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainInfoBox}>
          <RecipeMainInfoInput color={HOME_COLOR} onUpdate={this.handleMainInfoUpdate}/>
        </View>
        <View style={styles.ingredientsBox}>
        </View>
        <View style={styles.stepsBox}>
        </View>
        <View style={styles.submitButtonBox}>
          <Button title='SUBMIT' type='outline' buttonStyle={styles.buttonContainer} titleStyle={styles.buttonContainer} onPress={() => console.log('new recipe submitted')} raised/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  mainInfoBox: {
    flex: 5,
  },
  ingredientsBox: {
    flex: 5
  },
  stepsBox: {
    flex: 5
  },
  submitButtonBox: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    borderColor: HOME_COLOR,
    color: HOME_COLOR,
  },
});
