export const registerFocus = (focusId, pos, isFocus) => ({
  type: 'REGISTER_FOCUS',
  focusId: focusId,
  position: pos,
  isFocus: isFocus,
});
export const setFocusDirection = (direction) => ({
  type: 'FOCUS_DIRECTION',
  direction: direction,
});
export const setFocus = (focusId) => ({
  type: 'SET_FOCUS',
  focusId: focusId,
});
export const setComponentDetails = (focusId, pos) => ({
  type: 'SET_COMPONENT_DETAILS',
  focusId: focusId,
  position: pos,
});
export const setScreenDetails = (elementsObj, focusId) => ({
  type: 'SET_SCREEN_DETAILS',
  elementsObj: elementsObj,
  focusId: focusId,
});
export const allScreensDetails = (focusId, pos, isFocus) => ({
  type: 'REGISTERING_ALL_SCREENS',
  focusId: focusId,
  position: pos,
  isFocus: isFocus,
});
export const allScreensFocusDirection = (direction) => ({
  type: 'FOCUS_DIRECTION_IN_SCREEN',
  direction: direction,
  // curState: state,
});
export const allScreenSetFocus = (focusId) => ({
  type: 'SET_SELECTIVE_FOCUS',
  focusId: focusId,
});
