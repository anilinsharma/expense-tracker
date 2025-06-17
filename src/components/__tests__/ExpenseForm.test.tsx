import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseForm from '../ExpenseForm';
import { useExpenses } from '../../context/ExpenseContext';
import { useAuth } from '../../context/AuthContext';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore';

jest.mock('../../context/ExpenseContext');
jest.mock('../../context/AuthContext');
jest.mock('firebase/firestore');

describe('ExpenseForm', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (useExpenses as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: '1', displayName: 'Test User' } });

    (addDoc as jest.Mock).mockResolvedValue({ id: 'doc1' });
    (collection as jest.Mock).mockReturnValue('collection');
    (getDoc as jest.Mock).mockResolvedValue({ data: () => ({ members: ['1'] }) });
    (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
    (query as jest.Mock).mockReturnValue('query');
    (where as jest.Mock).mockReturnValue('where');
    (doc as jest.Mock).mockReturnValue('doc');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches ADD_EXPENSE on valid submit', async () => {
    render(<ExpenseForm />);

    userEvent.type(screen.getByPlaceholderText(/Description/i), 'Coffee');
    userEvent.type(screen.getByPlaceholderText(/Amount/i), '5');

    userEvent.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
    expect(mockDispatch.mock.calls[0][0].type).toBe('ADD_EXPENSE');
  });
});
