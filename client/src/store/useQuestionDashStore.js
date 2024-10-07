import { create } from "zustand";
import axiosBaseURL from "../axiosConfig";
import { toast } from "react-toastify";

const useQuestionDashStore = create((set) => ({
  questions: [],
  fetchQuestions: async () => {
    try {
      const response = await axiosBaseURL.get(
        "/question"
      );
      set({ questions: response.data.questions });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },
  addQuestion: async (newQuestion) => {
    try {
      const response = await axiosBaseURL.post(
        "/question",
        newQuestion,{
          withCredentials:true
        }
      );
      set((state) => ({
        questions: [...state.questions, response.data.questionCreated],
      }));
    } catch (error) {
      toast.error("Failed to add question.");
      console.error("Error adding question:", error);
    }
  },
  deleteQuestion: async (id) => {
    try {
      await axiosBaseURL.delete(`/question/${id}`,{
        withCredentials:true
      });
      set((state) => ({
        questions: state.questions.filter((question) => question._id !== id),
      }));
      toast.success("Question deleted successfully")
    } catch (error) {
      toast.error("Failed to delete question.");
      console.error("Error deleting question:", error);
    }
  },
  updateQuestion: async (id, updatedQuestion) => {
    try {
      const response = await axiosBaseURL.patch(
        `/question/${id}`,
        updatedQuestion,{
          withCredentials:true
        }
      );
      set((state) => ({
        questions: state.questions.map((question) =>
          question._id === id ? response.data.questionUpdated : question
        ),
      }));
    } catch (error) {
      toast.error("Failed to update question.");
      console.error("Error updating question:", error);
    }
  },
}));

export default useQuestionDashStore;
