export const setFocusDirection = (direction) => ({
  type: 'FOCUS_DIRECTION',
  direction: direction,
});
export const setFocus = (focusId) => ({
  type: 'SET_FOCUS',
  focusId: focusId,
});
export const setMapsDetails = (focusId, pos, comp) => ({
  type: 'SET_COMPONENT_DETAILS',
  focusId: focusId,
  position: pos,
  component: comp,
});
export const setScreenDetails = (screen, focusId, pos, isFocus, comp) => ({
  type: 'SET_SCREEN_DETAILS',
  position: pos,
  focusId: focusId,
  screen: screen,
  isFocus: isFocus,
  component: comp,
});

export const allScreensDetails = (screen, focusId, pos, isFocus, type) => ({
  type: 'REGISTERING_ALL_SCREENS',
  focusId: focusId,
  position: pos,
  isFocus: isFocus,
  screen: screen,
  component: type,
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
export const setDirectionInScreens = (direc) => ({
  type: 'SET_DIRECTION_IN_SCREEN',
  direction: direc,
});
