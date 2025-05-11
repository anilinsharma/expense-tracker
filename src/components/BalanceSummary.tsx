import { useExpenses } from '../context/ExpenseContext';

const BalanceSummary = () => {
  const { state } = useExpenses();

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalToday = state
    .filter((exp) => exp.date?.startsWith(today))
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalThisMonth = state
    .filter((exp) => {
      const d = new Date(exp.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h2>Balance Summary</h2>
      <p>
        <strong>Today's Spending:</strong> ₹{totalToday.toLocaleString('en-IN')}
      </p>
      <p>
        <strong>This Month's Spending:</strong> ₹{totalThisMonth.toLocaleString('en-IN')}
      </p>
    </div>
  );
};

export default BalanceSummary;
