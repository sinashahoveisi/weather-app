import {
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import isObject from 'lodash/isObject';
import WeatherCard from '@/components/card/WeatherCard';
import {TodayWeatherDetailProps, WeekdayWeatherDetailProps} from '@/types/weather';
import {formatDateTimeFromSecond} from '@/utils/dateTimeUtil';
import WeatherStatisticsCard from '@/components/card/WeatherStatisticsCard';

interface refProps {
  open: (weatherDetail: TodayWeatherDetailProps | WeekdayWeatherDetailProps) => void;
  close: () => void;
}

interface Props {
  ref?: RefObject<refProps>;
}

const WeatherCityCard: ForwardRefRenderFunction<refProps, Props> = ({ref}, forwardedRef: ForwardedRef<refProps>) => {
  const [weatherDetail, setWeatherDetail] = useState<TodayWeatherDetailProps | WeekdayWeatherDetailProps | undefined>(
    undefined
  );

  const onClose = () => setWeatherDetail(undefined);

  useImperativeHandle(forwardedRef, () => ({
    open(weatherDetail: TodayWeatherDetailProps | WeekdayWeatherDetailProps) {
      setWeatherDetail(weatherDetail);
    },
    close() {
      onClose();
    }
  }));

  useEffect(() => {
    if (weatherDetail) document.querySelector('body')?.classList.add('modal-open');
    else document.querySelector('body')?.classList.remove('modal-open');
  }, [weatherDetail]);

  if (isUndefined(weatherDetail)) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-lg modal-fullscreen-sm-down modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{`Weather Info from ${formatDateTimeFromSecond(
              weatherDetail?.dt,
              'dddd'
            )}`}</h1>
            <button
              type="button"
              className="btn-close text-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12 col-md-6">
                <WeatherCard
                  timeSecond={weatherDetail?.dt}
                  iconCode={get(weatherDetail, ['weather', 0, 'icon'])}
                  description={get(weatherDetail, ['weather', 0, 'description'])}
                  temperature={isObject(weatherDetail?.temp) ? weatherDetail?.temp?.day : weatherDetail?.temp}
                  feelsLikeTemperature={
                    isObject(weatherDetail?.feels_like) ? weatherDetail?.feels_like?.day : weatherDetail?.feels_like
                  }
                  humidity={weatherDetail?.humidity}
                />
              </div>
              <div className="col-12 col-md-6">
                <div className="w-100 h-100 d-flex flex-row flex-wrap justify-content-center align-items-center card-glassmorphism">
                  <WeatherStatisticsCard title="Wind Speed" value={weatherDetail?.wind_speed} unit="km/h" />
                  <WeatherStatisticsCard title="Wind Direction" value={weatherDetail?.wind_deg} unit="º" />
                  <WeatherStatisticsCard title="Clouds" value={weatherDetail?.clouds} unit="%" />
                  <WeatherStatisticsCard title="Rain" value={weatherDetail?.uvi} unit="%" />
                  <WeatherStatisticsCard title="Temperature Max" value={weatherDetail?.minTemp} unit="ºC" />
                  <WeatherStatisticsCard title="Temperature Min" value={weatherDetail?.maxTemp} unit="ºC" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(WeatherCityCard);
