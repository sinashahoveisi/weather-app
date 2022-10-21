import type {FC} from 'react';
import {useAtom} from 'jotai';
import {map} from 'lodash';
import {useCallback} from 'react';
import HeroView from '@/components/view/HeroView';
import cityAtom from '@/atoms/cityAtom';
import WeatherCityCard from '@/containers/dashboard/WeatherCityCard';
import type {CityProps} from '@/types/city';

const Dashboard: FC = () => {
  const [cities, setCities] = useAtom(cityAtom);

  const removeCity = useCallback((index: number) => setCities({type: 'DELETE_CITY', index}), []);

  return (
    <main>
      <HeroView headerText="Tracked Cities" subHeaderText="All the cities you are saved to see the weather!" />
      <section className="my-4 container">
        <h2>saved Cities</h2>
        <div className="row">
          {map(cities, (city: CityProps, index: number) => (
            <div key={city?.name} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <WeatherCityCard city={city} index={index} onDelete={removeCity} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
