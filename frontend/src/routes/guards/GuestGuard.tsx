import { Navigate } from "react-router-dom";

import { getAccessTokens } from "@/store/auth-store";

interface IProps {
  children: React.ReactElement;
}

const GuestGuard = ({ children }: IProps) => {
  const tokens = getAccessTokens();

  if (tokens?.access) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
