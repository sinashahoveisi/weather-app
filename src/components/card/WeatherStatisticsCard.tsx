import type {FC} from 'react';

interface Props {
  title?: string;
  value: number;
  unit: string;
}

const WeatherStatisticsCard: FC<Props> = ({title, value, unit}) => {
  return (
    <div className="w-50">
      {!!title && <h6>{title}</h6>}
      <p>{`${value} ${unit}`}</p>
    </div>
  );
};

export default WeatherStatisticsCard;
