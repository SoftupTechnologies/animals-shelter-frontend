import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute/protectedRoute';
import { routes } from './constants/routes';
import Login from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={routes.LOG_IN} />} />
        <Route path={routes.LOG_IN} element={<Login />} />
        {/* <Route path={routes.LOG_OUT} element={<LogOut />} /> */}
        <Route
          path={routes.APP_DASHBOARD}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
