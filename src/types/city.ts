export interface CityProps {
  country: string;
  name: string;
  lat: number;
  lon: number;
  localNames: Object;
}

export type CityActionType = 'ADD_CITY' | 'DELETE_CITY';

export interface CityActionProps {
  type: CityActionType;
  city?: CityProps;
  index?: number;
}
