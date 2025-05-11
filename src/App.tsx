import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseCalendarPage from './pages/ExpenseCalendarPage';
import GroupManagementPage from './pages/GroupManagementPage';
import ExpenseListPage from './pages/ExpenseListPage';

import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/add-expense" />} />
            <Route path="/login" element={<LoginPage />} />

            {/* 🔐 Protected Routes */}
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