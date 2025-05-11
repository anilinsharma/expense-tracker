import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useExpenses } from '../context/ExpenseContext';

const ExpenseCalendar = () => {
  const { state } = useExpenses();

  const [dateRange, setDateRange] = useState<Date | [Date | null, Date | null] | null>(new Date());
  const [filter, setFilter] = useState<'all' | 'personal' | 'group'>('all');

  const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

  const isInRange = (expDate: Date) => {
    if (Array.isArray(dateRange)) {
      const [start, end] = dateRange;
      return start && end && expDate >= start && expDate <= end;
    }
    return dateRange instanceof Date && isSameDay(expDate, dateRange);
  };

  const handleCalendarChange = (
    value: Date | [Date | null, Date | null] | null,
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value !== null) {
      setDateRange(value);
    }
  };

  const filteredExpenses = state.filter((exp) => {
    const expDate = new Date(exp.date);
    const matchDate = isInRange(expDate);
    const matchFilter =
      filter === 'all' ||
      (filter === 'group' && exp.groupId) ||
      (filter === 'personal' && !exp.groupId);
    return matchDate && matchFilter;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <h4>Select Date or Range</h4>
          <Calendar
            selectRange
            onChange={handleCalendarChange}
            value={dateRange}
            tileClassName={({ date }) =>
              state.some((exp) => isSameDay(new Date(exp.date), date)) ? 'highlight' : ''
            }
          />
        </div>
        <div style={{ alignSelf: 'flex-end', marginTop: '1rem' }}>
          <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            style={{
              padding: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          >
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="group">Group</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h4>
          Expenses from{' '}
          {Array.isArray(dateRange)
            ? `${dateRange[0]?.toDateString() ?? '...'} to ${dateRange[1]?.toDateString() ?? '...'}`
            : dateRange instanceof Date
            ? dateRange.toDateString()
            : 'N/A'}
        </h4>

        {filteredExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {filteredExpenses.map((exp) => (
              <li
                key={exp.docId}
                style={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>{exp.description}</div>
                <div>
                  ₹{exp.amount.toLocaleString('en-IN')} | Added by: {exp.userName}
                  <span
                    style={{
                      marginLeft: '10px',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      backgroundColor: exp.groupId ? '#00b894' : '#0984e3',
                      color: '#fff',
                    }}
                  >
                    {exp.groupId ? 'Group' : 'Personal'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseCalendar;
