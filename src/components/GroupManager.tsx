import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';

const GroupManager = () => {
  return (
    <div>
      <h2>Manage Groups</h2>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <CreateGroup />
        </div>
        <div style={{ flex: 1 }}>
          <JoinGroup />
        </div>
      </div>
    </div>
  );
};

export default GroupManager;
