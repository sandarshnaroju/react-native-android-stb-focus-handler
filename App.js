import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';
import store from './src/store';
import Screen from './src/screens/Screen';
import SecondScreen from './src/screens/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen';
import KeyEventProvider from './src/redux-focus/KeyEventProvider';

const Stack = createStackNavigator();
export default function App(props) {
  return (
    <Provider store={store}>
      <KeyEventProvider emit={false} disable={false}>
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
        </NavigationContainer>
      </KeyEventProvider>
    </Provider>
  );
}
