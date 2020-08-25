import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import {Button} from 'react-native-elements'

import Step from '../components/Step'

const StepsScreen = (props) => {

  const renderItem = ({item}) => (<Step step={item} color={props.route.params.color} />)

  return (
    <View style={styles.container}>
      <FlatList
        data={props.route.params.steps}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white'
  },
});

export default StepsScreen
