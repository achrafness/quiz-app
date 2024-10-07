import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaStar, FaTrophy } from 'react-icons/fa'; // Import icons from React Icons

const Statistics = () => {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorFetching, setErrorFetching] = useState(false);

    const fetchStatistics = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/v1/result/statistics',{
                withCredentials:true
            });
            console.log(response.data);
            setStatistics(()=>response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setErrorFetching(true);
        } finally {
            setLoading(false);

        }
    };
    useEffect(() => {
        fetchStatistics();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Quiz Statistics</h1>
            {
                loading ? (
                    <p>Loading statistics...</p>
                ) : errorFetching ? (
                    <p>Error fetching statistics. Please try again later.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* Total Participants */}
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                <FaUsers className="text-4xl text-[#72EA88] mr-4" />
                                <div>
                                    <h2 className="text-xl font-semibold">Total Participants</h2>
                                    <p className="text-2xl">{statistics.totalParticipants}</p>
                                </div>
                            </div>

                            {/* Average Score */}
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                <FaStar className="text-4xl text-[#72EA88] mr-4" />
                                <div>
                                    <h2 className="text-xl font-semibold">Average Score</h2>
                                    <p className="text-2xl">{statistics.averageScore}</p>
                                </div>
                            </div>

                            {/* Highest & Lowest Score */}
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                <FaTrophy className="text-4xl text-[#72EA88] mr-4" />
                                <div>
                                    <h2 className="text-xl font-semibold">Highest Score</h2>
                                    <p className="text-2xl">{statistics.highestScore}</p>
                                    <h2 className="text-xl font-semibold">Lowest Score</h2>
                                    <p className="text-2xl">{statistics.lowestScore}</p>
                                </div>
                            </div>
                        </div>

                        {/* Score Distribution */}
                        <h2 className="text-2xl font-semibold mb-4">Score Distribution</h2>
                        <ul className="bg-white rounded-lg shadow-md p-4">
                            <li className="flex justify-between border-b py-2">
                                <span>0-3:</span>
                                <span>{statistics.scoreDistribution['0-3']}</span>
                            </li>
                            <li className="flex justify-between border-b py-2">
                                <span>4-6:</span>
                                <span>{statistics.scoreDistribution['4-6']}</span>
                            </li>
                            <li className="flex justify-between border-b py-2">
                                <span>7-10:</span>
                                <span>{statistics.scoreDistribution['7-10']}</span>
                            </li>
                        </ul>
                    </>
                )
            }
        </div>
    );
};

export default Statistics;
