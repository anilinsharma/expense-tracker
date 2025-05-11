import MainLayout from '../layout/MainLayout';
import BalanceSummary from '../components/BalanceSummary';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import StyledCard from '../components/StyledCard';

const AddExpensePage = () => {
  return (
    <MainLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '1rem',
        padding: '1rem'
      }}>
        <StyledCard style={{ order: 0 }}>
          <BalanceSummary />
        </StyledCard>
        <StyledCard style={{ order: 1 }}>
          <ExpenseForm />
        </StyledCard>
        <StyledCard style={{ order: 2 }}>
          <ExpenseList />
        </StyledCard>
      </div>
    </MainLayout>
  );
};

export default AddExpensePage;
