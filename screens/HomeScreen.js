import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {Button} from 'react-native-elements'

import SortButtonGroup from '../components/SortButtonGroup'

const HOME_COLOR='crimson'

export default class HomeScreen extends React.Component {
  render () {
    return (
      <View style={styles.container} >
        <View style={styles.sortButtonBox}>
          <SortButtonGroup buttons={[{name: 'NAME', up: true,}, {name: 'TIME', up: true}]} color={HOME_COLOR}/>
        </View>
        <View style={styles.recipesBox}>
          <Text>Home Screen</Text>
        </View>
        <View style={styles.addButtonBox}>
          <Button title='ADD NEW' type='outline' buttonStyle={styles.buttonContainer} titleStyle={styles.buttonContainer} onPress={() => console.log('add new button pressed')} raised/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sortButtonBox: {
    flex: 1,
  },
  recipesBox: {
    flex: 6,
    backgroundColor: 'white',
  },
  addButtonBox: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    borderColor: HOME_COLOR,
    color: HOME_COLOR,
  }
});
