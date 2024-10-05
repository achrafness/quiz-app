import { create } from "zustand";

const useTimerStore = create((set) => ({
  timeLeft: 0,
  timerId: null,
  isActive: false,
  setTimer: (timeLeft, timerId) => set({ timeLeft, timerId, isActive: true }),
  clearTimer: () => set({ timeLeft: 0, timerId: null, isActive: false }),
  tick: () => set((state) => ({ timeLeft: state.timeLeft - 1 })),
}));

export default useTimerStore;
