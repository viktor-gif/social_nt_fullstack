export type DialogType = {
    dialogId: string
    userId: string
    userImgUrl: string | null
    userName: string
    created: string
}
export type MessageType = {
    _id: string
    deleted: boolean
    isSpam: boolean
    message: string
    sender: string
    viewed: boolean
    created: string
}
export type CurrentDialogInfoType = {
    dialogId: string
    userName: string
}