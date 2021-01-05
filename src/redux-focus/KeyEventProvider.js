import React, {useContext, useEffect, useState} from 'react';
import KeyEvent, {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';
import {connect} from 'react-redux';
import {allScreensFocusDirection, setDirectionInScreens} from './FocusActions';
import {EventRegister} from 'react-native-event-listeners';
export const KeyEventContext = React.createContext('DEFAULT');

export function GetKeyEventProvider() {
  return useContext(KeyEventContext);
}

function KeyEventProvider(props) {
  const [disable, setDisable] = useState(props.disable);
  const [emit, setEmit] = useState(props.emit);
  useEffect(() => {
    if (!disable) {
      KeyEvent.onKeyUpListener((keyEvent) => {
        if (!emit) {
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
              break;
          }
        } else {
          EventRegister.emit('key', keyEvent.keyCode);
        }
      });
    }
    return () => {
      if (!disable) {
        KeyEvent.removeKeyUpListener();
      }
    };
  }, [emit, disable]);
  const setShouldEmit = (val) => {
    setEmit(val);
  };
  const setShouldDisable = (val) => {
    setDisable(val);
  };
  return (
    <KeyEventContext.Provider
      value={{
        setDisable: setShouldDisable,
        setEmit: setShouldEmit,
      }}>
      {props.children}
    </KeyEventContext.Provider>
  );
}
const dispatchDirection = (direc) => {
  return (dispatch) => {
    console.log(direc);
    // dispatch(setDirectionInScreens(direc));
    dispatch(allScreensFocusDirection(direc));
  };
};

const mapDispatchToProps = {
  dispatchDirection,
};
export default connect(null, mapDispatchToProps)(KeyEventProvider);
