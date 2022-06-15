import { axiosCreate } from "./api";

export const getProfile = (userId: string) => {
    return axiosCreate.get(`/profile/${userId}`)
}