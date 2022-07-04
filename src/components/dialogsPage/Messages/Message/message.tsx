
import { CurrentDialogInfoType, MessageType } from "../../../../ts/dialogs"
import s from "./message.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import React, { useEffect, useState } from "react"
import deleteIcon from "../../../../img/icons/delete-icon.png"
import spamIcon from "../../../../img/icons/spam-icon.png"
import viewedIcon from "../../../../img/icons/check-mark-5291043.png"
import { AuthDataType } from "../../../../ts/auth"
import { ProfileDataType } from "../../../../ts/profile"
import { getProfile } from "../../../../redux/profileReducer"
import { BurgerMenu } from "../../../common/burgerMenu/burgerMenu"

type PropsPage = {
    messageId: string
    senderId: string
    message: string
    key: string
    authProfileData: ProfileDataType | null
    currentDialogInfo: CurrentDialogInfoType | null
    userProfileData: ProfileDataType | null
    messagesMustDelete: string[]
    isSpam: boolean
    isViewed: boolean

    getProfile: (userId: string) => void
    deleteMessage: (dialogId: string, messageId: string) => void
    setMessageMustDelete: (messagesIds: string[]) => void
    setAsSpam: (dialogId: string, messageId: string) => void
    restoreFromSpam: (dialogId: string, messageId: string) => void
    setViewed: (dialogId: string, messageId: string, senderId: string) => void
}

export const Message = React.memo((props: PropsPage) => {
    const senderIsAuthUser = props.authProfileData?._id === props.senderId
    const [isActiveMessageOptions, setActiveMessageOptions] = useState(false)
    const [isDeleteMenuActive, setDeleteMenuActive] = useState(false)
    
    const [messageMustDelete, setMessageMustDelete] = useState(false)

    useEffect(() => {
        if (!senderIsAuthUser && (props.userProfileData?._id !== props.senderId)) {
            props.getProfile(props.senderId)
        }
        return () => {
            
            if (props.messagesMustDelete.includes(props.messageId)) {
                
                {/* @ts-ignore */ }
                props.deleteMessage(props.currentDialogInfo?.dialogId, props.messageId)
                //props.setMessageMustDelete(props.messagesMustDelete.filter(item => item !== props.messageId))
                props.setMessageMustDelete([])
                
            }
            
        }
    }, [])
    useEffect(() => {
        if (props.senderId !== props.authProfileData?._id && !props.isViewed) {
            // @ts-ignore
            props.setViewed(props.currentDialogInfo?.dialogId, props.messageId, props.senderId)
        }
    }, [])
    console.log(props.messagesMustDelete)

    const toggleMessageOptions = () => {
        isActiveMessageOptions ? setActiveMessageOptions(false) : setActiveMessageOptions(true)
    }
    const getDeletemenu = () => {
        setDeleteMenuActive(true)
        setActiveMessageOptions(false)
    }
    const toggleSpam = () => {
        if (props.isSpam) {
            // @ts-ignore
            props.restoreFromSpam(props.currentDialogInfo?.dialogId, props.messageId)
        } else {
            // @ts-ignore
            props.setAsSpam(props.currentDialogInfo?.dialogId, props.messageId)
        }
        setActiveMessageOptions(false)
    }

    const userAvatar = senderIsAuthUser ? props.authProfileData?.photos.small : props.userProfileData?.photos.small
    const userName = senderIsAuthUser ? props.authProfileData?.fullName : props.userProfileData?.fullName

    if (messageMustDelete) {
        return <div className={s.message__deleted}>
            <span>Повідомлення видалено</span>
            <div className={s.message__restoreButton}>
                <button onClick={() => {
                    setMessageMustDelete(false)
                    setDeleteMenuActive(false)
                    props.setMessageMustDelete(props.messagesMustDelete.filter(item => item !== props.messageId))
                }
                }>Відновити</button>
            </div>
        </div>
    }

    return <div className={s.message__wrapper}>
        {!isDeleteMenuActive ?
            <div className={s.message + " " + (senderIsAuthUser ? s.message__auth : "")} key={props.messageId}>
                <div className={s.messageAvatar}>
                    <img src={userAvatar || avatar} alt="userPhoto" />
                </div>
                <div className={s.message__userName + " " + (senderIsAuthUser ? s.message__authName : "")}>{userName}</div>
                <div className={s.message__text + " " + (senderIsAuthUser ? s.message__textAuth : "")}>
                    {props.message}
                    <div className={(senderIsAuthUser ? s.message__authBurger : "")}>
                        <BurgerMenu burgerClick={toggleMessageOptions} />
                    </div>
                    {isActiveMessageOptions &&
                        <div className={s.message__options + " " + (senderIsAuthUser ? s.message__optionsAuth : "")}>
                            <div onClick={getDeletemenu} className={s.message__options_item}>
                                <img src={deleteIcon} alt="del-icon" />
                                <span>Видалити</span>
                            </div>
                            <div onClick={toggleSpam} className={s.message__options_item}>
                                <img src={spamIcon} alt="spam-icon" />
                                <span>{props.isSpam ? "Вилучити зі спаму" : "Вважати спамом"}</span>
                            </div>
                        </div>
                    }
                    {props.isViewed && <img className={s.message__viewed + " " + (senderIsAuthUser ? s.message__viewedAuth : "")} src={viewedIcon} alt="Viewed" />}
                    {props.isSpam && <div className={s.spam}>SPAM</div>}
                </div>
            </div>
            :
            <div className={s.message__deleteMenu}>
                <div className={s.message__deleteMenu_text}>Ви дійсно хочете видалити це повідомлення?</div>
                <div className={s.message__deleteMenu_buttons}>
                    {/* @ts-ignore */}
                    <button onClick={() => {
                        setMessageMustDelete(true)
                        props.setMessageMustDelete(props.messagesMustDelete.concat(props.messageId))
                    }
                    }>Так</button>
                    <button onClick={() => setDeleteMenuActive(false)}>Ні</button>
                </div>
            </div>
        }
    </div>
})

