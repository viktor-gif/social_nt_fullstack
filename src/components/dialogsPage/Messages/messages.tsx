
import { MessageType } from "../../../ts/dialogs"
import s from "./messages.module.css"
import { MessagesForm } from "./messagesForm"
import avatar from "../../../img/ava_male.jpeg"
import React from "react"
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
    isSpamMode: boolean

    getProfile: (userId: string) => void
    sendDialogMessage: (dialogId: string, message: string, file: any) => void
    deleteMessage: (dialogId: string, messageId: string) => void
    setAsSpam: (dialogId: string, messageId: string) => void
    restoreFromSpam: (dialogId: string, messageId: string) => void
    setViewed: (dialogId: string, messageId: string, senderId: string) => void
    getDialogMessages: (dialogId: string) => void
}

export const Messages = React.memo((props: PropsPage) => {
    const messagesItems = props.messages
        ?.filter(m => props.isSpamMode ? m.isSpam : !m.isSpam)
        .map(m => {
        return <Message messageId={m._id} key={m._id} senderId={m.sender}
            message={m.message}
            image={m.image} video={m.video} audio={m.audio}
            authProfileData={props.authProfileData}
            userProfileData={props.userProfileData}
            getProfile={props.getProfile} deleteMessage={props.deleteMessage}
            isSpam={m.isSpam} setAsSpam={props.setAsSpam} restoreFromSpam={props.restoreFromSpam}
            isViewed={m.viewed} setViewed={props.setViewed} currentDialogId={props.currentDialogId}
            created={m.created} getDialogMessages={props.getDialogMessages} />
    })
    return <div className={s.messages__wrap}>
        <div className={s.messages__header}>
            {props.currentDialogInfo
                ? <div className={s.header__yesOrNotDialog}>
                    <img src={props.currentDialogInfo.photos.small || avatar} alt="ava" />
                    <span className={s.header__mainInfo}>
                        <span className={s.header__fullName}>{props.currentDialogInfo?.fullName}</span>
                        <span className={s.header__onlineIndicator}>online</span>
                    </span>
                </div>
                :
                <div className={s.header__yesOrNotDialog}>
                    <span className={s.header__mainInfo + " " + s.header__chooseDialog}>Виберіть співрозмовника</span>
                </div>
            }
        </div>
        <div className={s.messages}>
            {props.isSpamMode && <h3 className={s.spamTitle}>Спам</h3>}
            {messagesItems}
        {props.currentDialogInfo
            ? <div className={s.messagesForm}>
                <MessagesForm currentDialogInfo={props.currentDialogInfo}
                    sendDialogMessage={props.sendDialogMessage} currentDialogId={props.currentDialogId} />
            </div>
            :
            <div className={s.noChousenDialogText}>Тут можуть бути повідомлення вашого діалогу</div>
        }
        </div>
    </div>
})

