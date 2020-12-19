import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {registerFocus, setFocus} from './Actions';
export function FocusableItem(Component) {
  const dispatchFocus = (name, position) => {
    return (dispatch) => {
      dispatch(registerFocus(name, position));
    };
  };
  const setCurrentFocus = (focusId) => {
    return (dispatch) => {
      dispatch(setFocus(focusId));
    };
  };
  const mapDispatchToProps = {
    dispatchFocus,
    setCurrentFocus,
  };
  const mapStateToProps = (state) => {
    const {focusState} = state;
    return {focusState};
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(function (props) {
    let isFocused = false;
    const elementRef = useRef(null);
    useEffect(() => {
      let timeout = null;
      if (elementRef.current != null) {
        timeout = setTimeout(() => {
          elementRef.current.measure((fx, fy, width, height, px, py) => {
            props.dispatchFocus(props.focusId, px + ':' + py);
            if (props.focus) {
              props.setCurrentFocus(props.focusId);
            }
          });
        }, 0);
      }
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    if (props.focusId == props.focusState.currentFocus) {
      isFocused = true;
      if (props.focusState.pressed) {
        props.onPress();
      }
    }

    const onPress = () => {
      props.setCurrentFocus(props.focusId);
    };

    return (
      <Component
        {...props}
        onPress={onPress}
        style={{...props.style, backgroundColor: isFocused ? 'blue' : 'red'}}
        ref={elementRef}
      />
    );
  });
}
