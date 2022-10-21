import type {ChangeEvent, FC} from 'react';
import {useUpdateAtom} from 'jotai/utils';
import debounce from 'lodash/debounce';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import map from 'lodash/map';
import useFetch from '@/hooks/request/useFetch';
import cityAtom from '@/atoms/cityAtom';
import {CityProps} from '@/types/city';

const AddCity: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const setCities = useUpdateAtom(cityAtom);

  const fetchCity = useFetch({
    name: ['direct', 'new'],
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
            <div className="modal-body">
              <input
                className="form-control me-2 w-100"
                type="search"
                onChange={onSearch}
                placeholder="Search City ..."
                aria-label="Search"
              />
              <ul className="list-group mt-4">
                {map(fetchCity?.data?.data, (city: CityProps) => (
                  <li key={city?.name} className="list-group-item">
                    <button
                      type="button"
                      className="btn btn-outline-light border-0 w-100"
                      onClick={() => addCity(city)}>
                      {city?.name} - {city?.country}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCity;
