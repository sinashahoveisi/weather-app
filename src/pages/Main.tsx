import {NavLink, Outlet} from 'react-router-dom';
import {FC, useState} from 'react';
import clsx from 'clsx';
import AddCity from '@/containers/header/AddCity';

const Main: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toogleCollapse = () => setCollapsed((prevState: boolean) => !prevState);

  return (
    <>
      <header className="container">
        <nav className="navbar navbar-dark navbar-expand-lg">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              Weather App
            </NavLink>
            <button
              className="navbar-toggler"
              onClick={toogleCollapse}
              type="button"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className={clsx('collapse navbar-collapse', {show: collapsed})}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
                    aria-current="page">
                    Dashboard
                  </NavLink>
                </li>
              </ul>
              <AddCity />
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Main;
