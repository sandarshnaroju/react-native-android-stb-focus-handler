import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FocusableItem} from '../redux-focus/FocusableItem';
import {GetKeyEventProvider} from '../redux-focus/KeyEventProvider';
import CustomFlatlist from '../component/CustomFlatlist';
import DummyFlatlist from '../component/DummyFlatlist';
import DummyText from '../component/DummyText';
import CustomFlatlistGrid from '../component/CustomFlatlistGrid';
import {DATA} from '../testingData/fakeData';
const TYPE = {
  BUTTON: 'button',
  H_LIST: 'h_f',
  V_LIST: 'v_f',
  G_LIST: 'g_f',
};
export default function Screen(props) {
  const keyEvent = GetKeyEventProvider();
  const Focusable = FocusableItem(Text);
  const FocusableFlatlist = FocusableItem(DummyFlatlist);
  const FocusableText = FocusableItem(DummyText);

  const flatListPress = (index) => {
    console.log(' in home screen', index);
  };
  return (
    <View style={{flex: 1}}>
      <CustomFlatlistGrid
        componentType={TYPE.G_LIST}
        focusId={'fl'}
        flatlistdata={DATA}
        screen={'screen-1'}
        onPress={flatListPress}
      />
      {/* <FocusableFlatlist
        componentType={TYPE.H_LIST}
        focusId={'fl'}
        flatlistdata={DATA}
        screen={'screen-1'}
        onPress={flatListPress}
      />
      <FocusableText
        componentType={TYPE.BUTTON}
        focusId={'test'}
        screen={'screen-1'}
        onPress={() => {
          console.log('dummy text pressed');
        }}
      /> */}
      {/* <View style={styles.innerViewStyle}>
        <Focusable
          componentType={TYPE.BUTTON}
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
          componentType={TYPE.BUTTON}
          focusId={'item-4'}
          screen={'screen-1'}
          focus={false}
          style={{backgroundColor: 'red', height: 60, width: 80}}
          onPress={() => {
            console.log('item4 pressed');
          }}>
          {' '}
          text 4{' '}
        </Focusable>
      </View> */}
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

// <View style={styles.innerViewStyle}>
//         <Focusable
//           focusId={'item-1'}
//           screen={'screen-1'}
//           focus={true}
//           style={{backgroundColor: 'red', height: 60, width: 80}}
//           onPress={() => {
//             console.log('item1 pressed');
//             props.navigation.push('secondscreen');
//           }}>
//           {' '}
//           text 1{' '}
//         </Focusable>

//         <Focusable
//           focusId={'item-2'}
//           screen={'screen-1'}
//           focus={false}
//           style={{backgroundColor: 'red', height: 60, width: 80}}
//           onPress={() => {
//             console.log('item2 pressed');
//           }}>
//           {' '}
//           text 2{' '}
//         </Focusable>
//       </View>
// <View style={styles.innerViewStyle}>
//   <Focusable
//     focusId={'item-3'}
//     screen={'screen-1'}
//     focus={true}
//     style={{backgroundColor: 'red', height: 60, width: 80}}
//     onPress={() => {
//       console.log('item3 pressed');
//     }}>
//     {' '}
//     text 3{' '}
//   </Focusable>
//   <Focusable
//     focusId={'item-4'}
//     screen={'screen-1'}
//     focus={false}
//     style={{backgroundColor: 'red', height: 60, width: 80}}
//     onPress={() => {
//       console.log('item4 pressed');
//     }}>
//     {' '}
//     text 4{' '}
//   </Focusable>
// </View>
