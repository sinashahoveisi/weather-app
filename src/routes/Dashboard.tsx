import type {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/Dashboard';

const DashboardRoute: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
};

export default DashboardRoute;
