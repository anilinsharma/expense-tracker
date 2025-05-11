import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  uid: string;
  userName: string;
  groupId?: string | null;
  members?: string[];
  docId: string;
};

type Action =
  | { type: 'SET_INITIAL'; payload: Expense[] }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'EDIT_EXPENSE'; payload: Expense };

const ExpenseContext = createContext<{
  state: Expense[];
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const expenseReducer = (state: Expense[], action: Action): Expense[] => {
  switch (action.type) {
    case 'SET_INITIAL':
      return action.payload;
    case 'ADD_EXPENSE':
      return [action.payload, ...state];
    case 'DELETE_EXPENSE':
      return state.filter((exp) => exp.docId !== action.payload);
    case 'EDIT_EXPENSE':
      return state.map((exp) =>
        exp.docId === action.payload.docId ? action.payload : exp
      );
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, []);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'expenses'),
          where('members', 'array-contains', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const data: Expense[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        })) as Expense[];
        dispatch({ type: 'SET_INITIAL', payload: data });
      } catch (error) {
        console.error('Error loading expenses from Firestore:', error);
      }
    };

    fetchExpenses();
  }, [user]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used within ExpenseProvider');
  return context;
};
