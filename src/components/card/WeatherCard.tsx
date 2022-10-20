import type {FC} from 'react';
import {formatDateTimeFromSecond} from '@/utils/dateTimeUtil';
import WeatherStatisticsCard from '@/components/card/WeatherStatisticsCard';

interface Props {
  timeSecond: number;
  isToday: boolean;
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
    <article className="card text-bg-dark weather-card d-flex flex-column justify-content-center p-4">
      <div className="card-img-overlay">
        <h4 className="card-title">{formatDateTimeFromSecond(timeSecond, 'dddd')}</h4>
        <h5 className="card-text">{formatDateTimeFromSecond(timeSecond, 'dd')}</h5>
        <img
          className="img-fluid img-thumbnail"
          src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={iconCode}
        />
        <h2>
          {city}
          <sup>{countryCode}</sup>
        </h2>
        <p className="card-text">{description}</p>
        <div className="w-full d-flex flex-row justify-content-center align-items-center">
          <WeatherStatisticsCard title="Temperature" value={temperature} unit="ºC" />
          <WeatherStatisticsCard title="Feels Like" value={feelsLikeTemperature} unit="ºC" />
          <WeatherStatisticsCard title="Humidity" value={humidity} unit="%" />
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
