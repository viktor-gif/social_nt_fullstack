
import { axiosCreate } from "./api";

export const profileAPI = {
    getProfile(userId: string) {
        return axiosCreate.get(`/profile/${userId}`)
    }
}