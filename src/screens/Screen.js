import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FocusableItem} from '../redux-focus/FocusableItem';

export default function Screen(props) {
  const Focusable = FocusableItem(Text);
  return (
    <View style={{flex: 1}}>
      <View style={styles.innerViewStyle}>
        <Focusable
          focusId={'item-1'}
          screen={'screen-1'}
          focus={true}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item1 pressed');
            props.navigation.push('secondscreen');
          }}>
          {' '}
          text 1{' '}
        </Focusable>

        <Focusable
          focusId={'item-2'}
          screen={'screen-1'}
          focus={false}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item2 pressed');
            props.navigation.push('secondscreen');
          }}>
          {' '}
          text 2{' '}
        </Focusable>
      </View>
      <View style={styles.innerViewStyle}>
        <Focusable
          focusId={'item-3'}
          screen={'screen-1'}
          focus={true}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item3 pressed');
            props.navigation.push('secondscreen');
          }}>
          {' '}
          text 3{' '}
        </Focusable>
        <Focusable
          focusId={'item-4'}
          screen={'screen-1'}
          focus={false}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item4 pressed');
            props.navigation.push('secondscreen');
          }}>
          {' '}
          text 4{' '}
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
