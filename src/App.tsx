import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage';
import NotFound from './components/NotFound';
import routes from './constants/routes';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={routes.LOG_IN} />} />
        <Route path={routes.LOG_IN} element={<Login />} />
        {/* <Route path={routes.LOG_OUT} element={<LogOut />} /> */}
        {/* <Route
          path={routes.APP}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
