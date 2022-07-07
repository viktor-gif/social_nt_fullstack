import React, { useState } from "react"
import s from "./comment.module.css"
import deleteIcon from "../../../../../img/icons/delete-icon.png"
import updateIcon from "../../../../../img/icons/update.png"
import copyIcon from "../../../../../img/icons/copy.png"
import { ProfileDataType } from "../../../../../ts/profile"
import heart from "../../../../../img/icons/heart.png"
import greyHeart from "../../../../../img/icons/heart_grey.png"
import { BurgerMenu } from "../../../../common/burgerMenu/burgerMenu"

type PropsType = {
    authorId: string
    authProfileData: ProfileDataType | null
    commentId: string
    commentText: string
    likedUsers: string[]

    deleteComment: (commentId: string) => void
    updateComment: (commentId: string, commentText: string) => void
    toggleCommentLike: (commentId: string) => void
}

export const Comment = React.memo((props: PropsType) => {
    const [isCommentMenuActive, setCommentMenuActive] = useState(false)
    const [isUpdateMode, setUpdateMode] = useState(false)
    const [currentCommentText, setCurrentCommentText] = useState(props.commentText)

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
            <div>{props.authorId}</div>
            <div>
                <span>{props.commentText}</span>
                <span onClick={() => props.toggleCommentLike(props.commentId)}>
                    <img className={s.commentItemPic} src={heart} />
                </span>
                <span>{props.likedUsers.length}</span>
            </div>
        </div>
})