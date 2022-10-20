import moment from 'moment';

export const formatDateTimeFromSecond = (second: number, format: string = 'dddd'): string =>
  moment(new Date(second * 1000)).format(format);
