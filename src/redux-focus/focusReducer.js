import {
  setFocus,
  setFocusDirection,
  setMapsDetails,
  setScreenDetails,
  setDirectionInScreens,
} from './FocusActions';
import {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';
import {findNextFocusElement} from './FocusLogic';
import {Dimensions} from 'react-native';

import cloneDeep from 'lodash/cloneDeep';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ALL_SCREENS_INITIAL_STATE = {
  allScreensArray: [],
};

const MAPS_INITIAL_STATE = {};

const SCREEN_INITIAL_STATE = {
  currentScreen: null,
  pressed: null,
  currentFocusId: null,
  focusMap: [],
};

export const allScreensFocusReducer = (
  state = ALL_SCREENS_INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case 'DEREGISTERING_ALL_SCREENS':
      const remScreens = state.allScreensArray.filter(
        (obj) => obj.currentScreen != action.screen,
      );

      const deScreen = state.allScreensArray.find(
        (obj) => obj.currentScreen == action.screen,
      );

      const remainingFocusMaps = deScreen.focusMap.filter(
        (obj) => Object.keys(obj)[0] != action.focusId,
      );
      let mergeScreen = [];
      if (remainingFocusMaps.length > 0) {
        deScreen.focusMap = cloneDeep(remainingFocusMaps);
        mergeScreen = [...remScreens, deScreen];
      } else {
        mergeScreen = remScreens;
      }
      return {
        allScreensArray: mergeScreen,
      };

    case 'REGISTERING_ALL_SCREENS':
      let remainingScreens = state.allScreensArray.filter(
        (obj) => obj.currentScreen != action.screen,
      );
      const screen = state.allScreensArray.find(
        (obj) => obj.currentScreen == action.screen,
      );

      if (screen == null && remainingScreens.length > 0) {
        remainingScreens[remainingScreens.length - 1]['pressed'] = false;
      }

      const singleScreen = screenReducer(
        screen != null ? screen : SCREEN_INITIAL_STATE,
        setScreenDetails(
          action.screen,
          action.focusId,
          action.position,
          action.isFocus,
          action.component,
        ),
      );
      const mergeInNewScreen = [...remainingScreens, singleScreen];

      return {
        allScreensArray: mergeInNewScreen,
      };

    case 'FOCUS_DIRECTION_IN_SCREEN':
      const topScreen = state.allScreensArray[state.allScreensArray.length - 1];
      const rS = state.allScreensArray.filter(
        (obj) => obj.currentScreen != topScreen.currentScreen,
      );

      const updatedWithDirection = screenReducer(
        topScreen,
        setFocusDirection(action.direction),
      );

      const result = [...rS, updatedWithDirection];

      return {
        allScreensArray: result,
      };

    case 'SET_SELECTIVE_FOCUS':
      const updatedSetFocus = screenReducer(
        state.allScreensArray[state.allScreensArray.length - 1],
        setFocus(action.focusId),
      );
      return {
        allScreensArray: [...state.allScreensArray, updatedSetFocus],
      };

    default:
      return state;
  }
};

export const screenReducer = (state = SCREEN_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SCREEN_DETAILS':
      const focusMap = mapsReducer(
        MAPS_INITIAL_STATE,
        setMapsDetails(action.focusId, action.position, action.component),
      );

      const screenDetailsObj = {
        currentScreen: action.screen,
        currentFocusId: action.isFocus
          ? action.focusId
          : state.currentFocusId
          ? state.currentFocusId
          : state.focusMap.length > 0
          ? Object.keys(state.focusMap[0])[0]
          : action.focusId,
        focusMap: [...state.focusMap, focusMap],
        direction: action.direction ? action.direction : null,
      };

      return {
        ...screenDetailsObj,
      };
    case 'FOCUS_DIRECTION':
      switch (action.direction) {
        case KEYCODE_DPAD_CENTER:
          return {
            ...state,
            pressed: state.currentFocusId,
          };

        default:
          const nextFocusId = findNextFocusElement(
            state.currentFocusId,
            state.focusMap,
            action.direction,
            WIDTH,
            HEIGHT,
          );

          return {
            ...state,
            currentFocusId: nextFocusId,
            direction: action.direction,
          };
      }
    case 'SET_FOCUS':
      return {
        ...state,
        currentFocusId: action.focusId,
      };

    default:
      return state;
  }
};

export const mapsReducer = (state = MAPS_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_COMPONENT_DETAILS':
      const obj = {};
      obj[action.focusId] = action.position;
      obj['componentType'] = action.component;
      return obj;
    default:
      return state;
  }
};
