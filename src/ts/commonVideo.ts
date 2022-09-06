import { CommentType } from "./posts"


export type VideoDataType = {
    _id: string
    authorId: string
    url: string
    title: string | null
    isPrivat: boolean
    created: string
    likedusers: string[]
    comments: CommentType[]
}
