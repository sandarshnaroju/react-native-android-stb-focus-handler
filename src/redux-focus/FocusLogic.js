import {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';

export function findNearestElements(x, y, focusMap, direction) {
  let elementMap = {};
  if (focusMap != null) {
    focusMap.forEach((focusObj) => {
      const key = Object.keys(focusObj)[0];
      const pos = Object.values(focusObj)[0];
      switch (direction) {
        case KEYCODE_DPAD_CENTER:
          break;
        case KEYCODE_DPAD_LEFT:
          if (x > parseFloat(pos.split(':')[0])) {
            elementMap[key] = pos;
          }
          break;
        case KEYCODE_DPAD_RIGHT:
          if (x < parseFloat(pos.split(':')[0])) {
            elementMap[key] = pos;
          }
          break;
        case KEYCODE_DPAD_UP:
          if (y > parseFloat(pos.split(':')[1])) {
            elementMap[key] = pos;
          }
          break;
        case KEYCODE_DPAD_DOWN:
          if (y < parseFloat(pos.split(':')[1])) {
            elementMap[key] = pos;
          }
          break;
        default:
          break;
      }
    });
  }
  return elementMap;
}
export function findNextFocusId(x, y, elementsMap) {
  let leastDistanceFocus = {};
  if (elementsMap != null) {
    Object.keys(elementsMap).forEach((focusId, index) => {
      const pos = elementsMap[focusId].split(':');
      const probX = parseFloat(pos[0]);
      const probY = parseFloat(pos[1]);
      const distance = (probX - x) * (probX - x) + (probY - y) * (probY - y);
      if (
        Object.keys(leastDistanceFocus).length > 0 &&
        leastDistanceFocus['value'] > distance
      ) {
        leastDistanceFocus['name'] = focusId;
        leastDistanceFocus['value'] = distance;
      } else {
        if (Object.keys(leastDistanceFocus).length == 0) {
          leastDistanceFocus['name'] = focusId;
          leastDistanceFocus['value'] = distance;
        }
      }
    });
  }
  return leastDistanceFocus['name'];
}

export function findNextFocusElement(currentFocusId, focusMap, direction) {
  const currentFocusPos = focusMap.find((obj) => {
    if (Object.keys(obj)[0] === currentFocusId) {
      return true;
    }
  });

  const currentFocusPosValues = currentFocusPos[currentFocusId].split(':');

  const currentFocusPosX = parseFloat(currentFocusPosValues[0]);
  const currentFocusPosY = parseFloat(currentFocusPosValues[1]);
  const nearElements = findNearestElements(
    currentFocusPosX,
    currentFocusPosY,
    focusMap,
    direction,
  );

  if (Object.keys(nearElements).length == 0) {
    return currentFocusId;
  }
  return findNextFocusId(currentFocusPosX, currentFocusPosY, nearElements);
}
