import MainLayout from '../layout/MainLayout';
import BalanceSummary from '../components/BalanceSummary';
import StyledCard from '../components/StyledCard';
import ExpenseCalendar from '../components/ExpenseCalendar'; // ✅ this is new

const ExpenseCalendarPage = () => {
  return (
    <MainLayout>
      <div style={{ flex: 1 }}>
        <StyledCard>
          <BalanceSummary />
        </StyledCard>
      </div>

      <div style={{ flex: 2 }}>
        <StyledCard>
          <ExpenseCalendar /> {/* ✅ replace all calendar logic with this */}
        </StyledCard>
      </div>
    </MainLayout>
  );
};

export default ExpenseCalendarPage;
