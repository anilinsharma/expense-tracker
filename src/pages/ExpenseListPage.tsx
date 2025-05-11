import MainLayout from '../layout/MainLayout';
import BalanceSummary from '../components/BalanceSummary';
import ExpenseList from '../components/ExpenseList';
import StyledCard from '../components/StyledCard';

const ExpenseListPage = () => {
  return (
    <MainLayout>
      <div style={{ flex: 1 }}>
        <StyledCard>
          <BalanceSummary />
        </StyledCard>
      </div>
      <div style={{ flex: 2 }}>
        <StyledCard>
          <ExpenseList />
        </StyledCard>
      </div>
    </MainLayout>
  );
};

export default ExpenseListPage;
