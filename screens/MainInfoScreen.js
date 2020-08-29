import * as React from 'react';
import { Text, View, StyleSheet, Image,} from 'react-native';
import {Button, Icon} from 'react-native-elements'

const MainInfoScreen = (props) => {

  const {image, title, time, servings} = props.route.params

  const onNextButtonPressed = () => {
    props.navigation.navigate('Ingredients', {...props.route.params})
  }

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, {borderColor: props.route.params?.color}]}
        source={props.route.params.image}
      />
      <View style={styles.textBox}>
        <Icon name='ios-basket' type='ionicon' color={props.route.params.color}/>
        <Text style={styles.text}>
          {' Title: '}
        </Text>
        <Text style={styles.content}>
          {props.route.params.title}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Icon name='ios-clock' type='ionicon' color={props.route.params.color}/>
        <Text style={styles.text}>
          {' Cooking Time: '}
        </Text>
        <Text style={styles.content}>
          {props.route.params.time}'
        </Text>
      </View>
      <View style={styles.textBox}>
        <Icon name='ios-people' type='ionicon' color={props.route.params.color}/>
        <Text style={styles.text}>
          {' Servings: '}
        </Text>
        <Text style={styles.content}>
          {props.route.params.servings}
        </Text>
      </View>
      <Button
        title='SEE INGREDIENTS'
        type='outline'
        buttonStyle={{borderColor: props.route.params?.color}}
        titleStyle={{color: props.route.params?.color}}
        onPress={onNextButtonPressed}
        raised
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 60,
    borderColor:'black',
    borderWidth: 1,
    alignSelf: 'center'
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 20,
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default MainInfoScreen
