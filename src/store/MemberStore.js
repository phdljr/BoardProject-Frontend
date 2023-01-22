import create from "zustand";
import { persist } from "zustand/middleware";

const useMemberStore = create(
  persist(
    (set) => ({
      memberData: {
        isLogin: false,
        memberId: -1,
        nickname: null,
        memberType: "USER",
      },
      login: (data) => {
        set(() => ({
          memberData: {
            isLogin: true,
            memberId: data.memberId,
            nickname: data.nickname,
            memberType: data.memberType,
          },
        }));
      },
      logout: () => {
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
