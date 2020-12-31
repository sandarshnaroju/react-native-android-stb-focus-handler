import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import NativeKeyEventHandler from './src/redux-focus/NativeKeyEventHandler';
import {createStackNavigator} from '@react-navigation/stack';
import store from './src/store';
import Screen from './src/screens/Screen';
import SecondScreen from './src/screens/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen';

const Stack = createStackNavigator();
export default function App(props) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Screen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="secondscreen"
            component={SecondScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="thirdscreen"
            component={ThirdScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <NativeKeyEventHandler />
      </NavigationContainer>
    </Provider>
  );
}
