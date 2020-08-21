import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


const SortButton = (props) => {
  return (
    <View style={styles.container}>
      <Icon name={`ios-arrow-drop${props.up ? 'up' : 'down'}`} type='ionicon' color={props.color || 'black'} />
      <Text style={{color: props.color || 'black'}}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

export default SortButton
