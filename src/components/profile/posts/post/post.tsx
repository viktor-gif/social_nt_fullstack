import { useEffect, useState } from "react"
import { profileAPI } from "../../../../api/profile"
import { CommentType } from "../../../../ts/posts"
import { ProfileDataType } from "../../../../ts/profile"
import s from "./post.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import heart from "../../../../img/icons/heart.png"
import greyHeart from "../../../../img/icons/heart_grey.png"
import commentsIcon from "../../../../img/icons/comments.png"
import { BurgerMenu } from "../../../common/burgerMenu/burgerMenu"
import { PostMenu } from "./postMenu"

import { Comment } from "./comment/comment"

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
    liked: boolean

    deletePost: (postId: string, userId: string) => void
    updatePost: (postId: string, postText: string, userId: string) => void
    toggleLike: (postId: string, userId: string) => void
    addComment: (postId: string, commentText: string, userId: string) => void
    deleteComment: (postId: string, commentId: string, userId: string) => void
    updateComment: (postId: string, commentId: string, commentText: string, userId: string) => void
    toggleCommentLike: (postId: string, commentId: string, userId: string) => void
}

export const Post = (props: PropsType) => {

    const [userProfileData, setUserProfileData] = useState<ProfileDataType | null>(null)
    const [isMenuActive, setMenuActive] = useState(false)
    const [isUpdate, setUpdate] = useState(false)
    const [currentPostText, setCurrentPostText] = useState(props.postText)
    const [isCommentsAll, setCommentsAll] = useState(false)

    const [currentCommentText, setCurrentCommentText] = useState('')

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
    const updatePost = () => {
        props.updatePost(props.postId, currentPostText, props.userId)
        setUpdate(false)
        setMenuActive(false)
    }
    const deleteComment = (commentId: string) => {
        props.deleteComment(props.postId, commentId, props.userId)
    }
    const updateComment = (commentId: string, commentText: string) => {
        props.updateComment(props.postId, commentId, commentText, props.userId)
    }
    const toggleCommentLike = (commentId: string) => {
        props.toggleCommentLike(props.postId, commentId, props.userId)
    }

    if (isUpdate) {
        return <div className={s.post__update}>
            <textarea id="updatePost" value={currentPostText} onChange={(e: any) => setCurrentPostText(e.target.value)}></textarea>
            <div>
                <button onClick={updatePost}>Застосувати зміни</button>
            </div>
        </div>
    }

    const commentsItems = props.comments.map(c => {
        return<Comment key={c._id} authorId={c.authorId} authProfileData={props.authProfileData}
            commentId={c._id} commentText={c.commentText} likedUsers={c.likedUsers}
            deleteComment={deleteComment} updateComment={updateComment}
            toggleCommentLike={toggleCommentLike} />

    })

    return <div className={s.post}>
        <BurgerMenu burgerClick={() => { isMenuActive ? setMenuActive(false) : setMenuActive(true) }} />
        {isMenuActive && <PostMenu canDeletePost={canDeletePost} deletePost={deletePost}
            canUpdatePost={authIsAuthorOfPost} setUpdate={setUpdate} />}
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
            <span onClick={() => props.toggleLike(props.postId, props.userId)} className={s.post__info}>
                <img src={props.liked ? greyHeart : heart} alt="heart" /> {props.likesCount}
            </span>
            <span onClick={() => isCommentsAll ? setCommentsAll(false) : setCommentsAll(true)} className={s.post__info}>
                <img src={commentsIcon} alt="comments" /> {props.comments.length}
            </span>
        </div>
        <div>
            {isCommentsAll && <div>
            <input className={s.commentsInput} placeholder="Напишіть коментар"
                value={currentCommentText} onChange={(e: any) => setCurrentCommentText(e.target.value)}
                onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.addComment(props.postId, currentCommentText, props.userId)
                        setCurrentCommentText('')
                    }
                    
                }} />
                {commentsItems}
            </div>}
        </div>
    </div>
}