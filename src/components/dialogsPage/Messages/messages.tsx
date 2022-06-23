
import { CurrentDialogInfoType, MessageType } from "../../../ts/dialogs"
import s from "./messages.module.css"
import { MessagesForm } from "./messagesForm"

type PropsPage = {
    messages: MessageType[] | null
    currentDialogInfo: CurrentDialogInfoType | null
    sendDialogMessage: (dialogId: string, userName: string, message: string) => void
}

export const Messages = (props: PropsPage) => {
    const messagesItems = props.messages?.map(m => {
        return <div className={s.messages__item} key={m._id}>
            <div className={s.messages__text}>{m.message}</div>
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

