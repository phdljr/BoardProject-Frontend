import create from 'zustand'
import { persist } from "zustand/middleware";

const useMemberStore = create(
    persist(
        (set) => ({
            memberData: {
                isLogin: false,
                memberId: null,
                nickname: null,
                memberType: null
            },
            login: (data) => {
                set(() => ({
                    memberData: {
                        isLogin: true,
                        memberId: data.memberId,
                        nickname: data.nickname,
                        memberType: data.memberType
                    }
                }))
            },
            logout: () => {
                set(() => ({
                    memberData: {
                        isLogin: false,
                        memberId: null,
                        nickname: null,
                        memberType: null
                    }
                }))
            }
        }),
        { name: "member-storage" }
    )
)

export default useMemberStore;