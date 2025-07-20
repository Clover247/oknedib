
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ProjectsPage } from './pages/projects';
import { ProjectDetailsPage } from './pages/project-details';
import { Layout } from './widgets/Layout';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './app/store';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  return token ? <Layout>{children}</Layout> : <Navigate to="/login" />;
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
                                <Route path="/projects/:id" element={<ProjectDetailsPage />} /> {/* Add this line */}
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


