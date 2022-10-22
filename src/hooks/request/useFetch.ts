import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {useQuery, UseQueryResult} from 'react-query';
import {useEffect, useState} from 'react';
import compact from 'lodash/compact';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import merge from 'lodash/merge';
import {dynamicParams} from '@/types/common';
import {allocateParamToString} from '@/utils/commonUtil';

interface IGetConfig {
  url: string;
  name?: Array<string | number | undefined | null> | string;
  query?: object;
  params?: object;
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
  onSuccess?(data: AxiosResponse): void;
  onError?(error: AxiosError): void;
}

const useFetch = <Response>({
  url,
  name = 'notLongTimeAvailable',
  query,
  params,
  onSuccess,
  onError,
  enabled = false,
  staleTime = 180000,
  cacheTime = 600000
}: IGetConfig) => {
  const prettyName = isString(name) ? name : compact(name);
  if (prettyName === 'notLongTimeAvailable') {
    staleTime = 0;
    cacheTime = 0;
  }

  const [dynamicParams, setDynamicParams] = useState<dynamicParams | undefined>(undefined);

  const requestConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    url: allocateParamToString(url, merge(params, dynamicParams?.params)),
    method: 'GET',
    params: merge(query, dynamicParams?.query, {appid: import.meta.env.VITE_OPEN_WEATHER_APP_ID})
  };

  const fetchData: UseQueryResult<AxiosResponse<Response, Response>, AxiosError> = useQuery<
    AxiosResponse<Response>,
    AxiosError
  >(prettyName, () => axios(requestConfig), {
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    keepPreviousData: false,
    enabled,
    staleTime,
    cacheTime,
    retryDelay: 5000,
    onSuccess,
    onError,
    retry: (failureCount: number, error: AxiosError): boolean => {
      if (error?.response?.status === 404 || error?.response?.status === 500) return false;
      return failureCount <= 1;
    }
  });

  useEffect(() => {
    if (!isEmpty(values(dynamicParams))) {
      fetchData.refetch();
    }
  }, [dynamicParams]);

  const fetch = (params?: object, query?: object) => {
    setDynamicParams({params, query});
  };

  const refresh = () => fetchData.remove();
  return {
    ...fetchData,
    refresh,
    fetch,
    query: merge(query, dynamicParams?.query),
    params: merge(params, dynamicParams?.params)
  };
};

export default useFetch;
