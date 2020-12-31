import {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';
function pointInTriangle(x1, y1, x2, y2, x3, y3, x, y) {
  const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
  const a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
  const b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
  const c = 1 - a - b;

  return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
}
function checkIfInFrustum(
  x,
  y,
  probabaleX,
  probableY,
  direction,
  width,
  height,
) {
  switch (direction) {
    case KEYCODE_DPAD_LEFT:
      return pointInTriangle(x, y, 0, height, 0, 0, probabaleX, probableY);

    case KEYCODE_DPAD_RIGHT:
      return pointInTriangle(
        x,
        y,
        width,
        0,
        width,
        height,
        probabaleX,
        probableY,
      );
    case KEYCODE_DPAD_UP:
      return pointInTriangle(x, y, 0, 0, width, 0, probabaleX, probableY);
    case KEYCODE_DPAD_DOWN:
      return pointInTriangle(
        x,
        y,
        0,
        height,
        width,
        height,
        probabaleX,
        probableY,
      );
    default:
      break;
  }
  return false;
}

export function findNearestElements(x, y, focusMap, direction, width, height) {
  let elementMap = {};
  if (focusMap != null) {
    focusMap.forEach((focusObj) => {
      const key = Object.keys(focusObj)[0];
      const pos = Object.values(focusObj)[0];
      const probabaleX = parseFloat(pos.split(':')[0]);
      const probableY = parseFloat(pos.split(':')[1]);

      if (
        checkIfInFrustum(x, y, probabaleX, probableY, direction, width, height)
      ) {
        if (x != probabaleX || y != probableY) {
          elementMap[key] = pos;
        }
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

export function findNextFocusElement(
  currentFocusId,
  focusMap,
  direction,
  width,
  height,
) {
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
    width,
    height,
  );

  if (Object.keys(nearElements).length == 0) {
    return currentFocusId;
  }
  return findNextFocusId(currentFocusPosX, currentFocusPosY, nearElements);
}
