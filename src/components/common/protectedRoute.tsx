import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import routes from '../../constants/routes';

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = (props: ProtectedRouteProps): ReactElement => {
  // const user = useSelector((state: RootState) => state.auth.user);
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={routes.LOG_IN} replace />;
  }

  return props.children;
};

export default ProtectedRoute;
