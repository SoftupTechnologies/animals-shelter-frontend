import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../../../constants/routes';

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = (props: ProtectedRouteProps): ReactElement => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={routes.LOG_IN} replace />;
  }

  return props.children;
};

export default ProtectedRoute;
