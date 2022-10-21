import type {FC} from 'react';
import {formatDateTimeFromSecond} from '@/utils/dateTimeUtil';
import WeatherStatisticsCard from '@/components/card/WeatherStatisticsCard';

interface Props {
  city: string;
  countryCode: string;
}

const WeatherCardLoading: FC<Props> = ({city, countryCode}) => {
  return (
    <article className="card text-bg-dark weather-card p-4">
      <h2 className="fs-5 fw-bold pb-3">
        {city}
        <sup className="country-badge">{countryCode}</sup>
      </h2>
      <div className="spinner-border spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </article>
  );
};

export default WeatherCardLoading;
