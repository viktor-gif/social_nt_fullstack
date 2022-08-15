import s from "./dialog.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import { ProfileDataType } from "../../../../ts/profile"
import { formatDate } from "../../../../utils/formatDate"
import { useEffect, useState } from "react"
import { profileAPI } from "../../../../api/profile"
import { dialogsAPI } from "../../../../api/dialogs"


type DialogPropsType = {
    dialogId: string
    created: string
    userId: string
    authProfileData: ProfileDataType | null

    getDialogMessages: (dialogId: string) => void
    setCurrentDialogInfo: (dialogInfo: ProfileDataType | null) => void
    setCurrentDialogId: (dialogId: string) => void
}

export const Dialog = (props: DialogPropsType) => {
    const [dialogInfo, setDialogInfo] = useState<ProfileDataType | null>(null)
    const [lastMessageInDialog, setLastMessageInDialog] = useState('Повідомлень немає')
    const [lastMessageDate, setLastMessageDate] = useState(props.created)
    const [newMessagesAmount, setNewMessagesAmount] = useState(0)

    useEffect(() => {
        profileAPI.getProfile(props.userId).then(res => {
            setDialogInfo(res.data)
        })
        dialogsAPI.getDialogMessages(props.dialogId).then(res => {
            // console.log(res.data)
            const newMessagesLength = res.data.filter((m: any) => m.viewed === false && (m.sender !== props.authProfileData?._id)).length
               
            res.data.length > 0 && setLastMessageInDialog(res.data[res.data.length - 1].message)
            res.data.length > 0 && setLastMessageDate(res.data[res.data.length - 1].created)
            newMessagesLength !== 0 && setNewMessagesAmount(newMessagesLength)
        })
    }, [])
    const getDialogMessages = () => {
        props.getDialogMessages(props.dialogId)
        props.setCurrentDialogId(props.dialogId)
        profileAPI.getProfile(props.userId).then(res => {
            props.setCurrentDialogInfo(res.data)
        })
    }
    return (
        <div className={s.dialog} onClick={getDialogMessages}>
            <div className={s.dialog__avatar} >
                <img className={s.dialog__pic} src={dialogInfo?.photos.small || avatar} alt="userAvatar" />
            </div>
            <div className={s.nameBlock}>
                <span className={s.userName}>{dialogInfo?.fullName}</span>
                <span className={s.messageText}>{
                    lastMessageInDialog.length > 18
                        ? lastMessageInDialog.slice(0, 18) + "..."
                        : lastMessageInDialog
                }</span>
            </div>
            <div className={s.dateBlock}>
                <span className={s.dialog__created + " " + (newMessagesAmount > 0 && s.dialog__createdNewMessages)}>{formatDate(lastMessageDate)}</span>
                {newMessagesAmount > 0
                    && <span className={s.newMessagesAmount}>{newMessagesAmount < 100 ? newMessagesAmount : "99+"}</span>
                }
            </div>
            
        </div>
    )
}