import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {FocusableItem} from '../redux-focus/FocusableItem';

export default function SecondScreen(props) {
  const Focusable = FocusableItem(Text);
  return (
    <View style={{flex: 1}}>
      <View style={styles.innerViewStyle}>
        <Focusable
          focusId={'item-9'}
          screen={'screen-3'}
          focus={true}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item9 pressed');
          }}>
          {' '}
          text 9{' '}
        </Focusable>

        <Focusable
          focusId={'item-10'}
          screen={'screen-3'}
          focus={false}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item10 pressed');
          }}>
          {' '}
          text 10{' '}
        </Focusable>
      </View>
      <View style={styles.innerViewStyle}>
        <Focusable
          focusId={'item-11'}
          screen={'screen-3'}
          focus={true}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item11 pressed');
          }}>
          {' '}
          text 11{' '}
        </Focusable>
        <Focusable
          focusId={'item-12'}
          screen={'screen-3'}
          focus={false}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item12 pressed');
          }}>
          {' '}
          text 12{' '}
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
