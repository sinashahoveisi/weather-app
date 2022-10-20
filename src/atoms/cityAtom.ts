import {atomWithReducer} from 'jotai/utils';
import remove from 'lodash/remove';
import {getFromStorage, saveToStorage} from '@/utils/storageUtil';
import type {ResortProps} from '@/types/city';
import type {BucketActionProps} from '@/types/dashboard';

function callReducer(state: ResortProps[], action: BucketActionProps) {
  switch (action.type) {
    case 'ADD_RESORT':
      if (action?.resort) {
        const newAddState = [...state, action.resort];
        saveToStorage('dashboard', newAddState);
        return [...state, action.resort];
      }
      return state;
    case 'DELETE_RESORT':
      const newRemoveState = [...state];
      remove(newRemoveState, ['id', action?.id]);
      saveToStorage('dashboard', newRemoveState);
      return newRemoveState;
    default:
      return {...state};
  }
}

const cityAtom = atomWithReducer(getFromStorage('dashboard') || [], callReducer);

export default cityAtom;
