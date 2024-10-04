// src/store/useQuizStore.js
import { create } from "zustand";
import axios  from "axios";
const useQuizStore = create((set) => ({
  questions: [],
  trace: 0,
  answers: [],

  fetchQuestions: async () => {
    try {
      const response = await axios.get("https://nexus-quiz.vercel.app/api/v1/question");
      set({ questions: response.data.questions });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },

  moveNext: () =>
    set((state) => {
      if (state.trace < state.questions.length - 1) {
        return { trace: state.trace + 1 };
      }
    }),

  movePrev: () =>
    set((state) => {
      if (state.trace > 0) {
        return { trace: state.trace - 1 };
      }
    }),

  pushAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),
}));

export default useQuizStore;
