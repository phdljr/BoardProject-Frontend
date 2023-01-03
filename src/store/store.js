import create from 'zustand'

export const useStore = create((set) => ({
    isLogin: false,
    memberId: null,
    nickname: null,
    memberType: null,
    login(id, name, type) {
        set(() => ({
            isLogin: true,
            memberId: id,
            nickname: name,
            memberType: type
        }))
    },
    logout() {
        set(() => ({
            isLogin: false,
            memberId: null,
            nickname: null,
            memberType: null
        }))
    }
}))
