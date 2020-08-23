import * as React from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class RecipeMainInfoInput extends React.Component {

  state = {
    title: '',
    time: '',
    servings: '',
    image: {
      uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Camera-icon-by-demolabid-580x386.jpg'
    },
  }

  componentDidUpdate() {
    this.props.onUpdate(this.state.title, this.state.time, this.state.servings, this.state.image)
  }

  getImagePickerAsync = async () => {

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission not granted');
      return;
    }
    const image = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1,1] });

    if (!image.cancelled){
      this.setState({image})
    }
  };

  handleTitleChange = (title) => {
    this.setState({title})
  }

  handleTimeChange = (time) => {
    if(+time >= 0 && time.charAt(time.length -1) !== '.'){
      this.setState({time})
    }
  }

  handleServingsChange = (servings) => {
    if (+servings >= 0 && servings.charAt(servings.length -1) !== '.'){
      this.setState({servings})
    }
  }

  render () {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior='height'>
        <View style={styles.imageBox}>
          <TouchableHighlight style={styles.touchableHighlight} onPress={() => this.getImagePickerAsync()}>
            <Image style={[styles.image, {borderColor: this.props.color}]} source={{uri: this.state.image.uri}} />
          </TouchableHighlight>
        </View>
        <View style={styles.description}>
          <View style={styles.titleBox}>
            <TextInput style={[styles.input, {borderColor: this.props.color}]} placeholder='Title' value={this.state.title} onChangeText={this.handleTitleChange} />
          </View>
          <View style={styles.timeServingsBox}>
            <TextInput keyboardType='numeric' style={[styles.input, {borderColor: this.props.color}]} placeholder='Time' value={this.state.time} onChangeText={this.handleTimeChange} />
            <TextInput keyboardType='numeric' style={[styles.input, {borderColor: this.props.color}]} placeholder='Servings' value={this.state.servings} onChangeText={this.handleServingsChange}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  imageBox: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableHighlight: {
    borderRadius: 40,
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
    borderRadius: 40,
    borderColor:'black',
    borderWidth: 1,
  },
  description: {
    flex: 3,
    justifyContent: 'center',
  },
  titleBox: {
    flex: 1,
  },
  timeServingsBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 5,
    height: 30,
    margin: 10,
    fontSize: 15,
  }
});

RecipeMainInfoInput.propTypes= {
  color: PropTypes.string,
  onUpdate: PropTypes.func,
}
