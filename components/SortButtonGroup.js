import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import PropTypes from 'prop-types'

import SortButton from './SortButton'

export default class SortButtonGroup extends React.Component {
  state = {
    prevSelectedIndex: 0,
    selectedIndex: 0
  }

  updateIndex = (selectedIndex) => {
    const index = this.state.selectedIndex

    if (selectedIndex === index){
      this.props.buttons[selectedIndex].up = !this.props.buttons[selectedIndex].up
    }

    this.props.onSortButtonPress(selectedIndex)

    this.setState({ prevSelectedIndex: index, selectedIndex: selectedIndex });
  }

  mapButton = (button, index) => ({
    element: () => index===this.state.selectedIndex ?
      <SortButton name={button.name} up={button.up} color='white' /> :
      <SortButton name={button.name} up={button.up} color={this.props.color || 'black'} />
  })

  render() {
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={this.state.selectedIndex}
        buttons={this.props.buttons.map(this.mapButton)}
        containerStyle={{ flex: 1 }}
        selectedButtonStyle={{backgroundColor: this.props.color}}
      />
    );
  }
}

SortButtonGroup.propTypes = {
  buttons: PropTypes.array.isRequired,
  color: PropTypes.string,
  onSortButtonPress: PropTypes.func.isRequired
}
