import type {FC} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosError} from 'axios';
import type {SearchCityFormProps} from '@/types/dashboard';
import TextInput from '@/components/input/TextInput';
import useFetch from '@/hooks/request/useFetch';

const validationSchema = yup.object().shape({
  cityName: yup.string().trim()
});

const SearchCity: FC = () => {
  const {control, handleSubmit, setError} = useForm<any>({
    resolver: yupResolver(validationSchema)
  });

  const fetchWeatherCity = useFetch({
    name: ['weather', 'new'],
    url: 'weather',
    onError(error: AxiosError) {
      setError('cityName', {message: error?.response?.data?.message, type: 'validate'});
    }
  });

  const onSearch = (search: SearchCityFormProps) => {
    fetchWeatherCity.fetch(undefined, {q: search?.cityName});
  };

  return (
    <form className="d-flex needs-validation was-validate gap-2" role="search" onSubmit={handleSubmit(onSearch)}>
      <TextInput control={control} name="cityName" placeholder="Add City" type="search" />
      <button className="btn btn-sm btn-outline-success h-fit" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchCity;
