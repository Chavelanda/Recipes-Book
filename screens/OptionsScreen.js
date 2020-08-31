import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {ListItem, Icon} from 'react-native-elements'
import { connect } from 'react-redux'

class OptionsScreen extends React.Component {

  options = [{title: 'Intolerances', icon: 'ios-warning', navigationScreen: 'Intolerances'}, {title: 'Theme Colors', icon: 'ios-color-palette', navigationScreen: 'ThemeColors'}]

  mapOptions = (option, index) => (
    <ListItem
      key={index}
      title={option.title}
      leftIcon={{name: option.icon, type: 'ionicon', color: this.props.colors[2]}}
      rightIcon={{name: 'ios-arrow-forward', type: 'ionicon', color: this.props.colors[2]}}
      onPress={() => this.optionPressed(index)}
      bottomDivider
    />
  )

  optionPressed= (index) => {
    this.props.navigation.navigate(this.options[index].navigationScreen)
  }

  render () {
    return (
      <View style={styles.container} >
        {this.options.map(this.mapOptions)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = ({themeColors}) => ({
  colors: themeColors,
})

export default connect(mapStateToProps)(OptionsScreen)
