import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {FocusableItem} from '../redux-focus/FocusableItem';

export default function SecondScreen(props) {
  const Focusable = FocusableItem(Text);
  return (
    <View style={{flex: 1}}>
      <View style={styles.innerViewStyle}>
        <Focusable
          focusId={'item-5'}
          screen={'screen-2'}
          focus={true}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item5 pressed');
            props.navigation.push('thirdscreen');
          }}>
          {' '}
          text 5{' '}
        </Focusable>

        <Focusable
          focusId={'item-6'}
          screen={'screen-2'}
          focus={false}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item6 pressed');
          }}>
          {' '}
          text 6{' '}
        </Focusable>
      </View>
      <View style={styles.innerViewStyle}>
        <Focusable
          focusId={'item-7'}
          screen={'screen-2'}
          focus={true}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item7 pressed');
          }}>
          {' '}
          text 7{' '}
        </Focusable>
        <Focusable
          focusId={'item-8'}
          screen={'screen-2'}
          focus={false}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item8 pressed');
          }}>
          {' '}
          text 8{' '}
        </Focusable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  innerViewStyle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});
