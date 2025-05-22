import MainLayout from '../layout/MainLayout';
import BalanceSummary from '../components/BalanceSummary';
import ExpenseList from '../components/ExpenseList';
import StyledCard from '../components/StyledCard';

const DashboardPage = () => {
  return (
    <MainLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
         
        gap: '1rem',
        padding: '1rem'
      }}>
        <StyledCard>
          <BalanceSummary />
        </StyledCard>
        <StyledCard>
          <ExpenseList />
        </StyledCard>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
