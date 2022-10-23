import {ElementRef, FC, useCallback, useRef} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import get from 'lodash/get';
import map from 'lodash/map';
import min from 'lodash/min';
import max from 'lodash/max';
import HeroView from '@/components/view/HeroView';
import useFetch from '@/hooks/request/useFetch';
import WeatherCard from '@/components/card/WeatherCard';
import type {WeekdayWeatherDetailProps} from '@/types/weather';
import WeatherCityDetail from '@/containers/city/WeatherCityDetail';
import {CityWeatherProps, TodayWeatherDetailProps} from '@/types/weather';

const ShowCity: FC = () => {
  const location = useLocation();
  const weatherCityDetailRef = useRef<ElementRef<typeof WeatherCityDetail>>(null);

  const fetchWeatherCity = useFetch<CityWeatherProps>({
    name: ['weather', location?.state?.city?.lat, location?.state?.city?.lon],
    url: 'data/2.5/onecall',
    query: {
      lat: location?.state?.city?.lat,
      lon: location?.state?.city?.lon,
      units: 'metric',
      exclude: 'minutely'
    },
    enabled: true
  });

  const openWeatherDetailModal = useCallback(
    (detail: TodayWeatherDetailProps | WeekdayWeatherDetailProps, minTemp?: number, maxTemp?: number) => {
      if (weatherCityDetailRef?.current?.open)
        weatherCityDetailRef.current.open({
          ...detail,
          minTemp,
          maxTemp
        });
    },
    []
  );

  if (!location?.state?.city) return <Navigate to="/dashboard" replace />;

  return (
    <main>
      <HeroView headerText={location?.state?.city?.name} subHeaderText="Weather for the next 7 days" />
      <section className="my-4 container">
        {fetchWeatherCity?.isFetching || !fetchWeatherCity?.data ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="spinner-border spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="fst-italic fs-4 my-5">Please Wait. Fetching Weather of {location?.state?.city?.name}.</p>
          </div>
        ) : (
          <>
            <h2>Now</h2>
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
                  onClick={() =>
                    openWeatherDetailModal(
                      fetchWeatherCity?.data?.data?.current,
                      min(map(fetchWeatherCity?.data?.data?.hourly, 'temp')),
                      max(map(fetchWeatherCity?.data?.data?.hourly, 'temp'))
                    )
                  }
                />
              </aside>
              <div className="col-12 col-md-6 col-lg-8 col-xl-9 mt-4 mt-md-0 d-flex flex-column justify-content-between">
                <h3 className="fs-5">other days of week</h3>
                <div className="row d-flex flex-row flex-nowrap overflow-x-auto align-items-center">
                  {map(fetchWeatherCity?.data?.data?.daily, (weekdayWeather: WeekdayWeatherDetailProps) => (
                    <div key={weekdayWeather?.dt} className="col-11 col-md-8 col-lg-4 col-xl-3 p-2">
                      <WeatherCard
                        isSummary
                        timeSecond={weekdayWeather?.dt}
                        iconCode={get(weekdayWeather, ['weather', 0, 'icon'])}
                        description={get(weekdayWeather, ['weather', 0, 'description'])}
                        temperature={weekdayWeather?.temp?.day}
                        feelsLikeTemperature={weekdayWeather?.feels_like?.day}
                        onClick={() =>
                          openWeatherDetailModal(weekdayWeather, weekdayWeather?.temp?.min, weekdayWeather?.temp?.max)
                        }
                      />
                    </div>
                  ))}
                </div>
                <p className="fw-lighter m-0 pt-3">
                  <strong className="fw-bold">Note:</strong> for further details of a specific day, click on the card.
                </p>
              </div>
            </div>
          </>
        )}
      </section>
      <WeatherCityDetail ref={weatherCityDetailRef} />
    </main>
  );
};

export default ShowCity;
