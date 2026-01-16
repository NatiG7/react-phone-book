import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';

// Providers
import AuthProvider from './context/AuthProvider';
import DataProvider from './context/DataProvider';

// Hooks
import { useAuth } from './hooks/useAuth';

// Pages
import GroupsPage from './pages/GroupPage/GroupsPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PhoneBookPage from './pages/PhoneBookPage/PhoneBookPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to='/' replace />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LoginPage />} />

            <Route element={<Layout />}>
              <Route
                path='/home'
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/contacts'
                element={
                  <ProtectedRoute>
                    <PhoneBookPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/groups'
                element={
                  <ProtectedRoute>
                    <GroupsPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
};

export default App;
