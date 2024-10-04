import { create } from "zustand";
import axiosBaseURL from "../axiosConfig";


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
      const { username, answers } = get(); // Get the current state
      const response = await axiosBaseURL.post(
        "/result",
        {
          username,
          answers,
        }
      );

      set({ score: response.data.result.score });
      console.log("Result submitted successfully:", response.data.result);
    } catch (error) {
      console.error("Error submitting result", error);
    }
  },
}));

export default useResultStore;
