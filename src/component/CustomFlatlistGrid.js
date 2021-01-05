import React, {useRef, useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';

import {connect} from 'react-redux';
import {
  allScreensDetails,
  deRegisterDetails,
} from '../redux-focus/FocusActions';
import {GridFlatListLogic} from '../redux-focus/FocusLogic';
const TYPE = {
  BUTTON: 'button',
  H_LIST: 'h_f',
  V_LIST: 'v_f',
  G_LIST: 'g_f',
};
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

function CustomFlatlistGrid(props) {
  const [changedData, setChangedData] = useState(props.flatlistdata);
  const [removedData, setRemovedData] = useState([]);

  let isFocused = false;
  const setReference = useRef(null);
  const flatRef = useRef(null);
  const flatlistIndex = useRef(0);
  const screenData =
    props.allScreensState.allScreensArray.length > 0
      ? props.allScreensState.allScreensArray[
          props.allScreensState.allScreensArray.length - 1
        ]
      : null;
  const itemview = ({item, index}) => {
    return <ItemView item={item} index={index} />;
  };

  const keyextractor = (item, index) => index.toString();
  useEffect(() => {
    let timeout = null;
    timeout = setTimeout(() => {
      if (setReference.current != null) {
        setReference.current.measure((fx, fy, width, height, px, py) => {
          const midX = px + width / 2;
          const midY = py + height / 2;

          props.registerFocus(
            props.screen,
            props.focusId,
            midX + ':' + midY,
            props.focus,
            props.componentType,
          );
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
      props.deregisterFocus(props.screen, props.focusId);
    };
  }, []);
  useEffect(() => {
    if (
      isFocused &&
      screenData != null &&
      props.focusId == screenData.pressed
    ) {
      if (props.componentType === TYPE.G_LIST) {
        props.onPress(flatlistIndex.current);
      } else {
        props.onPress();
      }
    }

    if (props.componentType === TYPE.G_LIST) {
      if (screenData != null && screenData.direction != null) {
        direction = screenData.direction;

        if (screenData != null && screenData.currentFocusId === 'fl') {
          const manipulatedDataArray = GridFlatListLogic(
            changedData,
            removedData,
            direction,
            3,
          );
          // console.log(' final result', manipulatedDataArray[0]);

          setChangedData(manipulatedDataArray[0]);
          setRemovedData(manipulatedDataArray[1]);
        }
      }
    }
  }, [props.allScreensState.allScreensArray]);

  return (
    <View collapsable={false} ref={setReference}>
      <FlatList
        ref={flatRef}
        contentContainerStyle={styles.flatlistContentContainerStyle}
        keyExtractor={keyextractor}
        data={changedData}
        renderItem={itemview}
        scrollEnabled={false}
        numColumns={3}
        horizontal={false}
        // extraData={changedData}
      />
      {screenData != null && screenData.currentFocusId === 'fl' && (
        <View collapsable={false} style={styles.flatlistFocusRingStyle}></View>
      )}
    </View>
  );
}
const deregisterFocus = (screen, name) => {
  return (dispatch) => {
    dispatch(deRegisterDetails(screen, name));
  };
};

const registerFocus = (screen, name, position, isFocus, type) => {
  return (dispatch) => {
    dispatch(allScreensDetails(screen, name, position, isFocus, type));
  };
};

const mapDispatchToProps = {
  registerFocus,
  deregisterFocus,
};

const mapStateToProps = (state) => {
  const {allScreensState} = state;
  return {allScreensState};
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomFlatlistGrid);

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
    borderWidth: 5,
    borderColor: 'red',
    margin: 40,
  },
  flatlistContentContainerStyle: {
    paddingBottom: HEIGHT,
    margin: 40,
  },
});
