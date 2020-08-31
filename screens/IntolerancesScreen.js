import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import {Divider} from 'react-native-elements'

import ExcludedIngredients from '../components/ExcludedIngredients'
import Intolerances from '../components/Intolerances'

const IntolerancesScreen = (props) => {

  return (
    <View style={styles.container} >
      <Intolerances />
      <Divider width={Dimensions.get('window').width}/>
      <ExcludedIngredients />
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

export default IntolerancesScreen
