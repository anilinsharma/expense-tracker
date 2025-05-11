import { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const ExpenseForm = () => {
  const { dispatch } = useExpenses();
  const { user } = useAuth();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [groupId, setGroupId] = useState('');
  const [groups, setGroups] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;
      const q = query(collection(db, 'groups'), where('members', 'array-contains', user.uid));
      const snapshot = await getDocs(q);
      const groupList = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().groupName,
      }));
      setGroups(groupList);
    };

    fetchGroups();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date || !user) return;

    let members: string[] = [user.uid];

    // If groupId exists, fetch all group members
    if (groupId) {
      const groupDoc = await getDoc(doc(db, 'groups', groupId));
      const groupData = groupDoc.data();
      members = groupData?.members || [user.uid];
    }

    const newExpense = {
      id: uuidv4(),
      description,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      uid: user.uid,
      userName: user.displayName || 'Unknown',
      groupId: groupId || null,
      members,
    };

    try {
      const docRef = await addDoc(collection(db, 'expenses'), newExpense);
      dispatch({ type: 'ADD_EXPENSE', payload: { ...newExpense, docId: docRef.id } });

      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setGroupId('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
          <option value="">Select Group (optional)</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
