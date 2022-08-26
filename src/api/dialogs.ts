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
    sendMessage(dialogId: string, message: string, file: any) {
        const fileData = new FormData()
        fileData.append("dialogs", file)
        return axiosCreate.post(`dialogs/${dialogId}/messages?messageText=${message}&whereIsFile=dialogs`, fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    deleteMessage(dialogId: string, messageId: string) {
        return axiosCreate.delete(`/dialogs/${dialogId}/messages/${messageId}`)
    },
    setAsSpam(dialogId: string, messageId: string) {
        return axiosCreate.put(`/dialogs/${dialogId}/messages/${messageId}/set_spam`)
    },
    restoreFromSpam(dialogId: string, messageId: string) {
        return axiosCreate.put(`/dialogs/${dialogId}/messages/${messageId}/restore_spam`)
    },
    setViewed(dialogId: string, messageId: string, senderId: string) {
        return axiosCreate.put(`/dialogs/${dialogId}/messages/${messageId}/setViewed?senderId=${senderId}`)
    }
}
