import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements';
import PropTypes from 'prop-types'

import camera from '../assets/camera.png'

const Recipe = (props) => {
  return (
    <Card
      containerStyle={[
        styles.container,
        { borderColor: props.color || 'black' },
      ]}
      wrapperStyle={styles.wrapper}>
      <TouchableHighlight style={styles.wrapper} onPress={() => {props.onRecipePressed(props.id, props.created)}} activeOpacity={0.3} underlayColor='white'>
        <View style={styles.wrapper}>
          <View style={styles.imageBox}>
            <Image style={styles.image} source={props.image} />
          </View>
          <View style={styles.description}>
            <Text style={styles.title}>{props.title}</Text>
            <Divider
              style={{ backgroundColor: props.color || 'black', width: 110 }}
            />
            <Text style={styles.time}>Cooking Time: {props.time}'</Text>
          </View>
          <View style={styles.optionBox}>
            <Icon
              name={`ios-star${props.saved ? '' : '-outline'}`}
              type="ionicon"
              color={props.color}
              onPress={() => props.onStarPressed(props.id, props.created, props.saved)}
            />
            {props.home && (
              <Icon
                name="ios-brush"
                type="ionicon"
                color={props.color}
                onPress={() => props.onModifyPressed(props.id, props.created)}
              />
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 120,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  imageBox: {
    flex: 2,
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  description: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  time: {
    fontStyle: 'italic',
  },
  optionBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

Recipe.propTypes = {
  id: PropTypes.number,
  created: PropTypes.bool,
  color: PropTypes.string,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  saved: PropTypes.bool,
  home: PropTypes.bool,
  onStarPressed: PropTypes.func,
  onModifyPressed: PropTypes.func,
  onRecipePressed: PropTypes.func,
}

export default Recipe;
