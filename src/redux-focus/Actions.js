export const registerFocus = (focusId, pos) => ({
  type: 'REGISTER_FOCUS',
  focusId: focusId,
  position: pos,
});
export const setFocusDirection = (direction) => ({
  type: 'FOCUS_DIRECTION',
  direction: direction,
});
export const setFocus = (focusId) => ({
  type: 'SET_FOCUS',
  focusId: focusId,
});
