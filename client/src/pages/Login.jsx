import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore'; // Import the user store
import axiosBaseURL from '../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUsername, authenticate } = useUserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputUsername.trim() !== '' && inputPassword.trim() !== '') {
            try {
                setLoading(true);
                const response = await axiosBaseURL.post("/auth/login", {
                    username: inputUsername,
                    password: inputPassword 
                },{
                    withCredentials: true
                });
                if (response.data) {
                    setUsername(inputUsername);
                    authenticate();
                    toast.success("Login successful!");
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                toast.error("An error occurred while verifying the user. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please enter a valid username and password');
        }
    };

    return (
        <div className="container mx-auto p-8 bg-[#2B2B2B] text-white min-h-screen flex flex-col items-center justify-center">
            <ToastContainer />
            <h1 className="text-5xl font-bold text-center mb-8 text-[#72EA88] drop-shadow-lg">
                Login
            </h1>
            <div className="bg-[#333] p-6 rounded-lg shadow-lg w-full max-w-md">
                <form>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-lg font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="block w-full p-3 rounded-md text-[#2B2B2B] placeholder-gray-400"
                            placeholder="Enter your username"
                            value={inputUsername}
                            onChange={(e) => setInputUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="block w-full p-3 rounded-md text-[#2B2B2B] placeholder-gray-400"
                            placeholder="Enter your password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className="w-full bg-[#72EA88] hover:bg-[#66d07c] text-[#2B2B2B] font-semibold px-6 py-3 rounded-md text-lg transition duration-300 ease-in-out"
                        onClick={handleSubmit}
                    >
                        Login{loading && '...'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
