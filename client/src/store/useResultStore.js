import { create } from "zustand";
import axiosBaseURL from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";


const useResultStore = create((set, get) => ({
  username: "",
  answers: {}, // Store answers as key-value pairs
  score: 0,

  setUsername: (name) => set({ username: name }),

  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    })),

  submitResult: async () => {
    try {
      const { username, answers } = get(); 
      const response = await axiosBaseURL.post(
        "/result",
        {
          username,
          answers,
        }
      );

      set({ score: response.data.result.score });
      toast.success("Result submitted successfully");
      console.log("Result submitted successfully:", response.data.result);
    } catch (error) {
      toast.error("Error submitting result (time is out)");
      console.error("Error submitting result", error);
    }
  },
}));

export default useResultStore;
