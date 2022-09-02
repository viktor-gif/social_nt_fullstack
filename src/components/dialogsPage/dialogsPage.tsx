import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import {
    getDialogs, getDialogMessages,
    sendDialogMessage, deleteMessage,
    setAsSpam, restoreFromSpam,
    setViewed, updateMessage
} from "../../redux/dialogsReducer"
import { getProfile } from "../../redux/profileReducer"
import { AppStateType } from "../../redux/redux-store"
import { AuthDataType } from "../../ts/auth"
import { DialogType, MessageType } from "../../ts/dialogs"
import { ProfileDataType } from "../../ts/profile"
import { Dialogs } from "./dialogs/dialogs"
import s from "./dialogsPage.module.css"
import { Messages } from "./Messages/messages"

type PropsType = {
    dialogs: DialogType[] | null
    messages: MessageType[] | null
    isAuth: boolean
    authData: AuthDataType | null
    authProfileData: ProfileDataType | null
    userProfileData: ProfileDataType | null

    getProfile: (userId: string) => void
    getDialogs: () => void
    getDialogMessages: (dialogId: string | null) => void
    sendDialogMessage: (dialogId: string, message: string, file: any) => void
    deleteMessage: (dialogId: string, messageId: string) => void
    setAsSpam: (dialogId: string, messageId: string) => void
    restoreFromSpam: (dialogId: string, messageId: string) => void
    setViewed: (dialogId: string, messageId: string, senderId: string) => void
    updateMessage: (dialogId: string, messageId: string, message: string | null, file: any) => void
}

const DialogsPage = (props: PropsType) => {
    const [currentDialogInfo, setCurrentDialogInfo] = useState<ProfileDataType | null>(null)
    const [currentDialogId, setCurrentDialogId] = useState<string | null>(null)
    const [isSpamMode, setSpamMode] = useState(false)

    useEffect(() => {
        props.getDialogs()
    }, [])
    if (!props.isAuth) return <Navigate replace to="/login" />
    return <div className={s.dialogsPage}>
        <Dialogs dialogs={props.dialogs} getDialogMessages={props.getDialogMessages}
            authProfileData={props.authProfileData} setCurrentDialogInfo={setCurrentDialogInfo}
            setCurrentDialogId={setCurrentDialogId} setSpamMode={setSpamMode}
            isSpamMode={isSpamMode} />
        <Messages messages={props.messages}
            sendDialogMessage={props.sendDialogMessage} authData={props.authData}
            authProfileData={props.authProfileData} userProfileData={props.userProfileData}
            getProfile={props.getProfile} deleteMessage={props.deleteMessage}
            setAsSpam={props.setAsSpam} restoreFromSpam={props.restoreFromSpam}
            setViewed={props.setViewed} currentDialogInfo={currentDialogInfo}
            currentDialogId={currentDialogId} getDialogMessages={props.getDialogMessages}
            isSpamMode={isSpamMode} updateMessage={props.updateMessage} />
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    isAuth: state.auth.isAuth,
    authData: state.auth.authData,
    authProfileData: state.auth.authProfileData,
    userProfileData: state.profilePage.profileData
})

export default connect(mapStateToProps, {
    getDialogs,
    getDialogMessages,
    sendDialogMessage,
    getProfile,
    deleteMessage,
    setAsSpam,
    restoreFromSpam,
    setViewed,
    updateMessage
})(DialogsPage)

