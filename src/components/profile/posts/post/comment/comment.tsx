import React, { useEffect, useState } from "react"
import { DocumentText, Heart } from "react-ionicons"
import s from "./comment.module.css"
import deleteIcon from "../../../../../img/icons/delete-icon.png"
import updateIcon from "../../../../../img/icons/update.png"
import copyIcon from "../../../../../img/icons/copy.png"
import { ProfileDataType } from "../../../../../ts/profile"
import { BurgerMenu } from "../../../../common/burgerMenu/burgerMenu"
import { profileAPI } from "../../../../../api/profile"
import avatar from "../../../../../img/ava_male.jpeg"
import { formatDate } from "../../../../../utils/formatDate"

type PropsType = {
    authorId: string
    authProfileData: ProfileDataType | null
    commentId: string
    commentText: string
    likedUsers: string[]
    created: string

    deleteComment: (commentId: string) => void
    updateComment: (commentId: string, commentText: string) => void
    toggleCommentLike: (commentId: string) => void
}

export const Comment = React.memo((props: PropsType) => {
    const [isCommentMenuActive, setCommentMenuActive] = useState(false)
    const [isUpdateMode, setUpdateMode] = useState(false)
    const [currentCommentText, setCurrentCommentText] = useState(props.commentText)
    const [commentatorProfileData, setCommentatorProfileData] = useState<ProfileDataType | null>(null)

    const authIsAuthorOfComment = props.authorId === props.authProfileData?._id

    useEffect(() => {
        if (!authIsAuthorOfComment) {
            profileAPI.getProfile(props.authorId).then(res => {
                setCommentatorProfileData(res.data)
            })
        }
    }, [])

    if (isUpdateMode) {
        return <div className={s.changeCommentForm}>
            <input type='text' value={currentCommentText}
                onChange={(e: any) => setCurrentCommentText(e.target.value)} />
            <div className={s.changeCommentForm_submit}>
                <button onClick={() => {
                    props.updateComment(props.commentId, currentCommentText)
                    setUpdateMode(false)
                }}>Застосувати зміни</button>
            </div>
        </div>
    }

    const liked = props.likedUsers.includes(props.authProfileData?._id || '')

    return <div className={s.commentItem}>

            {isCommentMenuActive && <div className={s.postMenu + " " + s.postMenu__comments}>
            {props.authorId === props.authProfileData?._id
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
                props.authorId === props.authProfileData?._id
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
            <div className={s.commentText}>
                <span>{props.commentText}</span>
            </div>
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
                >
                    <span>Відповісти</span>
                </div>
                <div className={s.date}>{formatDate(props.created)}</div>
            </div>
            
        </div>
    </div>
})