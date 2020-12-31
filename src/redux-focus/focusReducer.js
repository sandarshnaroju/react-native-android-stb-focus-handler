import {KEYCODE_DPAD_CENTER} from 'react-native-keyevent';
import {
  setFocus,
  setFocusDirection,
  setMapsDetails,
  setScreenDetails,
} from './FocusActions';
import {findNextFocusElement} from './FocusLogic';

import cloneDeep from 'lodash/cloneDeep';

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
        ),
      );
      const mergeInNewScreen = [...remainingScreens, singleScreen];
      return {
        allScreensArray: mergeInNewScreen,
      };

    case 'FOCUS_DIRECTION_IN_SCREEN':
      const updatedWithDirection = screenReducer(
        state.allScreensArray[state.allScreensArray.length - 1],
        setFocusDirection(action.direction),
      );

      const result = [...state.allScreensArray, updatedWithDirection];
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
        setMapsDetails(action.focusId, action.position),
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
          );
          return {
            ...state,
            currentFocusId: nextFocusId,
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
      return obj;
    default:
      return state;
  }
};
