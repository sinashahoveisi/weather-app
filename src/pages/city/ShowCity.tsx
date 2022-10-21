import type {FC} from 'react';
import {useLocation} from 'react-router-dom';
import get from 'lodash/get';
import map from 'lodash/map';
import HeroView from '@/components/view/HeroView';
import useFetch from '@/hooks/request/useFetch';
import WeatherCard from '@/components/card/WeatherCard';
import {WeekdayWeatherDetailProps} from '@/types/weather';

const ShowCity: FC = () => {
  const location = useLocation();

  const fetchWeatherCity = useFetch({
    name: ['weather', location?.state?.city?.lat, location?.state?.city?.lon],
    url: 'data/2.5/onecall',
    query: {
      lat: location?.state?.city?.lat,
      lon: location?.state?.city?.lon,
      units: 'metric',
      exclude: 'minutely,hourly'
    },
    enabled: true
  });

  return (
    <main>
      <HeroView headerText={location?.state?.city?.name} subHeaderText="Weather for the next 7 days" />
      <section className="my-4 container">
        <h2>sasas</h2>
        <div className="row">
          <aside className="col-12 col-md-6 col-lg-4 col-xl-3">
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
          </aside>
          <div className="col-12 col-md-6 col-lg-8 col-xl-9 mt-4 mt-md-0 d-flex flex-column justify-content-between">
            <h3 className="fs-5">other days of week</h3>
            <div className="d-flex flex-row flex-nowrap overflow-x-auto align-items-center gap-2">
              {map(fetchWeatherCity?.data?.data?.daily, (weekdayWeather: WeekdayWeatherDetailProps) => (
                <div key={weekdayWeather?.dt} className="col-11 col-md-8 col-lg-4 col-xl-3">
                  <WeatherCard
                    timeSecond={weekdayWeather?.dt}
                    iconCode={get(weekdayWeather, ['weather', 0, 'icon'])}
                    description={get(weekdayWeather, ['weather', 0, 'description'])}
                    temperature={weekdayWeather?.temp?.day}
                    feelsLikeTemperature={weekdayWeather?.feels_like?.day}
                  />
                </div>
              ))}
            </div>
            <p className="fw-lighter m-0 pt-3">
              <strong className="fw-bold">Note:</strong> for further details of a specific day, click on the card.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowCity;
