import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import {Button, Overlay} from 'react-native-elements'
import { TriangleColorPicker } from 'react-native-color-picker'
import { connect } from 'react-redux'

import {changeThemeColor} from '../redux/actions'

const ThemeColorsScreen = (props) => {
  const [visible, setVisible] = useState(false)
  const [defaultColor, setDefaultColor] = useState('white')
  const [indexToChange, setIndexToChange] = useState(-1)

  const toggleOverlay = (index = -1) => {
    setDefaultColor(props.colors[index])
    setIndexToChange(index)
    setVisible(!visible);
  };

  const changeThemeColor = (color) => {
    console.log(color)
    props.changeThemeColor({index: indexToChange, color: color})
    toggleOverlay()
  }

  return (
    <View style={styles.container}>
      <Button title='HOME' containerStyle={[styles.colorBox, {backgroundColor: props.colors[0]}]} buttonStyle={[styles.colorBox, {backgroundColor: props.colors[0]}]} onPress={() => toggleOverlay(0)} raised/>
      <Button title='SEARCH' containerStyle={[styles.colorBox, {backgroundColor: props.colors[1]}]} buttonStyle={[styles.colorBox, {backgroundColor: props.colors[1]}]} onPress={() => toggleOverlay(1)} raised/>
      <Button title='OPTIONS' containerStyle={[styles.colorBox, {backgroundColor: props.colors[2]}]} buttonStyle={[styles.colorBox, {backgroundColor: props.colors[2]}]} onPress={() => toggleOverlay(2)} raised/>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <TriangleColorPicker style={styles.colorPicker} defaultColor={defaultColor} oldColor={defaultColor} onColorSelected={changeThemeColor} />
      </Overlay>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  highlight: {

  },
  colorBox: {
    borderWidth: 1,
    borderRadius: 75,
    borderColor: 'white',
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  colorPicker: {
    width: 250,
    height: 250,
  }
});

const mapStateToProps = ({themeColors}) => ({
  colors: themeColors,
})

export default connect(mapStateToProps, {changeThemeColor})(ThemeColorsScreen)
