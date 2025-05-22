import { useState } from 'react';
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';

const GroupManager = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Manage Groups</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('create')}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'create' ? '#0984e3' : '#dfe6e9',
            color: activeTab === 'create' ? '#fff' : '#2d3436',
            fontWeight: 500
          }}
        >
          ➕ Create Group
        </button>
        <button
          onClick={() => setActiveTab('join')}
          style={{
            padding: '0.5rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'join' ? '#0984e3' : '#dfe6e9',
            color: activeTab === 'join' ? '#fff' : '#2d3436',
            fontWeight: 500
          }}
        >
          🔗 Join Group
        </button>
      </div>

      <div>
        {activeTab === 'create' ? <CreateGroup /> : <JoinGroup />}
      </div>
    </div>
  );
};

export default GroupManager;
