import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  allScreensDetails,
  allScreenSetFocus,
  deRegisterDetails,
} from './FocusActions';
import {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';
import isEqual from 'lodash/isEqual';
const TYPE = {
  BUTTON: 'button',
  H_LIST: 'h_f',
  V_LIST: 'v_f',
  G_LIST: 'g_f',
};
export function FocusableItem(Component) {
  const deregisterFocus = (screen, name) => {
    return (dispatch) => {
      dispatch(deRegisterDetails(screen, name));
    };
  };

  const registerFocus = (screen, name, position, isFocus, comp) => {
    return (dispatch) => {
      dispatch(allScreensDetails(screen, name, position, isFocus, comp));
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
  )(function (props) {
    let isFocused = false;
    let direction = null;
    const flatRef = useRef(null);
    const flatlistIndex = useRef(0);
    const elementRef = useRef(null);
    const screenData =
      props.allScreensState.allScreensArray.length > 0
        ? props.allScreensState.allScreensArray[
            props.allScreensState.allScreensArray.length - 1
          ]
        : null;
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
              props.componentType,
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
        screenData != null &&
        props.focusId == screenData.pressed
      ) {
        if (props.componentType === TYPE.H_LIST) {
          props.onPress(flatlistIndex.current);
        } else {
          props.onPress();
        }
      }

      if (props.componentType === TYPE.H_LIST) {
        if (screenData != null && screenData.direction != null) {
          direction = screenData.direction;

          if (screenData != null && screenData.currentFocusId === 'fl') {
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
        }
      }
    }, [props.allScreensState.allScreensArray]);
    if (screenData != null && props.focusId == screenData.currentFocusId) {
      isFocused = true;
    }
    const onPress = () => {
      props.setCurrentFocus(props.focusId);
      props.onPress();
    };
    // console.log(props.allScreensState.allScreensArray[0]);

    return (
      <Component
        {...props}
        onPress={props.onPress}
        focused={isFocused}
        reference={elementRef}
        flatRef={flatRef}
      />
    );
  });
}

// import React, {useEffect, useRef} from 'react';
// import {connect} from 'react-redux';
// import {
//   allScreensDetails,
//   allScreenSetFocus,
//   deRegisterDetails,
// } from './FocusActions';
// import isEqual from 'lodash/isEqual';
// import {
//   KEYCODE_DPAD_CENTER,
//   KEYCODE_DPAD_DOWN,
//   KEYCODE_DPAD_LEFT,
//   KEYCODE_DPAD_RIGHT,
//   KEYCODE_DPAD_UP,
// } from 'react-native-keyevent';
// const TYPE = {
//   BUTTON: 'button',
//   H_LIST: 'h_f',
//   V_LIST: 'v_f',
//   G_LIST: 'g_f',
// };
// export function FocusableItem(Component) {
//   const deregisterFocus = (screen, name) => {
//     return (dispatch) => {
//       dispatch(deRegisterDetails(screen, name));
//     };
//   };

//   const registerFocus = (screen, name, position, isFocus, comp) => {
//     return (dispatch) => {
//       dispatch(allScreensDetails(screen, name, position, isFocus, comp));
//     };
//   };

//   const setCurrentFocus = (focusId) => {
//     return (dispatch) => {
//       dispatch(allScreenSetFocus(focusId));
//     };
//   };

//   const mapDispatchToProps = {
//     registerFocus,
//     setCurrentFocus,
//     deregisterFocus,
//   };

//   const mapStateToProps = (state) => {
//     const {allScreensState} = state;
//     return {allScreensState};
//   };

//   const deepCompare = (prevProps, nextProps) => {
//     if (
//       isEqual(
//         prevProps.allScreensState.allScreensArray,
//         nextProps.allScreensState.allScreensArray,
//       )
//     ) {
//       return true;
//     }
//     return false;
//   };

//   return connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   )(function (props) {
//     // let direction = null;
//     let isFocused = false;
//     const elementRef = useRef(null);
//     // const flatRef = useRef(null);
//     // const flatlistIndex = useRef(0);
//     const screenData =
//       props.allScreensState.allScreensArray.length > 0
//         ? props.allScreensState.allScreensArray[
//             props.allScreensState.allScreensArray.length - 1
//           ]
//         : null;
//     useEffect(() => {
//       let timeout = null;
//       console.log(' useeffect', elementRef);
//       if (elementRef.current != null) {
//         timeout = setTimeout(() => {
//           elementRef.current.measure((fx, fy, width, height, px, py) => {
//             const midX = px + width / 2;
//             const midY = py + height / 2;
//             console.log(fx, fy, width, height, px, py);
//             props.registerFocus(
//               props.screen,
//               props.focusId,
//               midX + ':' + midY,
//               props.focus,
//               props.componentType,
//             );
//           });
//         }, 10);
//       }
//       return () => {
//         clearTimeout(timeout);
//         props.deregisterFocus(props.screen, props.focusId);
//       };
//     }, []);

//     useEffect(() => {
//       // if (props.componentType === TYPE.BUTTON) {
//       if (
//         isFocused &&
//         screenData != null &&
//         props.focusId == screenData.pressed
//       ) {
//         props.onPress();
//       }
//       // }

//       // if (props.componentType === TYPE.H_LIST) {
//       //   if (screenData != null && screenData.direction != null) {
//       //     direction = screenData.direction;

//       //     if (screenData != null && screenData.currentFocusId === 'fl') {
//       //       switch (direction) {
//       //         case KEYCODE_DPAD_LEFT:
//       //           if (flatlistIndex.current != 0) {
//       //             flatlistIndex.current = flatlistIndex.current - 1;
//       //           }

//       //           flatRef.current.scrollToIndex({index: flatlistIndex.current});
//       //           break;
//       //         case KEYCODE_DPAD_RIGHT:
//       //           if (flatlistIndex.current != props.flatlistdata.length - 1) {
//       //             flatlistIndex.current = flatlistIndex.current + 1;
//       //           }

//       //           flatRef.current.scrollToIndex({index: flatlistIndex.current});
//       //           break;

//       //         default:
//       //           break;
//       //       }
//       //     }
//       //   }
//       // }
//     }, [props.allScreensState.allScreensArray]);
//     if (
//       screenData != null &&
//       screenData.currentFocusId !== 'fl' &&
//       props.focusId == screenData.currentFocusId
//     ) {
//       isFocused = true;
//     }
//     const onPress = () => {
//       props.setCurrentFocus(props.focusId);
//       props.onPress();
//     };
//     console.log(props.allScreensState.allScreensArray[0]);

//     return (
//       <Component
//         {...props}
//         onPress={onPress}
//         style={{...props.style, backgroundColor: isFocused ? 'blue' : 'red'}}
//         reference={elementRef}
//         // flatRef={flatRef}
//       />
//     );
//   });
// }
