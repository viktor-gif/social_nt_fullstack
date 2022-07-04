export type PostType = {
    _id: string
    authorId: string
    profileId: string
    postText: string
    likesCount: number
    comments: CommentType[]
    creaded: string
}
export type CommentType = {
    _id: string
    authorId: string
    commentText: string
    likesCount: number
    created: string
}