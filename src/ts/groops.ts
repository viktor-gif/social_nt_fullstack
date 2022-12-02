import { PostType } from "./posts"
import { ImgDataType } from "./commonImg"
import { VideoDataType } from "./commonVideo"
import { AudioDataType } from "./commonAudio"

export type GroopType = {
    _id: string
    authorId: string
    created: string
    followers: string[]
    mainImg: string | null
    title: string
    topic: string
    type: string
    describeInfo: string | null
    posts: PostType[]
    img: ImgDataType[]
    video: VideoDataType[]
    audio: AudioDataType[]
}