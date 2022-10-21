import {atomWithReducer} from 'jotai/utils';
import remove from 'lodash/remove';
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
      const newRemoveState = [...state];
      remove(newRemoveState, ['name', action?.name]);
      saveToStorage('cities', newRemoveState);
      return newRemoveState;
    default:
      return {...state};
  }
}

const cityAtom = atomWithReducer(
  getFromStorage('cities') || [
    {
      name: 'Tehran',
      lat: 35.6892523,
      lon: 51.3896004,
      country: 'IR'
    }
  ],
  callReducer
);

export default cityAtom;
