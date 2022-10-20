import type {FC} from 'react';
import HeroView from '@/components/view/HeroView';

const Dashboard: FC = () => {
  return (
    <main>
      <HeroView headerText="Tracked Cities" subHeaderText="All the cities you are saved to see the weather!" />
    </main>
  );
};

export default Dashboard;
