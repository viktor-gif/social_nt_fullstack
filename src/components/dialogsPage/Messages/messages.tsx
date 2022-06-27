
import { CurrentDialogInfoType, MessageType } from "../../../ts/dialogs"
import s from "./messages.module.css"
import { MessagesForm } from "./messagesForm"
import avatar from "../../../img/ava_male.jpeg"
import React, { useEffect, useState } from "react"
import deleteIcon from "../../../img/icons/delete-icon.png"
import { AuthDataType } from "../../../ts/auth"
import { ProfileDataType } from "../../../ts/profile"
import { Message } from "./Message/message"

type PropsPage = {
    messages: MessageType[] | null
    currentDialogInfo: CurrentDialogInfoType | null
    authData: AuthDataType | null
    authProfileData: ProfileDataType | null
    userProfileData: ProfileDataType | null

    getProfile: (userId: string) => void
    sendDialogMessage: (dialogId: string, userName: string, userImg: string | null, message: string) => void
    deleteMessage: (dialogId: string, messageId: string) => void
}

export const Messages = React.memo((props: PropsPage) => {
    const [messagesMustDelete, setMustDeleteMessages] = useState<string[]>([])

    const messagesItems = props.messages?.map(m => {
        return <Message messageId={m._id} key={m._id} senderId={m.sender}
            message={m.message} authProfileData={props.authProfileData}
            currentDialogInfo={props.currentDialogInfo} userProfileData={props.userProfileData}
            getProfile={props.getProfile} deleteMessage={props.deleteMessage}
            messagesMustDelete={messagesMustDelete} setMessageMustDelete={setMustDeleteMessages} />
    })
    return <div className={s.messages}>
        <h3>{props.currentDialogInfo?.userName}</h3>
        {messagesItems}
        <MessagesForm currentDialogInfo={props.currentDialogInfo}
            sendDialogMessage={props.sendDialogMessage} />
    </div>
})

