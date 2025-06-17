import MainLayout from '../layout/MainLayout';
import BalanceSummary from '../components/BalanceSummary';
import StyledCard from '../components/StyledCard';
import ExpenseCalendar from '../components/ExpenseCalendar';

const ExpenseCalendarPage = () => {
  return (
    <MainLayout>
      <div style={{ flex: 1, padding: '1rem' }}>
        <StyledCard>
          <BalanceSummary />
        </StyledCard>
      </div>

      <div style={{ flex: 2, padding: '1rem' }}>
        <StyledCard>
          <ExpenseCalendar />
        </StyledCard>
      </div>
    </MainLayout>
  );
};

export default ExpenseCalendarPage;
