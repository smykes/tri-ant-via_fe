import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  children: ReactElement;
};

function getTokenFromLocalStorage(): string | null {
  return sessionStorage.getItem("token");
}
export const ProtectedRoute = (props: ProtectedProps): ReactElement => {
  if (!getTokenFromLocalStorage()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return props.children;
};
