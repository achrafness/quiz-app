import axios from "axios";

const axiosBaseURL = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});
export default axiosBaseURL;
