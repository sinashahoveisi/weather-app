import type {FC} from 'react';
import {formatDateTimeFromSecond} from '@/utils/dateTimeUtil';
import WeatherStatisticsCard from '@/components/card/WeatherStatisticsCard';

interface Props {
  timeSecond: number;
  isToday?: boolean;
  iconCode: string;
  city: string;
  countryCode: string;
  description: string;
  temperature: number;
  feelsLikeTemperature: number;
  humidity: number;
}

const WeatherCard: FC<Props> = ({
  city,
  countryCode,
  isToday,
  timeSecond,
  iconCode,
  description,
  temperature,
  feelsLikeTemperature,
  humidity
}) => {
  return (
    <article className="card text-bg-dark weather-card p-4">
      <h4 className="card-title fs-6 fw-semibold">{formatDateTimeFromSecond(timeSecond, 'dddd')}</h4>
      <h5 className="card-text fs-5 fw-lighter">{formatDateTimeFromSecond(timeSecond, 'D')}</h5>
      <img
        className="img-fluid img-weather"
        src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={iconCode}
      />
      <h2 className="fs-5 fw-bold">
        {city}
        <sup className="country-badge">{countryCode}</sup>
      </h2>
      <p className="card-text fw-light fw-4 text-white-50">{description}</p>
      <div className="w-100 d-flex flex-row flex-wrap justify-content-center align-items-center card-glassmorphism">
        <WeatherStatisticsCard title="Temperature" value={temperature} unit="ºC" />
        <WeatherStatisticsCard title="Feels Like" value={feelsLikeTemperature} unit="ºC" />
        <WeatherStatisticsCard title="Humidity" value={humidity} unit="%" />
      </div>
    </article>
  );
};

export default WeatherCard;
