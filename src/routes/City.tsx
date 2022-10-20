import type {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import ShowCityPage from '@/pages/city/ShowCity';

const CityRoute: FC = () => {
  return (
    <Routes>
      <Route path="show" element={<ShowCityPage />} />
    </Routes>
  );
};

export default CityRoute;
