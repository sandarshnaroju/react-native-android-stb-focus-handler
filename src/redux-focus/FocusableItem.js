import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  allScreensDetails,
  allScreenSetFocus,
  deRegisterDetails,
} from './FocusActions';
import isEqual from 'lodash/isEqual';

export function FocusableItem(Component) {
  const deregisterFocus = (screen, name) => {
    return (dispatch) => {
      dispatch(deRegisterDetails(screen, name));
    };
  };

  const registerFocus = (screen, name, position, isFocus) => {
    return (dispatch) => {
      dispatch(allScreensDetails(screen, name, position, isFocus));
    };
  };

  const setCurrentFocus = (focusId) => {
    return (dispatch) => {
      dispatch(allScreenSetFocus(focusId));
    };
  };

  const mapDispatchToProps = {
    registerFocus,
    setCurrentFocus,
    deregisterFocus,
  };

  const mapStateToProps = (state) => {
    const {allScreensState} = state;
    return {allScreensState};
  };

  const deepCompare = (prevProps, nextProps) => {
    if (
      isEqual(
        prevProps.allScreensState.allScreensArray,
        nextProps.allScreensState.allScreensArray,
      )
    ) {
      return true;
    }
    return false;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    React.memo(function (props) {
      let isFocused = false;
      const elementRef = useRef(null);

      useEffect(() => {
        let timeout = null;
        if (elementRef.current != null) {
          timeout = setTimeout(() => {
            elementRef.current.measure((fx, fy, width, height, px, py) => {
              const midX = px + width / 2;
              const midY = py + height / 2;
              props.registerFocus(
                props.screen,
                props.focusId,
                midX + ':' + midY,
                props.focus,
              );
            });
          }, 0);
        }
        return () => {
          clearTimeout(timeout);
          props.deregisterFocus(props.screen, props.focusId);
        };
      }, []);

      useEffect(() => {
        if (
          isFocused &&
          props.allScreensState.allScreensArray.length > 0 &&
          props.focusId ==
            props.allScreensState.allScreensArray[
              props.allScreensState.allScreensArray.length - 1
            ].pressed
        ) {
          props.onPress();
        }
      }, [props.allScreensState.allScreensArray]);
      if (
        props.allScreensState.allScreensArray.length > 0 &&
        props.focusId ==
          props.allScreensState.allScreensArray[
            props.allScreensState.allScreensArray.length - 1
          ].currentFocusId
      ) {
        isFocused = true;
      }
      const onPress = () => {
        props.setCurrentFocus(props.focusId);
        props.onPress();
      };

      return (
        <Component
          {...props}
          onPress={onPress}
          style={{...props.style, backgroundColor: isFocused ? 'blue' : 'red'}}
          ref={elementRef}
        />
      );
    }, deepCompare),
  );
}
