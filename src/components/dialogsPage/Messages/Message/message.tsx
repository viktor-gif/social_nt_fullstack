
import s from "./message.module.css"
import React, { useEffect, useState } from "react"
import spamIcon from "../../../../img/icons/spam-icon.png"
import { ProfileDataType } from "../../../../ts/profile"
import { BurgerMenu } from "../../../common/burgerMenu/burgerMenu"
import { formatDate } from "../../../../utils/formatDate"
import { CheckmarkDone, Trash } from "react-ionicons"

type PropsType = {
    messageId: string
    senderId: string
    message: string | null
    image: string | null
    video: string | null
    audio: string | null
    key: string
    authProfileData: ProfileDataType | null
    userProfileData: ProfileDataType | null
    isSpam: boolean
    isViewed: boolean
    currentDialogId: string | null
    created: string

    getProfile: (userId: string) => void
    deleteMessage: (dialogId: string, messageId: string) => void
    setAsSpam: (dialogId: string, messageId: string) => void
    restoreFromSpam: (dialogId: string, messageId: string) => void
    setViewed: (dialogId: string, messageId: string, senderId: string) => void
    getDialogMessages: (dialogId: string) => void
}


export const Message = React.memo((props: PropsType) => {
    const senderIsAuthUser = props.authProfileData?._id === props.senderId
    const [isActiveMessageOptions, setActiveMessageOptions] = useState(false)
    const [isDeleteMenuActive, setDeleteMenuActive] = useState(false)
    
    const [messageMustDelete, setMessageMustDelete] = useState(false)
    const [isBurgerVisible, setBurgerVisible] = useState(false)
    console.log(messageMustDelete)
    const cleanup = () => {
        console.log(messageMustDelete)
            if (messageMustDelete) {
               debugger
                {/* @ts-ignore */ }
                props.deleteMessage(props.currentDialogId, props.messageId)
                // props.setMessageMustDelete(props.messagesMustDelete.filter(item => item !== props.messageId))
                // props.setMustDeleteMessages([])
                
            }
    }
    useEffect(() => {
        if (!senderIsAuthUser && (props.userProfileData?._id !== props.senderId)) {
            props.getProfile(props.senderId)
        }
        return () => {
            cleanup()
        }
    }, [])
    useEffect(() => {
        if (props.senderId !== props.authProfileData?._id && !props.isViewed) {
            // @ts-ignore
            props.setViewed(props.currentDialogId, props.messageId, props.senderId)
        }
    }, [])

    const toggleMessageOptions = () => {
        if (isActiveMessageOptions) {
            setActiveMessageOptions(false)
            setBurgerVisible(false)
        } else {
            setActiveMessageOptions(true)
            setBurgerVisible(true)
        }
    }
    const getDeletemenu = () => {
        setDeleteMenuActive(true)
        setActiveMessageOptions(false)
    }
    const toggleSpam = () => {
        if (props.isSpam) {
            // @ts-ignore
            props.restoreFromSpam(props.currentDialogId, props.messageId)
        } else {
            // @ts-ignore
            props.setAsSpam(props.currentDialogId, props.messageId)
        }
        setActiveMessageOptions(false)
        props.currentDialogId && props.getDialogMessages(props.currentDialogId)
    }

    if (messageMustDelete) {
        return <div className={s.message__deleted}>
            <span>Повідомлення видалено</span>
            <div className={s.message__restoreButton}>
                <button onClick={() => {
                    setMessageMustDelete(false)
                    setDeleteMenuActive(false)
                }
                }>Відновити</button>
            </div>
        </div>
    }

    return <div className={s.message__wrapper}>
        {!isDeleteMenuActive ?
            <div className={s.message + " " + (senderIsAuthUser ? s.message__auth : "")} key={props.messageId}>
                <div className={s.message__textBlock + " " + (senderIsAuthUser ? s.message__textBlockAuth : "")}>
                    {props.message
                        && <span className={s.message__text}>{props.message}</span>
                    }
                    {props.image
                        && <div className={s.mediaItem}>
                            <img src={props.image} alt="mesImg" />
                        </div>
                    }
                    {props.video
                        && <div>
                            <video src={props.video} controls />
                        </div>
                    }
                    {props.audio
                        && <div>
                            <audio src={props.audio} controls />
                        </div>
                    }
                    <span className={s.message__created}>{formatDate(props.created)}</span>
                    <div className={s.message__burger + " " + (senderIsAuthUser ? s.message__authBurger : "") + " " + (isBurgerVisible ? s.setVisible : "")}>
                        <BurgerMenu burgerClick={toggleMessageOptions} />
                        {isActiveMessageOptions &&
                            <div className={s.message__options + " " + (senderIsAuthUser ? s.message__optionsAuth : "")}>
                                <div onClick={getDeletemenu} className={s.message__options_item}>
                                    <Trash width="20px" height="20px" color="red" />
                                    <span>Видалити</span>
                                </div>
                                <div onClick={toggleSpam} className={s.message__options_item}>
                                    <img src={spamIcon} alt="spam-icon" />
                                    <span>{props.isSpam ? "Вилучити зі спаму" : "Вважати спамом"}</span>
                                </div>
                            </div>
                        }
                    </div>
                    
                    {props.isViewed
                        && <div className={s.message__viewed + " " + (senderIsAuthUser ? s.message__viewedAuth : "")}>
                                <CheckmarkDone
                                    width='20px'
                                    height='20px'
                                    color='#888'
                                />
                            </div>
                    }
                </div>
            </div>
            :
            <div className={s.message__deleteMenu}>
                <div className={s.message__deleteMenu_text}>Ви дійсно хочете видалити це повідомлення?</div>
                <div className={s.message__deleteMenu_buttons}>
                    
                    <button onClick={() => {
                        setMessageMustDelete(true)
                        {/* @ts-ignore */}
                        props.deleteMessage(props.currentDialogId, props.messageId)
                    }
                    }>Так</button>
                    <button onClick={() => setDeleteMenuActive(false)}>Ні</button>
                </div>
            </div>
        }
    </div>
})

