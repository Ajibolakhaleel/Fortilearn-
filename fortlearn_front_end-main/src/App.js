import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './component/navabr';
import HomePage from './component/Home';
import Footer from './component/footer';
import Resourcespage from './component/resources';
import FortiLearnProfilePage from './component/profile';
import LoginForm from './component/login';
import RegisterForm from './component/register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkTokenExpiration } = useAuth();

  // Check token expiration before rendering protected routes
  if (!isAuthenticated() || checkTokenExpiration()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();

  // Routes to be hidden 
  const hideNavandFooter = ['/user-profile', '/login', '/register'];

  // Check if current route should hide navbar and footer
  const shouldBeHidden = hideNavandFooter.includes(location.pathname);

  return (
    <>
      {!shouldBeHidden && <Navbar />}
      {children}
      {!shouldBeHidden && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<Resourcespage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/user-profile" 
              element={
                <ProtectedRoute>
                  <FortiLearnProfilePage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;