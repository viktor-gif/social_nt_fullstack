
import { ProfileDataType } from "../ts/profile";
import { axiosCreate } from "./api";

export const profileAPI = {
    getProfile(userId: string) {
        return axiosCreate.get(`/profile/${userId}`)
    },
    updateProfile(data: ProfileDataType) {
        return axiosCreate.put(`/profile`, {data})
    },
    getStatus(userId: string) {
        return axiosCreate.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return axiosCreate.put(`/profile/status`, {status})
    },
    updateAvatar(photoFile: any) {
        const photoData = new FormData()
        photoData.append("avatar", photoFile)
        return axiosCreate.put(`/profile/photo`, photoData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}