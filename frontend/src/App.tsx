import React from 'react';
import routes from './routes';
import useCustomRoutes from './hooks/useCustomRoutes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const routesContent = useCustomRoutes(routes);
  return (
    <React.Fragment>
      {routesContent} <ReactQueryDevtools buttonPosition="bottom-left" />
      <Toaster />
    </React.Fragment>
  );
}

export default App;
