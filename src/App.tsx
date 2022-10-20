import type {FC} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import MyRoutes from './routes';

const App: FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MyRoutes />
    </QueryClientProvider>
  );
};

export default App;
