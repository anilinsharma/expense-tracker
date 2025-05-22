import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ExpenseList = () => {
  const { state, dispatch } = useExpenses();
  const { user } = useAuth();
  const [editId, setEditId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  const handleEditClick = (expenseId: string) => {
    const exp = state.find((e) => e.docId === expenseId);
    if (!exp) return;
    setEditId(expenseId);
    setEditedDescription(exp.description);
    setEditedAmount(exp.amount.toString());
  };

  const handleSave = () => {
    if (!editedDescription || !editedAmount || !editId) return;

    dispatch({
      type: 'EDIT_EXPENSE',
      payload: {
        id: editId,
        description: editedDescription,
        amount: parseFloat(editedAmount),
        date: new Date().toISOString(),
        uid: user?.uid || '',
        userName: user?.displayName || 'You',
        docId: editId
      },
    });

    setEditId(null);
    setEditedDescription('');
    setEditedAmount('');
  };

  const handleDelete = async (docId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this expense? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'expenses', docId));
      dispatch({ type: 'DELETE_EXPENSE', payload: docId });
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Expenses</h2>
      {state.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {state.map((exp) => (
            <li key={exp.docId} style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <div style={{ flex: 1 }}>
                {editId === exp.docId ? (
                  <>
                    <input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      style={{ marginBottom: '0.5rem', width: '100%' }}
                    />
                    <input
                      type="number"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </>
                ) : (
                  <>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{exp.description}</div>
                    <div style={{ fontSize: '0.95rem', color: '#2d3436' }}>
                      ₹{exp.amount.toLocaleString('en-IN')} &nbsp; | Added by: {exp.userName}
                      <span style={{
                        marginLeft: '10px',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        backgroundColor: exp.groupId ? '#00b894' : '#0984e3',
                        color: '#fff'
                      }}>
                        {exp.groupId ? 'Group' : 'Personal'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {user?.uid === exp.uid && (
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                  {editId === exp.docId ? (
                    <>
                      <button onClick={handleSave} style={buttonStyle('#6c5ce7')}>💾</button>
                      <button onClick={() => setEditId(null)} style={buttonStyle('#b2bec3')}>✖</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(exp.docId)} style={buttonStyle('#55efc4')}>✏️</button>
                      <button onClick={() => handleDelete(exp.docId)} style={buttonStyle('#ff7675')}>🗑️</button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const buttonStyle = (bg: string) => ({
  backgroundColor: bg,
  border: 'none',
  borderRadius: '6px',
  padding: '6px 10px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1rem'
});

export default ExpenseList;