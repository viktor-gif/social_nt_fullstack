
import { MessageType } from "../../../ts/dialogs"
import s from "./messages.module.css"
import { MessagesForm } from "./messagesForm"
import avatar from "../../../img/ava_male.jpeg"
import React, { useEffect, useState } from "react"
import { AuthDataType } from "../../../ts/auth"
import { ProfileDataType } from "../../../ts/profile"
import { Message } from "./Message/message"

type PropsPage = {
    messages: MessageType[] | null
    authData: AuthDataType | null
    authProfileData: ProfileDataType | null
    userProfileData: ProfileDataType | null
    currentDialogInfo: ProfileDataType | null
    currentDialogId: string | null

    getProfile: (userId: string) => void
    sendDialogMessage: (dialogId: string, message: string) => void
    deleteMessage: (dialogId: string, messageId: string) => void
    setAsSpam: (dialogId: string, messageId: string) => void
    restoreFromSpam: (dialogId: string, messageId: string) => void
    setViewed: (dialogId: string, messageId: string, senderId: string) => void
}

export const Messages = React.memo((props: PropsPage) => {
    const [messagesMustDelete, setMustDeleteMessages] = useState<string[]>([])
    console.log(props.messages)
    useEffect(() => {

    }, [])

    const messagesItems = props.messages?.map(m => {
        return <Message messageId={m._id} key={m._id} senderId={m.sender}
            message={m.message} authProfileData={props.authProfileData}
            userProfileData={props.userProfileData}
            getProfile={props.getProfile} deleteMessage={props.deleteMessage}
            messagesMustDelete={messagesMustDelete} setMessageMustDelete={setMustDeleteMessages}
            isSpam={m.isSpam} setAsSpam={props.setAsSpam} restoreFromSpam={props.restoreFromSpam}
            isViewed={m.viewed} setViewed={props.setViewed} currentDialogId={props.currentDialogId} />
    })
    return <div className={s.messages}>
        <div className={s.messages__header}>
            {props.currentDialogInfo && <img src={props.currentDialogInfo.photos.small || avatar} alt="ava" />}
            {props.currentDialogInfo && <span>{props.currentDialogInfo?.fullName}</span>}
        </div>
        {messagesItems}
        <MessagesForm currentDialogInfo={props.currentDialogInfo}
            sendDialogMessage={props.sendDialogMessage}  currentDialogId={props.currentDialogId} />
    </div>
})

