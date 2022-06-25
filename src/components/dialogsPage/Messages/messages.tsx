
import { CurrentDialogInfoType, MessageType } from "../../../ts/dialogs"
import s from "./messages.module.css"
import { MessagesForm } from "./messagesForm"
import avatar from "../../../img/ava_male.jpeg"
import { useEffect } from "react"
import deleteIcon from "../../../img/icons/delete-icon.png"
import { AuthDataType } from "../../../ts/auth"
import { ProfileDataType } from "../../../ts/profile"

type PropsPage = {
    messages: MessageType[] | null
    currentDialogInfo: CurrentDialogInfoType | null
    authData: AuthDataType | null
    authProfileData: ProfileDataType | null

    sendDialogMessage: (dialogId: string, userName: string, userImg: string | null, message: string) => void
}

export const Messages = (props: PropsPage) => {
    console.log(props.authProfileData)
    const messagesItems = props.messages?.map(m => {

        return <div className={s.messages__item} key={m._id}>
            <div className={s.messageAvatar}>
                <img src={props.currentDialogInfo?.userImg || avatar} alt="userPhoto" />
                <span>{props.currentDialogInfo?.userName}</span>
            </div>
            <div className={s.messages__text}>{m.message}</div>
            <img src={deleteIcon} className={s.messages__deleteIcon} />
        </div>
    })
    console.log(props.currentDialogInfo)
    return <div className={s.messages}>
        <h3>{props.currentDialogInfo?.userName}</h3>
        {messagesItems}
        <MessagesForm currentDialogInfo={props.currentDialogInfo}
            sendDialogMessage={props.sendDialogMessage} />
    </div>
}

