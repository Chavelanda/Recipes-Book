import * as React from 'react';
import {Provider} from 'react-redux'
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import TabsScreen from './screens/TabsScreen'

export default class App extends React.Component {

  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TabsScreen />
        </PersistGate>
      </Provider>
    )
  }

}
