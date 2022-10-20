import {atomWithReducer} from 'jotai/utils';
import pullAt from 'lodash/pullAt';
import {getFromStorage, saveToStorage} from '@/utils/storageUtil';
import type {CityProps, CityActionProps} from '@/types/city';

function callReducer(state: CityProps[], action: CityActionProps) {
  switch (action.type) {
    case 'ADD_CITY':
      if (action?.city) {
        const newAddState = [...state, action.city];
        saveToStorage('cities', newAddState);
        return [...state, action.city];
      }
      return state;
    case 'DELETE_CITY':
      if (action?.index) {
        const newRemoveState = [...state];
        pullAt(newRemoveState, action?.index);
        saveToStorage('cities', newRemoveState);
        return newRemoveState;
      }
      return state;
    default:
      return {...state};
  }
}

const cityAtom = atomWithReducer(getFromStorage('cities') || [], callReducer);

export default cityAtom;
