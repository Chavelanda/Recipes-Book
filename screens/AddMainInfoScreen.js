import * as React from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import {Button} from 'react-native-elements'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import cameraChoice from '../components/cameraChoice'
import camera from '../assets/camera.png'

export default class AddMainInfoScreen extends React.Component {

  constructor(props) {
    super(props)

    const {image, title, time, servings} = this.props.route.params

    this.state = {
      title: title || '',
      time: time || '',
      servings: servings || '',
      image: image || camera,
      isFormValid: (title && time && servings),
    }
  }



  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title || prevState.time !== this.state.time || prevState.servings != this.state.servings || prevState.image !== this.state.image){
      this.validateForm()
    }
  }

  getCameraAsync = async () => {

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

  getCameraRollAsync = async () => {

    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission not granted');
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1,1] });

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

  validateForm = () => {
    if (this.state.title !== '' && +this.state.time > 0 && +this.state.servings > 0){
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  onNextButtonPressed = () => {
    let {isFormValid, ...parameters} = this.state
    this.props.navigation.navigate('AddIngredients', {...this.props.route.params, ...parameters,})
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='height'>
        <TouchableHighlight style={styles.touchableHighlight} onPress={() => cameraChoice(this.getCameraAsync, this.getCameraRollAsync)}>
          <Image
            style={[styles.image, {borderColor: this.props.route.params?.color}]}
            source={this.state.image}
          />
        </TouchableHighlight>
        <TextInput
          style={[styles.input, {borderColor: this.props.route.params?.color}]}
          placeholder='Name of the recipe'
          value={this.state.title}
          onChangeText={this.handleTitleChange}
        />
        <TextInput
          keyboardType='numeric'
          style={[styles.input, {borderColor: this.props.route.params?.color}]}
          placeholder='Time (in minutes)'
          value={this.state.time}
          onChangeText={this.handleTimeChange}
        />
        <TextInput
          keyboardType='numeric'
          style={[styles.input, {borderColor: this.props.route.params?.color}]}
          placeholder='Servings'
          value={this.state.servings}
          onChangeText={this.handleServingsChange}
        />
        <Button
          title='NEXT'
          type='outline'
          buttonStyle={{borderColor: this.props.route.params?.color}}
          titleStyle={{color: this.props.route.params?.color}}
          onPress={this.onNextButtonPressed}
          disabled={!this.state.isFormValid}
          raised
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  touchableHighlight: {
    borderRadius: 60,
    alignSelf: 'center'
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 60,
    borderColor:'black',
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 5,
    height: 40,
    margin: 10,
    fontSize: 15,
  }
});
