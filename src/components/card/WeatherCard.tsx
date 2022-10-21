import type {FC} from 'react';
import {formatDateTimeFromSecond} from '@/utils/dateTimeUtil';
import WeatherStatisticsCard from '@/components/card/WeatherStatisticsCard';

interface Props {
  timeSecond: number;
  isSummary?: boolean;
  iconCode: string;
  city?: string;
  countryCode?: string;
  description: string;
  temperature: number;
  feelsLikeTemperature: number;
  humidity?: number;
  onClick?(): void;
}

const WeatherCard: FC<Props> = ({
  city,
  countryCode,
  isSummary,
  timeSecond,
  iconCode,
  description,
  temperature,
  feelsLikeTemperature,
  humidity,
  onClick
}) => {
  return (
    <article className="card text-bg-dark weather-card p-4" onClick={onClick}>
      <h4 className="card-title fs-6 fw-semibold">{formatDateTimeFromSecond(timeSecond, 'dddd')}</h4>
      <h5 className="card-text fs-5 fw-lighter">{formatDateTimeFromSecond(timeSecond, 'D')}</h5>
      <img
        className="img-fluid img-weather"
        src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={iconCode}
      />
      {countryCode && city && (
        <h2 className="fs-5 fw-bold">
          {city}
          <sup className="country-badge">{countryCode}</sup>
        </h2>
      )}
      <p className="card-text fw-light fw-4 text-white-50">{description}</p>
      <div className="w-100 d-flex flex-row flex-wrap justify-content-center align-items-center card-glassmorphism">
        <WeatherStatisticsCard
          title={!isSummary ? 'Temperature' : undefined}
          value={temperature?.toFixed(isSummary ? 0 : 2)}
          unit="ºC"
        />
        <WeatherStatisticsCard
          title={!isSummary ? 'Feels Like' : undefined}
          value={feelsLikeTemperature?.toFixed(isSummary ? 0 : 2)}
          unit="ºC"
        />
        {!!humidity && <WeatherStatisticsCard title="Humidity" value={humidity?.toFixed(isSummary ? 0 : 2)} unit="%" />}
      </div>
    </article>
  );
};

export default WeatherCard;
