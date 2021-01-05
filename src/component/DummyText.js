import React from 'react';
import {StyleSheet, Text, View, Button, Dimensions} from 'react-native';
export default function DummyText(props) {
  return (
    <View
      collapsable={false}
      ref={props.reference}
      style={{
        height: 100,
        width: 50,
        backgroundColor: props.focused ? 'red' : 'grey',
        alignItems: 'center',
        marginLeft: 400,
      }}>
      <Text onPress={props.onPress}>heyyy</Text>
    </View>
  );
}
