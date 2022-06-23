import { axiosCreate } from "./api";

export const dialogsAPI = {
    getDialogs() {
        return axiosCreate.get(`/dialogs`)
    },
    createDialog(userId: string) {
        return axiosCreate.post(`/dialogs/add?userId=${userId}`)
    }
}