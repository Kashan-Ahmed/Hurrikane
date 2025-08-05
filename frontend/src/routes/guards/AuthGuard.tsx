import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { getAccessTokens } from '@/store/auth-store';
import ROUTE_CONSTANTS from '../routes.constants';

interface IRoute {
  path: string;
  element: React.ElementType;
  type: string;
  roles?: string[];
}

type Props = {
  route: IRoute;
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const isAuthenticated = getAccessTokens()?.access;

  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_CONSTANTS.LOGIN} />;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
