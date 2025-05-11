import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const ExpenseList = () => {
  const { state, dispatch } = useExpenses();
  const { user } = useAuth();
  const [editId, setEditId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAmount, setEditedAmount] = useState('');

  const handleEditClick = (expenseId: string) => {
    const exp = state.find((e) => e.id === expenseId);
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

  const handleDelete = (docId: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: docId });

    if (editId === docId) {
      setEditId(null);
      setEditedDescription('');
      setEditedAmount('');
    }
  };

  return (
    <div>
      <h2>Expenses</h2>
      {state.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {state.map((exp) => (
            <li key={exp.docId} style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div>
                {editId === exp.docId ? (
                  <>
                    <input
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <input
                      type="number"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <div style={{ fontWeight: 'bold' }}>{exp.description}</div>
                    <div>
                      ₹{exp.amount.toLocaleString('en-IN')} | Added by: {exp.userName}
                      <span style={{
                        marginLeft: '10px',
                        padding: '2px 8px',
                        borderRadius: '10px',
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
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {editId === exp.docId ? (
                    <>
                      <button onClick={handleSave}>💾</button>
                      <button onClick={() => setEditId(null)}>✖</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(exp.docId)}>✏️</button>
                      <button onClick={() => handleDelete(exp.docId)}>🗑️</button>
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

export default ExpenseList;
