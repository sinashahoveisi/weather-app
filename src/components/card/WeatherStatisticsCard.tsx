import type {FC} from 'react';

interface Props {
  title?: string;
  value: number | string;
  unit: string;
}

const WeatherStatisticsCard: FC<Props> = ({title, value, unit}) => {
  return (
    <div className="w-50 flex-shrink-0 flex-basis-50 d-flex flex-column justify-content-center align-items-center py-2">
      {!!title && <h6 className="fw-lighter">{title}</h6>}
      <p className="fw-bold m-0">{`${value} ${unit}`}</p>
    </div>
  );
};

export default WeatherStatisticsCard;
