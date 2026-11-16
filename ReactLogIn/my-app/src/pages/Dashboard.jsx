import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <>
      {user?.role === 'Manager' ? <h2>Manager</h2> : <h2>Customer</h2>}
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}
export default Dashboard;