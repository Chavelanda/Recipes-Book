import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'

import OptionsScreen from './OptionsScreen'
import ThemeColorsScreen from './ThemeColorsScreen'
import IntolerancesScreen from './IntolerancesScreen'

const OptionsStack = createStackNavigator();

class OptionsStackScreen extends React.Component {
  render () {
    return (
      <OptionsStack.Navigator initialRouteName='Options' screenOptions={{headerTitleAlign: 'center', headerStyle: {backgroundColor: this.props.colors[2]}, headerTitleStyle: styles.headerTitleStyle}}>
        <OptionsStack.Screen name='Options' component={OptionsScreen} options={{headerTitle: 'SETTINGS'}} />
        <OptionsStack.Screen name='Intolerances' component={IntolerancesScreen} options={{headerTitle: 'INTOLERANCES'}} />
        <OptionsStack.Screen name='ThemeColors' component={ThemeColorsScreen} options={{headerTitle: 'THEME COLORS'}} />
      </OptionsStack.Navigator>
    )
  }
}

const styles=StyleSheet.create({
  headerTitleStyle: {
    color: 'white',
  }
})

const mapStateToProps = ({themeColors}) => ({
  colors: themeColors,
})

export default connect(mapStateToProps)(OptionsStackScreen)
