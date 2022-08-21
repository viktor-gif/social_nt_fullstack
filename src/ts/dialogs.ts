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
    message: string | null
    image: string | null
    video: string | null
    audio: string | null
    sender: string
    viewed: boolean
    created: string
}