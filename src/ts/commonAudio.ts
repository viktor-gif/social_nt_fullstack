import { CommentType } from "./posts"


export type AudioDataType = {
    _id: string
    authorId: string
    url: string
    title: string | null
    isPrivat: boolean
    created: string
    likedusers: string[]
    comments: CommentType[]
}
