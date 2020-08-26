import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import SortButtonGroup from '../components/SortButtonGroup'

class SearchScreen extends React.Component {

  buttons = [{name: 'NAME', up: false,}, {name: 'TIME', up: false}]

  onSortButtonPress = () => {

  }

  render () {
    return (
      <View style={styles.container} >
        <View style={styles.searchBox} >
        </View>
        <View style={styles.sortButtonBox} >
          <SortButtonGroup buttons={this.buttons} color={this.props.colors[1]} onSortButtonPress={this.onSortButtonPress}/>
        </View>
        <View style={styles.recipesBox} >
          <Text>Search Screen</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  searchBox: {
    flex: 1,
  },
  sortButtonBox: {
    flex: 1,
  },
  recipesBox: {
    flex: 6,
    backgroundColor: 'white',
  },
});

mapStateToProps = ({themeColors}) => ({
  colors: themeColors,
})

export default connect(mapStateToProps)(SearchScreen)
