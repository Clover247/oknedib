
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ProjectsPage } from './pages/projects';
import { Layout } from './widgets/Layout';

// TODO: Replace with real auth check
const isAuthenticated = true;

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/dashboard" element={<div>Dashboard</div>} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/settings" element={<div>Settings</div>} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


