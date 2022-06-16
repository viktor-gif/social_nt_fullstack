
import { axiosCreate } from "./api";

export const profileAPI = {
    getProfile(userId: string) {
        return axiosCreate.get(`/profile/${userId}`)
    },
    updateProfile() {
        return axiosCreate.put(`/profile`)
    },
    getStatus(userId: string) {
        return axiosCreate.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return axiosCreate.put(`/profile/status`, {status})
    },
    updateAvatoar() {
        return axiosCreate.put(`/profile/photo`)
    }
}