import {ChangeEvent, FC, useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import map from 'lodash/map';
import some from 'lodash/some';
import cityAtom from '@/atoms/cityAtom';
import useFetch from '@/hooks/request/useFetch';
import type {CityProps} from '@/types/city';

const AddCity: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [cities, setCities] = useAtom(cityAtom);

  const fetchCity = useFetch<CityProps[]>({
    name: ['direct', 'new'],
    query: {limit: 5},
    url: 'geo/1.0/direct'
  });

  useEffect(() => {
    if (openModal) document.querySelector('body')?.classList.add('modal-open');
    else document.querySelector('body')?.classList.remove('modal-open');
  }, [openModal]);

  const toogleModal = () => setOpenModal((prevState: boolean) => !prevState);

  const onSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    fetchCity.fetch(undefined, {q: event.target.value});
  }, 1000);

  const addCity = (city: CityProps) => {
    setCities({type: 'ADD_CITY', city});
    toogleModal();
  };

  return (
    <>
      <button className="btn btn-sm btn-outline-success h-fit" type="button" onClick={toogleModal}>
        Add City
      </button>
      <div className={clsx('modal fade', {'show d-block': openModal})}>
        <div className="modal-dialog modal-md modal-fullscreen-sm-down modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Add City</h1>
              <button
                type="button"
                className="btn-close text-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toogleModal}
              />
            </div>
            <div className="modal-body overflow-x-hidden">
              <div className="d-flex flex-column justify-content-center align-items-center gap-2 h-100">
                <input
                  className="form-control me-2 w-100"
                  type="search"
                  onChange={onSearch}
                  placeholder="Search City ..."
                  aria-label="Search"
                />
                {fetchCity?.isFetching ? (
                  <div className="spinner-border spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <ul className="list-group mt-4 w-100">
                    {map(fetchCity?.data?.data, (city: CityProps) => (
                      <li key={city?.name} className="list-group-item">
                        <button
                          type="button"
                          className="btn btn-outline-light border-0 w-100"
                          disabled={some(cities, ['name', city?.name])}
                          onClick={() => addCity(city)}>
                          <span className="fs-5 fw-bold">
                            {city?.name}
                            <sup className="country-badge">{city?.country}</sup>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCity;
