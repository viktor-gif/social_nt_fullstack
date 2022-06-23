import { axiosCreate } from "./api";

export const dialogsAPI = {
    getDialogs() {
        return axiosCreate.get(`/dialogs`)
    },
    createDialog(userId: string) {
        return axiosCreate.post(`/dialogs/add?userId=${userId}`)
    },
    getDialogMessages(dialogId: string) {
        return axiosCreate.get(`dialogs/${dialogId}/messages`)
    },
    sendMessage(dialogId: string, message: string) {
        return axiosCreate.post(`dialogs/${dialogId}/messages`, { message: message })
    }
}