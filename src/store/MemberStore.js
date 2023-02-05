import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, logout } from "../api";

const useMemberStore = create(
  persist(
    (set) => ({
      memberData: {
        isLogin: false,
        memberId: -1,
        nickname: null,
        memberType: "USER",
      },
      login: async (user) => {
        const data = await login(user);
        set(() => ({
          memberData: {
            isLogin: true,
            ...data,
          },
        }));
      },
      logout: async () => {
        await logout();
        set(() => ({
          memberData: {
            isLogin: false,
            memberId: -1,
            nickname: null,
            memberType: "USER",
          },
        }));
      },
    }),
    { name: "member-storage" }
  )
);

export default useMemberStore;
