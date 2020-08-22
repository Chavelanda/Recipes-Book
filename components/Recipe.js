import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements';
import PropTypes from 'prop-types'

const Recipe = (props) => {
  return (
    <Card
      containerStyle={[
        styles.container,
        { borderColor: props.color || 'black' },
      ]}
      wrapperStyle={styles.wrapper}>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{ uri: props.uri }} />
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
        />
        {props.saved && (
          <Icon name="ios-brush" type="ionicon" color={props.color} />
        )}
      </View>
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
  color: PropTypes.string,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string,
  saved: PropTypes.bool,
}

export default Recipe;
