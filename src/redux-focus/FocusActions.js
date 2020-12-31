export const setFocusDirection = (direction) => ({
  type: 'FOCUS_DIRECTION',
  direction: direction,
});
export const setFocus = (focusId) => ({
  type: 'SET_FOCUS',
  focusId: focusId,
});
export const setMapsDetails = (focusId, pos) => ({
  type: 'SET_COMPONENT_DETAILS',
  focusId: focusId,
  position: pos,
});
export const setScreenDetails = (screen, focusId, pos, isFocus) => ({
  type: 'SET_SCREEN_DETAILS',
  position: pos,
  focusId: focusId,
  screen: screen,
  isFocus: isFocus,
});
export const allScreensDetails = (screen, focusId, pos, isFocus) => ({
  type: 'REGISTERING_ALL_SCREENS',
  focusId: focusId,
  position: pos,
  isFocus: isFocus,
  screen: screen,
});

export const deRegisterDetails = (screen, focusId) => ({
  type: 'DEREGISTERING_ALL_SCREENS',
  focusId: focusId,
  screen: screen,
});

export const allScreensFocusDirection = (direction) => ({
  type: 'FOCUS_DIRECTION_IN_SCREEN',
  direction: direction,
});
export const allScreenSetFocus = (focusId) => ({
  type: 'SET_SELECTIVE_FOCUS',
  focusId: focusId,
});
