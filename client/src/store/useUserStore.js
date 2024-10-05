import { create } from "zustand";
import Cookies from "js-cookie";

const useUserStore = create((set) => ({
  username: Cookies.get("username") || "",
  isAuthenticated: !!Cookies.get("isAuthenticated"), // convert to boolean

  setUsername: (username) => {
    Cookies.set("username", username, { expires: 7 }); // Set a 7-day expiration
    set({ username });
  },

  authenticate: () => {
    Cookies.set("isAuthenticated", true, { expires: 7 });
    set({ isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove("username");
    Cookies.remove("isAuthenticated");
    set({ username: "", isAuthenticated: false });
  },
}));

export default useUserStore;
