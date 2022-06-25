import { useEffect } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { getDialogs, getDialogMessages, sendDialogMessage } from "../../redux/dialogsReducer"
import { AppStateType } from "../../redux/redux-store"
import { AuthDataType } from "../../ts/auth"
import { CurrentDialogInfoType, DialogType, MessageType } from "../../ts/dialogs"
import { ProfileDataType } from "../../ts/profile"
import { Dialogs } from "./dialogs/dialogs"
import s from "./dialogsPage.module.css"
import { Messages } from "./Messages/messages"

type PropsType = {
    dialogs: DialogType[] | null
    messages: MessageType[] | null
    currentDialogInfo: CurrentDialogInfoType | null
    isAuth: boolean
    authData: AuthDataType | null
    authProfileData: ProfileDataType | null

    getDialogs: () => void
    getDialogMessages: (dialogId: string, userName: string, userImg: string | null) => void
    sendDialogMessage: (dialogId: string, userName: string, userImg: string | null, message: string) => void
}

const DialogsPage = (props: PropsType) => {
    useEffect(() => {
        props.getDialogs()
    }, [])

    if (!props.isAuth) return <Navigate replace to="/login" />
    return <div className={s.dialogsPage}>
        <Dialogs dialogs={props.dialogs} getDialogMessages={props.getDialogMessages} />
        <Messages messages={props.messages} currentDialogInfo={props.currentDialogInfo}
            sendDialogMessage={props.sendDialogMessage} authData={props.authData}
            authProfileData={props.authProfileData} />
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    currentDialogInfo: state.dialogsPage.currentDialogInfo,
    isAuth: state.auth.isAuth,
    authData: state.auth.authData,
    authProfileData: state.auth.authProfileData
})

export default connect(mapStateToProps, {
    getDialogs,
    getDialogMessages,
    sendDialogMessage,
})(DialogsPage)