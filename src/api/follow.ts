import { axiosCreate } from "./api";

export const followAPI = {
    getFollow(userId: string) {
        return axiosCreate.get(`/follow?userId=${userId}`)
    },
    setFollow(userId: string) {
        return axiosCreate.post(`/follow?userId=${userId}`)
    },
    deleteFollow(userId: string) {
        return axiosCreate.delete(`/follow?userId=${userId}`)
    }
}