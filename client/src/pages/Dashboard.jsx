import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 h-full bg-[#2B2B2B] p-4 overflow-y-auto">
        <h2 className="text-4xl font-bold text-[#72EA88] mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <Link to="statistics" className="text-white hover:text-[#72EA88]">
              User Statistics
            </Link>
          </li>
          <li className="mb-2">
            <Link to="questions" className="text-white hover:text-[#72EA88]">
              Questions
            </Link>
          </li>
          <li className="mb-2">
            <Link to="timer" className="text-white hover:text-[#72EA88]">
              Quiz Timer
            </Link>
          </li>
        </ul>
      </aside>
      <main className="flex-grow p-4 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
