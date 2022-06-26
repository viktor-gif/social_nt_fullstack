
import { CurrentDialogInfoType, MessageType } from "../../../../ts/dialogs"
import s from "./message.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import React, { useEffect, useState } from "react"
import deleteIcon from "../../../../img/icons/delete-icon.png"
import { AuthDataType } from "../../../../ts/auth"
import { ProfileDataType } from "../../../../ts/profile"
import { getProfile } from "../../../../redux/profileReducer"

type PropsPage = {
    messageId: string
    senderId: string
    message: string
    key: string
    authProfileData: ProfileDataType | null
    currentDialogInfo: CurrentDialogInfoType | null
    userProfileData: ProfileDataType | null

    getProfile: (userId: string) => void
}

export const Message = React.memo((props: PropsPage) => {
    const senderIsAuthUser = props.authProfileData?._id === props.senderId
    const [isActiveMessageOptions, setActiveMessageOptions] = useState(false)
    const [isDeleteMenuActive, setDeleteMenuActive] = useState(false)

    useEffect(() => {
        if (!senderIsAuthUser && (props.userProfileData?._id !== props.senderId)) {
            props.getProfile(props.senderId)
        }
    }, [])

    const toggleMessageOptions = () => {
        isActiveMessageOptions ? setActiveMessageOptions(false) : setActiveMessageOptions(true)
    }
    const getDeletemenu = () => {
        setDeleteMenuActive(true)
        setActiveMessageOptions(false)
    }

    const userAvatar = senderIsAuthUser ? props.authProfileData?.photos.small : props.userProfileData?.photos.small
    const userName = senderIsAuthUser ? props.authProfileData?.fullName : props.userProfileData?.fullName
    return <div className={s.message__wrapper}>
        {!isDeleteMenuActive ?
            <div className={s.message + " " + (senderIsAuthUser ? s.message__auth : "")} key={props.messageId}>
                <div className={s.messageAvatar}>
                    <img src={userAvatar || avatar} alt="userPhoto" />
                </div>
                <div className={s.message__userName + " " + (senderIsAuthUser ? s.message__authName : "")}>{userName}</div>
                <div className={s.message__text + " " + (senderIsAuthUser ? s.message__textAuth : "")}>
                    {props.message}
                    <div className={s.message__menu + " " + (senderIsAuthUser ? s.message__menuAuth : "")}
                        onClick={toggleMessageOptions} >
                        <div className={s.message__menuDots}></div>
                    </div>
                    {isActiveMessageOptions &&
                        <div className={s.message__options + " " + (senderIsAuthUser ? s.message__optionsAuth : "")}>
                            <div onClick={getDeletemenu} className={s.message__options_item}>
                                <img src={deleteIcon} alt="del-icon" />
                                <span>Видалити</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            : <div className={s.message__deleteMenu}>
                <div className={s.message__deleteMenu_text}>Ви дійсно хочете видалити це повідомлення?</div>
                <div className={s.message__deleteMenu_buttons}>
                    <button>Так</button>
                    <button onClick={() => setDeleteMenuActive(false)}>Ні</button>
                </div>
            </div>
        }
    </div>
})

