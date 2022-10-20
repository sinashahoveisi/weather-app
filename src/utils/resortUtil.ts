import filter from 'lodash/filter';
import includes from 'lodash/includes';
import find from 'lodash/find';
import reverse from 'lodash/reverse';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';
import compact from 'lodash/compact';
import resortsData from '@/assets/constants/data.json';
import type {FilterResortsProps, ResortProps, SortTypeResortsType} from '@/types/city';
import {sliceIntoChunks, toNumberMoney} from '@/utils/commonUtil';

export const getResort = (id: number | string): ResortProps | undefined => {
  return find(resortsData, ['id', +id]);
};

export const filterResorts = (filterParams?: FilterResortsProps): Array<ResortProps | number | Function> => {
  if (!compact(values(filterParams))?.length) return resortsData;
  return filter(
    resortsData,
    (resort: ResortProps) =>
      (filterParams?.title?.length ? includes(resort?.title, filterParams?.title) : true) &&
      (filterParams?.minPrice || filterParams?.maxPrice
        ? toNumberMoney(resort?.price) >= (filterParams?.minPrice || 0) &&
          toNumberMoney(resort?.price) <= (filterParams?.maxPrice || Infinity)
        : true)
  );
};

export const sortResorts = (filteredResorts: Array<ResortProps | number | Function>, type: SortTypeResortsType) => {
  const sortBy = ['title', (resort: ResortProps) => toNumberMoney(resort?.price)];
  return sliceIntoChunks(orderBy(filteredResorts, type === 'title' ? sortBy : reverse(sortBy), ['asc']), 20);
};
