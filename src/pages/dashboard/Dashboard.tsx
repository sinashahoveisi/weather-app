import type {FC} from 'react';
import {useAtomValue} from 'jotai';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import HeroView from '@/components/view/HeroView';
import cityAtom from '@/atoms/cityAtom';
import WeatherCityCard from '@/containers/dashboard/WeatherCityCard';
import type {CityProps} from '@/types/city';

const Dashboard: FC = () => {
  const cities = useAtomValue(cityAtom);

  return (
    <main>
      <HeroView headerText="Tracked Cities" subHeaderText="All the cities you are saved to see the weather!" />
      <section className="my-4 container">
        <h2>Cities</h2>
        {isEmpty(cities) ? (
          <p className="fst-italic fs-4 my-5 text-center">Please add Your Cities.</p>
        ) : (
          <div className="row">
            {map(cities, (city: CityProps) => (
              <div key={city?.name} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <WeatherCityCard city={city} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
