import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ButtonGroup } from 'react-native-elements'

export default class HomeScreen extends React.Component {
  render () {
    return (
      <View style={styles.container} >
        <View style={styles.sortButtonBox}>
        </View>
        <View style={styles.recipesBox}>
          <Text>Home Screen</Text>
        </View>
        <View style={styles.addButtonBox}>
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
    backgroundColor: 'red',
  },
  addButtonBox: {
    flex: 1,
    backgroundColor: 'green',
  },
});
