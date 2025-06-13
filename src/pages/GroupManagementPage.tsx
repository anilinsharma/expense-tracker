import MainLayout from '../layout/MainLayout';
import BalanceSummary from '../components/BalanceSummary';
import GroupManager from '../components/GroupManager';
import StyledCard from '../components/StyledCard';

const GroupManagementPage = () => {
  return (
    <MainLayout>
      <div style={{ flex: 1, padding: '1rem' }}>
        <StyledCard>
          <BalanceSummary />
        </StyledCard>
      </div>
      <div style={{ flex: 2, padding: '1rem' }}>
        <StyledCard>
          <GroupManager />
        </StyledCard>
      </div>
    </MainLayout>
  );
};

export default GroupManagementPage;
