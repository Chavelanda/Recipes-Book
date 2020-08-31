import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Dimensions} from 'react-native'
import {ListItem, Divider} from 'react-native-elements'
import {connect} from 'react-redux'

import {addIntolerance, removeIntolerance} from '../redux/actions'

const Intolerances = (props) => {

  const intolerances = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat']

  const [intolerancesCheck, setIntolerancesCheck] = useState([...intolerances].map((i) => props.intolerances.includes(i)))

  const mapIntolerances = ({item, index}) => (
    <ListItem
      title={item}
      leftIcon={{name: intolerancesCheck[index] ? 'ios-checkbox-outline' : 'ios-square-outline', type: 'ionicon', color: props.colors[2]}}
      onPress={() => toggleIntolerance(index)}
      bottomDivider
    />
  )

  const toggleIntolerance = (index) => {
    const newIntolerancesCheck = [...intolerancesCheck]
    newIntolerancesCheck[index] = !intolerancesCheck[index]

    if (newIntolerancesCheck[index]) {
      props.addIntolerance(intolerances[index])
    } else {
      props.removeIntolerance(intolerances[index])
    }

    setIntolerancesCheck(newIntolerancesCheck)
  }

  return (
    <View style={styles.innerBox}>
      <Text style={styles.help}>Here you can select intolerances. 'Search by Name' mode will exclude recipes including those intolerances.</Text>
      <Divider width={Dimensions.get('window').width}/>
      <FlatList
        data={intolerances}
        renderItem={mapIntolerances}
        keyExtractor={item => item}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  innerBox: {
    flex: 1
  },
  help: {
    padding: 8,
    textAlign: 'center'
  }
});

const mapStateToProps = ({themeColors, intolerances}) => ({
  colors: themeColors,
  intolerances: intolerances,
})


export default connect(mapStateToProps, {addIntolerance, removeIntolerance})(Intolerances)
