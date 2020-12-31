import React, {useEffect} from 'react';
import KeyEvent, {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';
import {connect} from 'react-redux';
import {setFocusDirection, allScreensFocusDirection} from './Actions';
import store from '../store';

function NativeKeyEvent(props) {
  useEffect(() => {
    KeyEvent.onKeyUpListener((keyEvent) => {
      switch (keyEvent.keyCode) {
        case KEYCODE_DPAD_CENTER:
          props.dispatchDirection(KEYCODE_DPAD_CENTER);
          break;
        case KEYCODE_DPAD_LEFT:
          props.dispatchDirection(KEYCODE_DPAD_LEFT);
          break;
        case KEYCODE_DPAD_RIGHT:
          props.dispatchDirection(KEYCODE_DPAD_RIGHT);
          break;
        case KEYCODE_DPAD_UP:
          props.dispatchDirection(KEYCODE_DPAD_UP);
          break;
        case KEYCODE_DPAD_DOWN:
          props.dispatchDirection(KEYCODE_DPAD_DOWN);
          break;
        default:
          console.log('fehaitl');
          break;
      }
    });
  }, []);
  return <></>;
}
const dispatchDirection = (direc) => {
  return (dispatch) => {
    // const {curState} = store.getState();
    // console.log(curState);
    dispatch(allScreensFocusDirection(direc));
  };
};

const mapDispatchToProps = {
  dispatchDirection,
};
export default connect(null, mapDispatchToProps)(NativeKeyEvent);
