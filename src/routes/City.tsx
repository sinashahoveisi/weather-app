import type {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import ShowCityPage from '@/pages/city/ShowCity';
import NewCityPage from '@/pages/city/NewCity';

const CityRoute: FC = () => {
  return (
    <Routes>
      <Route path=":id/:title" element={<NewCityPage />} />
      <Route path="/" element={<ShowCityPage />} />
    </Routes>
  );
};

export default CityRoute;
