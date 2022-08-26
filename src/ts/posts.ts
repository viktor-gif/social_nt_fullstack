export type PostType = {
    _id: string
    authorId: string
    profileId: string
    postText: string | null
    postImg: string | null
    postVideo: string | null
    postAudio: string | null
    likedUsers: string[]
    likesCount: number
    comments: CommentType[]
    created: string
}
export type CommentType = {
    _id: string
    authorId: string
    commentText: string | null
    image: string | null
    video: string | null
    audio: string | null
    linkToAnotherComment: string | null
    likedUsers: string[]
    likesCount: number
    created: string
}