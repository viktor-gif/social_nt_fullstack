import React, { useEffect, useState } from "react"
import { Attach, Heart } from "react-ionicons"
import s from "./comment.module.css"
import s2 from "../post.module.css"
import deleteIcon from "../../../../../img/icons/delete-icon.png"
import updateIcon from "../../../../../img/icons/update.png"
import copyIcon from "../../../../../img/icons/copy.png"
import { ProfileDataType } from "../../../../../ts/profile"
import { BurgerMenu } from "../../../../common/burgerMenu/burgerMenu"
import { profileAPI } from "../../../../../api/profile"
import avatar from "../../../../../img/ava_male.jpeg"
import { formatDate } from "../../../../../utils/formatDate"
import { CommentType } from "../../../../../ts/posts"
import { UpdateMessage } from "../../../../common/updateMessage/updateMessage"

type CommentPropsType = {
    authorId: string
    authProfileData: ProfileDataType | null
    commentId: string
    commentText: string | null
    image: string | null
    video: string | null
    audio: string | null
    linkToAnotherComment: string | null
    likedUsers: string[]
    created: string
    postId: string
    userId: string
    comments: CommentType[]
    commentFile: any

    deleteComment: (commentId: string) => void
    updateComment: (commentId: string, commentText: string, file: any) => void
    toggleCommentLike: (commentId: string) => void
    addComment: (postId: string, userId: string, commentText: string, file: any, linkToAnotherComment: string | null) => void
    setCommentFile: (file: any) => void
}

export const Comment = React.memo((props: CommentPropsType) => {
    const commentsAnswersFiltered = props.comments.filter(c => c.linkToAnotherComment && c.linkToAnotherComment === props.commentId)
    const commentsAnswersItems = commentsAnswersFiltered
        .map(c => {
            return <CommentItem key={c._id} authorId={c.authorId} authProfileData={props.authProfileData}
            commentId={c._id} commentText={c.commentText} likedUsers={c.likedUsers}
            linkToAnotherComment={c.linkToAnotherComment}
            image={c.image} video={c.video} audio={c.audio}
            deleteComment={props.deleteComment} updateComment={props.updateComment}
            toggleCommentLike={props.toggleCommentLike} created={c.created}
            addComment={props.addComment} comments={props.comments}
            postId={props.postId} userId={props.userId}
            commentFile={props.commentFile} setCommentFile={props.setCommentFile} />
        })
    return <div>
        <CommentItem authorId={props.authorId} authProfileData={props.authProfileData}
            commentId={props.commentId} commentText={props.commentText} likedUsers={props.likedUsers}
            linkToAnotherComment={props.linkToAnotherComment}
            image={props.image} video={props.video} audio={props.audio}
            deleteComment={props.deleteComment} updateComment={props.updateComment}
            toggleCommentLike={props.toggleCommentLike} created={props.created}
            addComment={props.addComment} comments={props.comments}
            postId={props.postId} userId={props.userId}
            commentFile={props.commentFile} setCommentFile={props.setCommentFile} />
        
            <div className={s.commentsAnswers}>
                <div></div>
                {commentsAnswersItems}
            </div>
    </div>
})

type CommentItemPropsType = {
    authorId: string
    authProfileData: ProfileDataType | null
    commentId: string
    commentText: string | null
    image: string | null
    video: string | null
    audio: string | null
    linkToAnotherComment: string | null
    likedUsers: string[]
    created: string
    postId: string
    userId: string
    comments: CommentType[]
    commentFile: any

    deleteComment: (commentId: string) => void
    updateComment: (commentId: string, commentText: string, file: any) => void
    toggleCommentLike: (commentId: string) => void
    addComment: (postId: string, userId: string, commentText: string, file: any, linkToAnotherComment: string | null) => void
    setCommentFile: (file: any) => void
}

const CommentItem = React.memo((props: CommentItemPropsType) => {
    const [isCommentMenuActive, setCommentMenuActive] = useState(false)
    const [isUpdateMode, setUpdateMode] = useState(false)
    const [commentatorProfileData, setCommentatorProfileData] = useState<ProfileDataType | null>(null)

    const [currentCommentText, setCurrentCommentText] = useState(commentatorProfileData?.fullName || '')
    const [isAnswerInput, setAnswerInput] = useState(false)

    const [currentTextEdit, setCurrentTextEdit] = useState(props.commentText || "")

    const authIsAuthorOfComment = props.authorId === props.authProfileData?.userId

    const linkToAnotherComment = props.linkToAnotherComment ? props.linkToAnotherComment : props.commentId
    
    useEffect(() => {
        if (!authIsAuthorOfComment) {
            profileAPI.getProfile(props.authorId).then(res => {
                setCommentatorProfileData(res.data)
            })
        }
    }, [isAnswerInput])

    const updateComment = () => {
        props.updateComment(props.commentId, currentTextEdit, props.commentFile)
        setUpdateMode(false)
    }

    const resetUpdateComment = () => setUpdateMode(false)

    if (isUpdateMode) {
        return <UpdateMessage resetUpdate={resetUpdateComment} update={updateComment}
            currentText={currentTextEdit} setCurrentText={setCurrentTextEdit} setFile={props.setCommentFile} />
    }

    const liked = props.likedUsers.includes(props.authProfileData?.userId || '')

    const sendComment = () => {
        props.addComment(props.postId, props.userId, currentCommentText, props.commentFile, linkToAnotherComment)
        setCurrentCommentText('')
        props.setCommentFile(null)
    }

    return <div className={s.commentItem__wrap}>
    <div className={s.commentItem}>

            {isCommentMenuActive && <div className={s.postMenu + " " + s.postMenu__comments}>
            {props.authorId === props.authProfileData?.userId
                && <div className={s.postMenu__item} onClick={() => {
                    setUpdateMode(true)
                    setCommentMenuActive(false)
                }
                }>
                    <img src={updateIcon} alt="UPDATE" />
                    <span>Виправити коментар</span>
                </div>}
                <div className={s.postMenu__item}>
                    <img src={copyIcon} alt="COPY" />
                    <span>Копіювати текст</span>
                </div>
                {
                props.authorId === props.authProfileData?.userId
                    && <div className={s.postMenu__item} onClick={() => props.deleteComment(props.commentId)}>
                        <img src={deleteIcon} alt="DEL" />
                        <span>Видалити коментар</span>
                    </div>
                }
            </div>
            }
                
        <div className={s.commentItem__menuBlock}>
            <BurgerMenu burgerClick={() => isCommentMenuActive ? setCommentMenuActive(false) : setCommentMenuActive(true)} />
        </div>
        <div className={s.comment__ava}>
            <img src={commentatorProfileData?.photos.small || props.authProfileData?.photos.small || avatar} alt="ava" />
        </div>
            <div className={s.commentTextAndActionsBlock}>
            {props.commentText
                && <div className={s.commentText}>
                    <span>{props.commentText}</span>
                </div>
            }
            {props.image
                && <div className={s.commentMedia}>
                    <img src={props.image} alt="some img" />
                </div>
                }
            {props.video
                && <div className={s.commentMedia}>
                    <video src={props.video} controls />
                </div>
            }
            {props.audio
                && <div className={s.commentMedia}>
                    <audio src={props.audio} controls />
                </div>
            }
            <div className={s.commentsActions}>
                <div onClick={() => props.toggleCommentLike(props.commentId)}
                    className={s.commentsActions__item}
                >
                    <Heart
                        width="20px"
                        height="20px"
                        color={liked ? "#888" : "#ab1414"}
                    /> 
                    <span>{props.likedUsers.length}</span>
                </div>
                <div
                    className={s.commentsActions__item}
                    onClick={() => isAnswerInput ? setAnswerInput(false) :setAnswerInput(true)}
                >
                        <span>{isAnswerInput ? "Відмінити" : "Відповісти"}</span>
                </div>
                <div className={s.date}>{formatDate(props.created)}</div>
            </div>
            
        </div>
        
    </div>
    {isAnswerInput
        && <div className={s2.commentsInput + " " + s.commentsInput}>
                <img src={props.authProfileData?.photos.small || avatar} alt="userPhoto" />
                <input placeholder="Напишіть коментар"
                    value={currentCommentText} onChange={(e: any) => setCurrentCommentText(e.target.value)}
                    onKeyDown={(e: any) => {
                        if (e.keyCode === 13) {
                            sendComment()
                       }
    
                    }}
                />
                <label className={s2.attachIcon} htmlFor="addFileCommentInput">
                        <Attach width="30px" height="30px" />
                    <input type="file" id="addFileCommentInput" onChange={(e: any) => {
                                props.setCommentFile(e.target.files[0])
                            }}
                    />
                </label>
            <span className={s2.sendCommentButton} onClick={sendComment}></span>
        </div>
        
    }
    </div >
})


// type CommentItemPropsType = {
//     isCommentMenuActive: boolean
//     authorId: string
//     authProfileData: ProfileDataType | null
//     commentText: string | null
//     image: string | null
//     video: string | null
//     audio: string | null
//     commentId: string
//     commentatorProfileData: ProfileDataType | null
//     created: string
//     likedUsers: string[]
//     liked: boolean
//     isAnswerInput: boolean
//     currentCommentText: string

//     setUpdateMode: (isUpdate: boolean) => void
//     setCommentMenuActive: (isActive: boolean) => void
//     setAnswerInput: (isActive: boolean) => void
//     deleteComment: (commentId: string) => void
//     toggleCommentLike: (commentId: string) => void
//     setCurrentCommentText: (text: string) => void
//     setCommentFile: (file: any) => void
//     sendComment: () => void
// }
// const CommentItem = (props: CommentItemPropsType) => {
//     return <div className={s.commentItem__wrap}>
//     <div className={s.commentItem}>

//             {props.isCommentMenuActive && <div className={s.postMenu + " " + s.postMenu__comments}>
//             {props.authorId === props.authProfileData?._id
//                 && <div className={s.postMenu__item} onClick={() => {
//                     props.setUpdateMode(true)
//                     props.setCommentMenuActive(false)
//                 }
//                 }>
//                     <img src={updateIcon} alt="UPDATE" />
//                     <span>Виправити коментар</span>
//                 </div>}
//                 <div className={s.postMenu__item}>
//                     <img src={copyIcon} alt="COPY" />
//                     <span>Копіювати текст</span>
//                 </div>
//                 {
//                 props.authorId === props.authProfileData?._id
//                     && <div className={s.postMenu__item} onClick={() => props.deleteComment(props.commentId)}>
//                         <img src={deleteIcon} alt="DEL" />
//                         <span>Видалити коментар</span>
//                     </div>
//                 }
//             </div>
//             }
                
//         <div className={s.commentItem__menuBlock}>
//             <BurgerMenu burgerClick={() => props.isCommentMenuActive ? props.setCommentMenuActive(false) : props.setCommentMenuActive(true)} />
//         </div>
//         <div className={s.comment__ava}>
//             <img src={props.commentatorProfileData?.photos.small || props.authProfileData?.photos.small || avatar} alt="ava" />
//         </div>
//             <div className={s.commentTextAndActionsBlock}>
//             {props.commentText
//                 && <div className={s.commentText}>
//                     <span>{props.commentText}</span>
//                 </div>
//             }
//             {props.image
//                 && <div className={s.commentMedia}>
//                     <img src={props.image} alt="some img" />
//                 </div>
//                 }
//             {props.video
//                 && <div className={s.commentMedia}>
//                     <video src={props.video} controls />
//                 </div>
//             }
//             {props.audio
//                 && <div className={s.commentMedia}>
//                     <audio src={props.audio} controls />
//                 </div>
//             }
//             <div className={s.commentsActions}>
//                 <div onClick={() => props.toggleCommentLike(props.commentId)}
//                     className={s.commentsActions__item}
//                 >
//                     <Heart
//                         width="20px"
//                         height="20px"
//                         color={props.liked ? "#888" : "#ab1414"}
//                     /> 
//                     <span>{props.likedUsers.length}</span>
//                 </div>
//                 <div
//                     className={s.commentsActions__item}
//                     onClick={() => props.isAnswerInput ? props.setAnswerInput(false) :props.setAnswerInput(true)}
//                 >
//                         <span>{props.isAnswerInput ? "Відмінити" : "Відповісти"}</span>
//                 </div>
//                 <div className={s.date}>{formatDate(props.created)}</div>
//             </div>
            
//         </div>
        
//     </div>
//     {props.isAnswerInput
//         && <div className={s2.commentsInput + " " + s.commentsInput}>
//                 <img src={props.authProfileData?.photos.small || avatar} alt="userPhoto" />
//                 <input placeholder="Напишіть коментар"
//                     value={props.currentCommentText} onChange={(e: any) => props.setCurrentCommentText(e.target.value)}
//                     onKeyDown={(e: any) => {
//                         if (e.keyCode === 13) {
//                             props.sendComment()
//                        }
    
//                     }}
//                 />
//                 <label className={s2.attachIcon} htmlFor="addFileCommentInput">
//                         <Attach width="30px" height="30px" />
//                     <input type="file" id="addFileCommentInput" onChange={(e: any) => {
//                                 props.setCommentFile(e.target.files[0])
//                             }}
//                     />
//                 </label>
//             <span className={s2.sendCommentButton} onClick={props.sendComment}></span>
//         </div>
        
//     }
//     </div >
// }