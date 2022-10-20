import type {FC} from 'react';

const Dashboard: FC = () => {
  return (
    <main>
      <section className="d-flex flex-column justify-content-center py-4 px-3 hero">
        <div className="container">
          <h1>Tracked Cities</h1>
          <h2>All the cities you are saved to see the weather!</h2>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
