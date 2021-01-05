import {
  KEYCODE_DPAD_CENTER,
  KEYCODE_DPAD_DOWN,
  KEYCODE_DPAD_LEFT,
  KEYCODE_DPAD_RIGHT,
  KEYCODE_DPAD_UP,
} from 'react-native-keyevent';
import cloneDeep from 'lodash/cloneDeep';

export function GridFlatListLogic(data, removedData, direction, numColumns) {
  const clonedData = cloneDeep(data);
  const clonedRemoveData = cloneDeep(removedData);
  switch (direction) {
    case KEYCODE_DPAD_LEFT:
      let lastItem = {};
      let mandata = [];
      if (clonedRemoveData.length > 0) {
        lastItem = clonedRemoveData[clonedRemoveData.length - 1];

        clonedRemoveData.pop();
        mandata = [[lastItem, ...clonedData], clonedRemoveData];
      } else {
        mandata = [clonedData, clonedRemoveData];
      }

      return mandata;
    case KEYCODE_DPAD_RIGHT:
      const temp = clonedData.slice(0, 1);
      const temodata = clonedData.slice(1);
      const remdata = [...clonedRemoveData, ...temp];

      return [temodata, remdata];

    case KEYCODE_DPAD_UP:
      let lastElements = [];
      let returnableArray = [];
      let updatedRemovedElements = [];
      if (clonedRemoveData.length >= 3) {
        lastElements = clonedRemoveData.slice(-numColumns);

        updatedRemovedElements = clonedRemoveData.slice(
          0,
          clonedRemoveData.length - numColumns,
        );

        returnableArray = [
          [...lastElements, ...clonedData],
          updatedRemovedElements,
        ];
      } else {
        returnableArray = [clonedData, updatedRemovedElements];
      }

      return returnableArray;
    case KEYCODE_DPAD_DOWN:
      const tempdown = clonedData.slice(0, numColumns);
      const temodatadown = clonedData.slice(numColumns);
      const remdatadown = [...clonedRemoveData, ...tempdown];
      return [temodatadown, remdatadown];
    default:
      return;
  }
}
