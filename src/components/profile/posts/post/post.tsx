import { useEffect, useState } from "react"
import { profileAPI } from "../../../../api/profile"
import { CommentType } from "../../../../ts/posts"
import { ProfileDataType } from "../../../../ts/profile"
import s from "./post.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import heart from "../../../../img/icons/heart.png"
import { BurgerMenu } from "../../../common/burgerMenu/burgerMenu"
import { PostMenu } from "./postMenu"

type PropsType = {
    key: string
    postId: string
    postText: string
    authorId: string
    comments: CommentType[]
    userId: string
    created: string
    likesCount: number
    authProfileData: ProfileDataType | null

    deletePost: (postId: string, userId: string) => void
}

export const Post = (props: PropsType) => {

    const [userProfileData, setUserProfileData] = useState<ProfileDataType | null>(null)
    const [isMenuActive, setMenuActive] = useState(false)

    const authIsAuthorOfPost = props.authorId === props.authProfileData?._id
    const isAuthPosts = props.userId === props.authProfileData?._id
    const canDeletePost = (authIsAuthorOfPost || isAuthPosts)
    useEffect(() => {
        if (!authIsAuthorOfPost) {
            profileAPI.getProfile(props.authorId).then(res => {
                setUserProfileData(res.data)
            })
        }
    }, [])

    const deletePost = () => {
        props.deletePost(props.postId, props.userId)
    }

    return <div className={s.post}>
        <BurgerMenu burgerClick={() => { isMenuActive ? setMenuActive(false) : setMenuActive(true) }} />
        {isMenuActive && <PostMenu canDeletePost={canDeletePost} deletePost={deletePost} />}
        <div className={s.post__avatar}>
            {/* @ts-ignore */}
            <img src={userProfileData?.photos.small || props.authProfileData?.photos.small || avatar} alt="userPhoto" />
            <span>{userProfileData?.fullName || props.authProfileData?.fullName}</span>
        </div>
        <div style={{color: "green"}}>postId: {props.postId}</div>
        <div style={{color: "green"}}>authorId: {props.authorId}</div>
        <div>{props.postText}</div>
        <div>
            <span>{props.created}</span>
            <span className={s.post__heartIcon}><img src={heart} alt="heart" /> {props.likesCount}</span>
        </div>
        <div>
            <span>28 Коментарів</span><span>Упорядочити</span>
            <div>commentsItems</div>
        </div>
    </div>
}