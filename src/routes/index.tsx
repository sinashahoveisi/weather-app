import {Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './Dashboard';
import City from './City';
import Main from '@/pages/Main';

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/dashboard/*" element={<City />} />
        <Route path="/city/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
