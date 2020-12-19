import {KEYCODE_DPAD_CENTER} from 'react-native-keyevent';
import {findNextFocusElement} from './FocusLogic';
const FOCUS_INITIAL_STATE = {
  focusMaps: {},
  currentFocus: '',
  pressed: false,
};

export default focusReducer = (state = FOCUS_INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_FOCUS':
      return {
        ...state,
        currentFocus: action.focusId,
      };
    case 'REGISTER_FOCUS':
      const obj = {};
      obj[action.focusId] = action.position;

      return {...state, focusMaps: {...state.focusMaps, ...obj}};
    case 'FOCUS_DIRECTION':
      switch (action.direction) {
        case KEYCODE_DPAD_CENTER:
          return {
            ...state,
            pressed: true,
          };

        default:
          const nextFocusId = findNextFocusElement(
            state.currentFocus,
            state.focusMaps,
            action.direction,
          );
          return {
            ...state,
            currentFocus: nextFocusId,
            pressed: false,
          };
      }

    default:
      return state;
  }
};
