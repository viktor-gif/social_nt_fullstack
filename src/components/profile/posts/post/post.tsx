import React, { useEffect, useState } from "react"
import { Attach, DocumentText, Heart, Share } from "react-ionicons"
import { profileAPI } from "../../../../api/profile"
import { CommentType } from "../../../../ts/posts"
import { ProfileDataType } from "../../../../ts/profile"
import s from "./post.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import { BurgerMenu } from "../../../common/burgerMenu/burgerMenu"
import { PostMenu } from "./postMenu"
import { Comment } from "./comment/comment"
import { formatDate } from "../../../../utils/formatDate"
import { UpdateMessage } from "../../../common/updateMessage/updateMessage"

type PropsType = {
    key: string
    postId: string
    postText: string | null
    postImg: string | null
    postVideo: string | null
    postAudio: string | null
    authorId: string
    comments: CommentType[]
    userId: string
    created: string
    likesCount: number
    authProfileData: ProfileDataType | null
    liked: boolean
    postFile: any
    commentFile: any

    deletePost: (postId: string, userId: string) => void
    updatePost: (postId: string, postText: string, file: any, userId: string) => void
    toggleLike: (postId: string, userId: string) => void
    addComment: (postId: string, userId: string, commentText: string, file: any, linkToAnotherComment: string | null) => void
    deleteComment: (postId: string, commentId: string, userId: string) => void
    updateComment: (postId: string, commentId: string, commentText: string, file: any, userId: string) => void
    toggleCommentLike: (postId: string, commentId: string, userId: string) => void
    setCommentFile: (file: any) => void
    setPostFile: (file: any) => void
}

export const Post = React.memo((props: PropsType) => {

    console.log(props.comments)

    const [userProfileData, setUserProfileData] = useState<ProfileDataType | null>(null)
    const [isMenuActive, setMenuActive] = useState(false)
    const [isUpdate, setUpdate] = useState(false)
    const [currentPostText, setCurrentPostText] = useState(props.postText || '')
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

    console.log(props.commentFile)

    const deletePost = () => {
        props.deletePost(props.postId, props.userId)
    }
    const resetUpdatePost = () => {
        setUpdate(false)
        setMenuActive(false)
    }
    const updatePost = () => {
        props.updatePost(props.postId, currentPostText || '', props.postFile, props.userId)
        resetUpdatePost()
    }
    const deleteComment = (commentId: string) => {
        props.deleteComment(props.postId, commentId, props.userId)
    }
    const updateComment = (commentId: string, commentText: string) => {
        props.updateComment(props.postId, commentId, commentText, props.commentFile, props.userId)
    }
    const toggleCommentLike = (commentId: string) => {
        props.toggleCommentLike(props.postId, commentId, props.userId)
    }

    const sendComment = () => {
        props.addComment(props.postId, props.userId, currentCommentText, props.commentFile, null)
        setCurrentCommentText('')
        props.setCommentFile(null)
    }

    if (isUpdate) {
        return <UpdateMessage resetUpdate={resetUpdatePost} update={updatePost}
            currentText={currentPostText} setCurrentText={setCurrentPostText} setFile={props.setPostFile} />
    }

    const commentsItems = props.comments
        .filter(c => !c.linkToAnotherComment)
        .map(c => {
        return <Comment key={c._id} authorId={c.authorId} authProfileData={props.authProfileData}
            commentId={c._id} commentText={c.commentText} likedUsers={c.likedUsers}
            linkToAnotherComment={c.linkToAnotherComment}
            image={c.image} video={c.video} audio={c.audio}
            deleteComment={deleteComment} updateComment={updateComment}
            toggleCommentLike={toggleCommentLike} created={c.created}
            addComment={props.addComment} comments={props.comments}
            postId={props.postId} userId={props.userId}
            commentFile={props.commentFile} setCommentFile={props.setCommentFile} />
            
    })
    return <div className={s.post}>
        <div className={s.post__infoBlock}>
            <div className={s.post__avatar}>
                {/* @ts-ignore */}
                <img src={userProfileData?.photos.small || props.authProfileData?.photos.small || avatar} alt="userPhoto" />

            </div>
            <div className={s.nameAndTimeBlock}>
                <span className={s.fullName}>{userProfileData?.fullName || props.authProfileData?.fullName}</span>
                <span className={s.time}>{formatDate(props.created)}</span>
            </div>
            <BurgerMenu burgerClick={() => { isMenuActive ? setMenuActive(false) : setMenuActive(true) }} />
        </div>
        
        {isMenuActive
            && <PostMenu canDeletePost={canDeletePost} deletePost={deletePost}
                canUpdatePost={authIsAuthorOfPost} setUpdate={setUpdate} />
        }
        {props.postText
            && <div>
                {props.postText.includes("http://") || props.postText.includes("https://")
                    ? <div>
                        <a href={props.postText}>
                            <div>{props.postText}</div>
                        {/* @ts-ignore */}
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/X5Sf1bEjhKc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </a>
                    </div>
                    : <div className={s.post__contentBlock}>
                        {props.postText}
                    </div>
                }
                    
            </div>
        }
        {props.postImg
            && <div className={s.postFile}>
                <img src={props.postImg} alt="" />
            </div>
        }
        {props.postVideo
            && <div className={s.postFile}>
                <video src={props.postVideo} controls />
            </div>
        }
        {props.postAudio
            && <div className={s.postFile}>
                <audio src={props.postAudio} controls />
            </div>
        }

        <div className={s.post__actionsBlock}>
            <span onClick={() => props.toggleLike(props.postId, props.userId)}
                className={s.post__info}>
                <Heart
                    width="25px"
                    height="25px"
                    color={props.liked ? "#888" : "#ab1414"}
                /> <span>{props.likesCount}</span>
                <span>{props.liked ? "Прибрати" : "Додати"} лайк</span>
            </span>
            <span onClick={() => isCommentsAll ? setCommentsAll(false) : setCommentsAll(true)}
                className={s.post__info}>
                <DocumentText
                    width="25px"
                    height="25px"
                    color="#333"
                />
                <span>{props.comments.length}</span>
                 <span>{isCommentsAll ? "Приховати" : "Показати"} коментарі</span>
            </span>
            <span onClick={() => isCommentsAll ? setCommentsAll(false) : setCommentsAll(true)}
                className={s.post__info}>
                <Share
                    width="25px"
                    height="25px"
                    color="#333"
                /> <span>{Math.ceil(100 * Math.random())}</span>
                <span>Поділитися</span>
            </span>
        </div>
        <div>
            <div className={s.commentsInput}>
                <img src={props.authProfileData?.photos.small || avatar} alt="userPhoto" />
                <input placeholder="Напишіть коментар"
                    value={currentCommentText} onChange={(e: any) => setCurrentCommentText(e.target.value)}
                    onKeyDown={(e: any) => {
                        if (e.keyCode === 13) {
                            sendComment()
                        }

                    }}
                />
                <label className={s.attachIcon} htmlFor="addFileCommentInput">
                    <Attach width="30px" height="30px" />
                    <input type="file" id="addFileCommentInput" onChange={(e: any) => {
                            props.setCommentFile(e.target.files[0])
                        }}
                    />
                </label>
                <span className={s.sendCommentButton} onClick={sendComment}></span>
            </div>
        </div>
        {isCommentsAll
            && <div className={s.commentsBlock}>
                {commentsItems}
            </div>
        }
    </div>
})