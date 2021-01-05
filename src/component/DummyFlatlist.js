import React, {useRef} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

function ItemView(props) {
  return (
    <View collapsable={false} style={styles.itemViewStyle}>
      <Text onPress={props.onPress} style={{color: 'white'}}>
        {props.item.title}
      </Text>
    </View>
  );
}
export default function DummyFlatlist(props) {
  const itemview = ({item, index}) => {
    return <ItemView item={item} index={index} />;
  };

  const keyextractor = (item, index) => index.toString();

  return (
    <View collapsable={false} ref={props.reference}>
      <FlatList
        ref={props.flatRef}
        contentContainerStyle={styles.flatlistContentContainerStyle}
        horizontal={true}
        keyExtractor={keyextractor}
        data={props.flatlistdata}
        renderItem={itemview}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
      {props.focused && (
        <View collapsable={false} style={styles.flatlistFocusRingStyle}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemViewStyle: {
    backgroundColor: 'grey',
    height: 100,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistFocusRingStyle: {
    position: 'absolute',
    height: 100,
    width: 100,
    borderRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 5,
    borderColor: 'red',
    margin: 40,
  },
  flatlistContentContainerStyle: {
    paddingRight: WIDTH,
    // paddingBottom: HEIGHT,
    margin: 40,
  },
});
