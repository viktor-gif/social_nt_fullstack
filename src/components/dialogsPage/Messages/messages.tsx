
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
    setAsSpam: (dialogId: string, messageId: string) => void
    restoreFromSpam: (dialogId: string, messageId: string) => void
    setViewed: (dialogId: string, messageId: string, senderId: string) => void
}

export const Messages = React.memo((props: PropsPage) => {
    const [messagesMustDelete, setMustDeleteMessages] = useState<string[]>([])
    const [currentDialogInfo, setCurrentDialogInfo] = useState<ProfileDataType | null>(null)
    console.log(props.messages)
    useEffect(() => {

    }, [])

    const messagesItems = props.messages?.map(m => {
        return <Message messageId={m._id} key={m._id} senderId={m.sender}
            message={m.message} authProfileData={props.authProfileData}
            currentDialogInfo={props.currentDialogInfo} userProfileData={props.userProfileData}
            getProfile={props.getProfile} deleteMessage={props.deleteMessage}
            messagesMustDelete={messagesMustDelete} setMessageMustDelete={setMustDeleteMessages}
            isSpam={m.isSpam} setAsSpam={props.setAsSpam} restoreFromSpam={props.restoreFromSpam}
            isViewed={m.viewed} setViewed={props.setViewed} />
    })
    return <div className={s.messages}>
        <div className={s.messages__header}>
            {currentDialogInfo && <img src={currentDialogInfo.photos.small || avatar} alt="ava" />}
            {currentDialogInfo && <span>{currentDialogInfo?.fullName}</span>}
        </div>
        {messagesItems}
        <MessagesForm currentDialogInfo={props.currentDialogInfo}
            sendDialogMessage={props.sendDialogMessage} />
    </div>
})

