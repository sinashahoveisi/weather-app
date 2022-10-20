import type {FC} from 'react';
import {useLocation} from 'react-router-dom';
import get from 'lodash/get';
import HeroView from '@/components/view/HeroView';
import useFetch from '@/hooks/request/useFetch';
import WeatherCard from '@/components/card/WeatherCard';

const ShowCity: FC = () => {
  const location = useLocation();

  const fetchWeatherCity = useFetch({
    name: ['weather', location?.state?.city?.lat, location?.state?.city?.lon],
    url: 'data/2.5/onecall',
    query: {lat: location?.state?.city?.lat, lon: location?.state?.city?.lon},
    enabled: true
  });

  return (
    <main>
      <HeroView headerText="Tracked Cities" subHeaderText="All the cities you are saved to see the weather!" />
      <WeatherCard
        timeSecond={fetchWeatherCity?.data?.data?.current?.dt}
        iconCode={get(fetchWeatherCity?.data?.data, ['current', 'weather', 0, 'icon'])}
        city={location?.state?.city?.name}
        countryCode={location?.state?.city?.country}
        description={get(fetchWeatherCity?.data?.data, ['current', 'weather', 0, 'description'])}
        temperature={fetchWeatherCity?.data?.data?.current?.temp}
        feelsLikeTemperature={fetchWeatherCity?.data?.data?.current?.feels_like}
        humidity={fetchWeatherCity?.data?.data?.current?.humidity}
      />
    </main>
  );
};

export default ShowCity;
