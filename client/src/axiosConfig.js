import axios from "axios";

const axiosBaseURL = axios.create({
  baseURL: "https://nexus-quiz.vercel.app/api/v1",
});
export default axiosBaseURL;
