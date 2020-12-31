import {KEYCODE_DPAD_CENTER} from 'react-native-keyevent';
import {findNextFocusElement} from './FocusLogic';

import {
  setComponentDetails,
  setScreenDetails,
  registerFocus,
  setFocusDirection,
  setFocus,
} from './Actions';
const ALL_SCREENS_INITIAL_STATE = {
  allScreensArray: [],
};

const FOCUS_INITIAL_STATE = {
  screenStackFocusMaps: {},
};

const TEST_INITIAL_STATE = {
  innerElementObjects: [],
};

const SCREEN_INITIAL_STATE = {
  screenObject: {
    pressed: null,
    currentFocusId: null,
    focusMap: [],
  },
};

export const allScreensFocusReducer = (
  state = ALL_SCREENS_INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case 'REGISTERING_ALL_SCREENS':
      const singleScreen = focusReducer(
        {
          screenStackFocusMaps: state.allScreensArray[0],
        },
        registerFocus(action.focusId, action.position, action.isFocus),
      );

      return {
        allScreensArray: [singleScreen.screenStackFocusMaps],
      };
    case 'FOCUS_DIRECTION_IN_SCREEN':
      const updatedWithDirection = focusReducer(
        {
          screenStackFocusMaps:
            state.allScreensArray[state.allScreensArray.length - 1],
        },
        setFocusDirection(action.direction),
      );

      return {
        allScreensArray: [updatedWithDirection.screenStackFocusMaps],
      };
    case 'SET_SELECTIVE_FOCUS':
      const updatedSetFocus = focusReducer(
        {
          screenStackFocusMaps: state.allScreensArray[0],
        },
        setFocus(action.focusId),
      );
      return {
        allScreensArray: [updatedSetFocus.screenStackFocusMaps],
      };

    default:
      return state;
  }
};

export const focusReducer = (state = FOCUS_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_FOCUS':
      return {
        screenStackFocusMaps: {
          ...state.screenStackFocusMaps,
          currentFocusId: action.focusId,
        },
      };
    case 'REGISTER_FOCUS':
      const testing = innerReducer(
        TEST_INITIAL_STATE,
        setComponentDetails(action.focusId, action.position),
      );

      const screen = screenReducer(
        SCREEN_INITIAL_STATE,
        setScreenDetails(
          testing.innerElementObjects,
          action.isFocus ? action.focusId : null,
        ),
      );

      return {
        screenStackFocusMaps: {
          ...state.screenStackFocusMaps,
          ...screen.screenObject,
        },
      };
    case 'FOCUS_DIRECTION':
      switch (action.direction) {
        case KEYCODE_DPAD_CENTER:
          return {
            screenStackFocusMaps: {
              ...state.screenStackFocusMaps,
              pressed: state.screenStackFocusMaps.currentFocusId,
            },
          };

        default:
          const nextFocusId = findNextFocusElement(
            state.screenStackFocusMaps.currentFocusId,
            state.screenStackFocusMaps.focusMap,
            action.direction,
          );

          return {
            screenStackFocusMaps: {
              ...state.screenStackFocusMaps,
              currentFocusId: nextFocusId,
            },
          };
      }
    default:
      return state;
  }
};
export const screenReducer = (state = SCREEN_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SCREEN_DETAILS':
      state.screenObject.currentFocusId =
        action.focusId != null
          ? action.focusId
          : state.screenObject.currentFocusId
          ? state.screenObject.currentFocusId
          : Object.keys(action.elementsObj[0])[0];

      state.screenObject.focusMap = action.elementsObj;
      return state;

    default:
      return state;
  }
};

export const innerReducer = (state = TEST_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_COMPONENT_DETAILS':
      const obj = {};
      obj[action.focusId] = action.position;
      state.innerElementObjects.push(obj);
      return {
        innerElementObjects: state.innerElementObjects,
      };
    default:
      return state;
  }
};
