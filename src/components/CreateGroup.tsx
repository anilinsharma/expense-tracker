import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const CreateGroup = () => {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState('');

  const handleCreate = async () => {
    if (!user || !groupName) return;
    try {
      await addDoc(collection(db, 'groups'), {
        groupName,
        ownerUid: user.uid,
        members: [user.uid],
        createdAt: serverTimestamp(),
      });
      alert('Group created successfully');
      setGroupName('');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h3>Create Group</h3>
      <input
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateGroup;
