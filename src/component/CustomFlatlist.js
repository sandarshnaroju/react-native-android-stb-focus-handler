import React, {useEffect, useRef} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';
import {connect} from 'react-redux';
import {
  allScreensDetails,
  deRegisterDetails,
} from '../redux-focus/FocusActions';
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
function CustomFlatlist(props) {
  let direction = null;

  const flatlistIndex = useRef(0);
  const setReference = useRef(null);
  const flatRef = useRef(null);
  const screenData =
    props.allScreensState.allScreensArray.length > 0
      ? props.allScreensState.allScreensArray[
          props.allScreensState.allScreensArray.length - 1
        ]
      : null;
  const itemview = ({item, index}) => {
    return <ItemView item={item} index={index} onPress={onPress} />;
  };
  const onPress = () => {
    setReference.current.scrollToIndex({index: 4});
  };
  const keyextractor = (item, index) => index.toString();
  useEffect(() => {
    if (screenData != null && screenData.direction != null) {
      direction = screenData.direction;

      if (
        screenData != null &&
        screenData.currentFocusId === 'fl' &&
        props.componentType === TYPE.H_LIST
      ) {
        switch (direction) {
          case KEYCODE_DPAD_LEFT:
            if (flatlistIndex.current != 0) {
              flatlistIndex.current = flatlistIndex.current - 1;
            }

            flatRef.current.scrollToIndex({index: flatlistIndex.current});
            break;
          case KEYCODE_DPAD_RIGHT:
            if (flatlistIndex.current != props.flatlistdata.length - 1) {
              flatlistIndex.current = flatlistIndex.current + 1;
            }

            flatRef.current.scrollToIndex({index: flatlistIndex.current});
            break;

          default:
            break;
        }
      }
      if (
        screenData != null &&
        screenData.currentFocusId === 'fl' &&
        props.componentType === TYPE.V_LIST
      ) {
        switch (direction) {
          case KEYCODE_DPAD_UP:
            if (flatlistIndex.current != 0) {
              flatlistIndex.current = flatlistIndex.current - 1;
            }

            flatRef.current.scrollToIndex({index: flatlistIndex.current});
            break;
          case KEYCODE_DPAD_DOWN:
            if (flatlistIndex.current != props.flatlistdata.length - 1) {
              flatlistIndex.current = flatlistIndex.current + 1;
            }

            flatRef.current.scrollToIndex({index: flatlistIndex.current});
            break;

          default:
            break;
        }
      }
    }
  }, [props.allScreensState.allScreensArray]);
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

  return (
    <View collapsable={false} ref={setReference}>
      <FlatList
        ref={flatRef}
        contentContainerStyle={[styles.flatlistContentContainerStyle]}
        horizontal={props.componentType === TYPE.H_LIST ? true : false}
        keyExtractor={keyextractor}
        data={props.flatlistdata}
        renderItem={itemview}
        scrollEnabled={false}
        numColumns={props.numColumns ? props.numColumns : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomFlatlist);

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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'red',
    margin: 30,
  },
  flatlistContentContainerStyle: {
    paddingRight: WIDTH,
    // paddingBottom: HEIGHT,
    margin: 30,
  },
});
