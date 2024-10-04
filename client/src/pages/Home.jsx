import { Link, useNavigate } from "react-router-dom";
import useResultStore from "../store/useResultStore";

const Home = () => {
  const { username, setUsername } = useResultStore();
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter a username.");
      return;
    }
    navigate('/quiz'); 
  };

  return (
    <div className="container mx-auto p-6 bg-[#2B2B2B] text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#72EA88]">Quiz Application</h1>

      <ol className="list-decimal list-inside space-y-2 text-lg">
        <li>You will be asked 10 questions one after another.</li>
        <li>Each question has three options. You can choose only one option.</li>
        <li>You can review and change answers before the quiz finishes.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <form  className="my-8"  >
        <input
          className="block w-full p-2 rounded-md text-[#2B2B2B] placeholder-gray-400"
          type="text"
          placeholder="Username*"
          value={username}
          onChange={handleInputChange}
          required 
        />
        <div className="start text-center mt-4">
          <button
            className="btn inline-block bg-[#72EA88] hover:bg-[#5fcc6a] text-[#2B2B2B] font-semibold px-6 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
