import replace from 'lodash/replace';
import toNumber from 'lodash/toNumber';

export const toNumberMoney = (money: string): number => toNumber(replace(money, '$', ''));

export const sliceIntoChunks = (arr: any[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};
