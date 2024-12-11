import { create } from "zustand";

import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
//const user = randomUser?.results?.[0];  // Access the first user
export const useRandomStore = create((set) => ({
  randomUserObject: {},
  
  RandomPage: 1,
  isRandomUsersLoading: false,

  setRandomUsers: (plants) => set({ plants }),

  getRandomUsers: async () => {
      set({ isRandomUsersLoading: true });
      try {
          const res = await axiosInstance.get("/");
          set({ randomUser: res.data });
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch Random Users");
      } finally {
          set({ isRandomUsersLoading: false });
      }
  },

  

}));
