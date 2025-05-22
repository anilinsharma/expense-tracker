import { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const JoinGroup = () => {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState('');

  const handleJoin = async () => {
    if (!user || !groupName) return;

    try {
      const q = query(collection(db, 'groups'), where('groupName', '==', groupName));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        alert('Group not found');
        return;
      }

      const groupDoc = snapshot.docs[0];
      await updateDoc(doc(db, 'groups', groupDoc.id), {
        members: arrayUnion(user.uid),
      });

      alert('Joined group successfully');
      setGroupName('');
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <div>
      <h3>Join Group</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
      </div>
    </div>

  );
};

export default JoinGroup;
