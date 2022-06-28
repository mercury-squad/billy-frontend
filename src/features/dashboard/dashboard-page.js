import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';

const PAGE_TITLE = 'Dashboard';
const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [setHeaderTitle] = useOutletContext();

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  return (
    <div>
      <p>Welcome to the Dashboard {user.firstName}</p>
    </div>
  );
};

export default Dashboard;
