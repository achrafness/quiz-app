import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import ScoreBoard from "./pages/ScoreBoard";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Questions from './pages/Questions';
import Timer from './pages/Timer';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './component/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/quiz',
    element: <Quiz />
  },
  {
    path: '/result',
    element: <Result />
  },
  {
    path: '/scoreboard',
    element: <ScoreBoard />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'statistics',
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'questions',
        element: (
          <PrivateRoute>
            <Questions />
          </PrivateRoute>
        ),
      },
      {
        path: 'timer',
        element: (
          <PrivateRoute>
            <Timer />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
