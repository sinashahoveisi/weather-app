import {extend} from 'lodash';

export interface WeatherProps {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface TemperatureProps {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLikeProps {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface WeatherBaseDetailProps {
  dt: number;
  sunrise: number;
  sunset: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherProps[];
  minTemp: number;
  maxTemp: number;
}

export interface TodayWeatherDetailProps extends WeatherBaseDetailProps {
  feels_like: number;
  temp: number;
  visibility: number;
}

export interface WeekdayWeatherDetailProps extends WeatherBaseDetailProps {
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: TemperatureProps;
  feels_like: FeelsLikeProps;
  wind_gust: number;
  pop: number;
  rain: number;
}

export interface CityWeatherProps {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: TodayWeatherDetailProps;
  hourly: TodayWeatherDetailProps[];
  daily: WeekdayWeatherDetailProps[];
}
