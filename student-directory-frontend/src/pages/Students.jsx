import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  return (
    <div className="card-container" style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Student Directory</h2>
        <button onClick={logout} style={{ width: 'auto', padding: '0.5rem 1rem' }}>Logout</button>
      </div>

      {loading && <p>Loading students...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <ul>
          {students.map((student, index) => (
            <li key={student._id || index} style={{ marginBottom: '0.5rem' }}>
              <strong>{student.name}</strong> — {student.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}