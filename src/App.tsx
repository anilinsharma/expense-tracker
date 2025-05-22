import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseListPage from './pages/ExpenseListPage';
import ExpenseCalendarPage from './pages/ExpenseCalendarPage';
import GroupManagementPage from './pages/GroupManagementPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './routes/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <Routes>
         
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/add-expense" element={<PrivateRoute><AddExpensePage /></PrivateRoute>} />
            <Route path="/expenses" element={<PrivateRoute><ExpenseListPage /></PrivateRoute>} />
            <Route path="/calendar" element={<PrivateRoute><ExpenseCalendarPage /></PrivateRoute>} />
            <Route path="/groups" element={<PrivateRoute><GroupManagementPage /></PrivateRoute>} />
          </Routes>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
