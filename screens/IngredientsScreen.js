import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import {Button, Icon} from 'react-native-elements'

import Ingredient from '../components/Ingredient'

const IngredientsScreen = (props) => {

  const renderItem = ({item}) => (<Ingredient item={item} color={props.route.params.color} />)

  const onNextButtonPressed = () => {
    props.navigation.navigate('Steps', {...props.route.params})
  }

  return (
    <View style={styles.container}>
      <View style={styles.ingredients}>
        <FlatList
          data={props.route.params.ingredients}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='SEE STEPS'
          type='outline'
          buttonStyle={{borderColor: props.route.params?.color}}
          titleStyle={{color: props.route.params?.color}}
          onPress={onNextButtonPressed}
          raised
        />
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    backgroundColor: 'white'
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
