import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import ScoreBoard from "./pages/ScoreBoard";

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
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
