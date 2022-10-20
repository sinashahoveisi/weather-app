import {FC, memo} from 'react';
import get from 'lodash/get';
import {Link} from 'react-router-dom';
import type {CityProps} from '@/types/city';
import useFetch from '@/hooks/request/useFetch';
import WeatherCard from '@/components/card/WeatherCard';

interface Props {
  city: CityProps;
  index: number;
  onDelete(index: number): void;
}

const WeatherCityCard: FC<Props> = ({city, index, onDelete}) => {
  const fetchWeatherCity = useFetch({
    name: ['weather', city?.lat, city?.lon],
    url: 'data/2.5/onecall',
    query: {lat: city?.lat, lon: city?.lon},
    enabled: true
  });

  if (fetchWeatherCity?.isFetching) return <p>loading</p>;

  return (
    <Link className="text-decoration-none" to="/city/show" state={{city}}>
      <WeatherCard
        timeSecond={fetchWeatherCity?.data?.data?.current?.dt}
        iconCode={get(fetchWeatherCity?.data?.data, ['current', 'weather', 0, 'icon'])}
        city={city?.name}
        countryCode={city?.country}
        description={get(fetchWeatherCity?.data?.data, ['current', 'weather', 0, 'description'])}
        temperature={fetchWeatherCity?.data?.data?.current?.temp}
        feelsLikeTemperature={fetchWeatherCity?.data?.data?.current?.feels_like}
        humidity={fetchWeatherCity?.data?.data?.current?.humidity}
      />
    </Link>
  );
};

export default memo(WeatherCityCard);
