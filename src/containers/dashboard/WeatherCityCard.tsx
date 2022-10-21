import {FC, memo} from 'react';
import get from 'lodash/get';
import {Link} from 'react-router-dom';
import type {CityProps} from '@/types/city';
import useFetch from '@/hooks/request/useFetch';
import WeatherCard from '@/components/card/WeatherCard';
import WeatherCardLoading from '@/components/card/WeatherCardLoading';

interface Props {
  city: CityProps;
}

const WeatherCityCard: FC<Props> = ({city}) => {
  const fetchWeatherCity = useFetch({
    name: ['weather', city?.lat, city?.lon],
    url: 'data/2.5/onecall',
    query: {lat: city?.lat, lon: city?.lon},
    enabled: true
  });

  if (fetchWeatherCity?.isFetching) return <WeatherCardLoading city={city?.name} countryCode={city?.country} />;

  return (
    <Link className="text-decoration-none" to="/city/show" state={{city}}>
      <WeatherCard
        hasDelete
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
