import type {FC} from 'react';

interface Props {
  headerText: string;
  subHeaderText: string;
}

const HeroView: FC<Props> = ({headerText, subHeaderText}) => {
  return (
    <section className="d-flex flex-column justify-content-center py-4 px-3 hero">
      <div className="container">
        <h1>{headerText}</h1>
        <h2>{subHeaderText}</h2>
      </div>
    </section>
  );
};

export default HeroView;
