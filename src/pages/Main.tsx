import {Link, NavLink, Outlet} from 'react-router-dom';
import type {FC} from 'react';

const Main: FC = () => {
  return (
    <>
      <header />
      <Outlet />
    </>
  );
};

export default Main;
