import React from 'react';
import {Provider} from 'react-redux';
import Screen from './src/screens/Screen';
import NativeKeyEventHandler from './src/redux-focus/NativeKeyEventHandler';
import store from './src/store';

export default function App(props) {
  return (
    <Provider store={store}>
      <NativeKeyEventHandler />
      <Screen />
    </Provider>
  );
}
