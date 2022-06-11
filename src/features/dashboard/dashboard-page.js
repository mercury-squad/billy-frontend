import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h1>Welcome to the Dashboard {user.firstName}</h1>
    </div>
  );
};

export default Dashboard;
