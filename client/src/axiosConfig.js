import axios from "axios";

const axiosBaseURL = axios.create({
  // baseURL: 'https://eventmap.onrender.com/api/v1'
  baseURL: "http://localhost:3000/api/v1",
});
export default axiosBaseURL;
