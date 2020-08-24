import React, { useState } from "react";
import { Alert } from "react-native";

const cameraChoice = (onPicturePressed, onGalleryPressed) =>
  Alert.alert(
    'Get your image!',
    '',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Choose from gallery', onPress: () => onGalleryPressed()},
      {text: 'Take a picture', onPress: () => onPicturePressed()},
    ],
    {cancelable: true}
  );

  export default cameraChoice
