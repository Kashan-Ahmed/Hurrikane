import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuestGuard from '@/routes/guards/GuestGuard';
import AuthGuard from '@/routes/guards/AuthGuard';
import { getUserDetails } from '@/store/auth-store';

interface IRoute {
  path: string;
  element: React.ElementType;
  type: string;
  accessLevel?: string[];
}

const useCustomRoutes = (routes: IRoute[] = []) => {
  const hasAccess = getUserDetails()?.role || '';
  return (
    <Routes>
      {routes.map(
        (route, idx) =>
          route.accessLevel?.includes(hasAccess) && (
            <Route
              key={idx}
              path={route.path}
              element={(() => {
                switch (route.type) {
                  case 'PROTECTED':
                    return (
                      <GuestGuard>
                        <route.element />
                      </GuestGuard>
                    );
                  case 'PRIVATE':
                    return (
                      <AuthGuard route={route}>
                        <route.element />
                      </AuthGuard>
                    );
                  case 'PUBLIC':
                    return <route.element />;
                  default:
                    return <route.element />;
                }
              })()}
            />
          )
      )}
    </Routes>
  );
};

export default useCustomRoutes;
