import s from "./dialog.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import { ProfileDataType } from "../../../../ts/profile"
import { formatDate } from "../../../../utils/formatDate"
import { useEffect, useState } from "react"
import { profileAPI } from "../../../../api/profile"


type DialogPropsType = {
    dialogId: string
    created: string
    userId: string

    getDialogMessages: (dialogId: string) => void
    setCurrentDialogInfo: (dialogInfo: ProfileDataType | null) => void
    setCurrentDialogId: (dialogId: string) => void
}

export const Dialog = (props: DialogPropsType) => {
    const [dialogInfo, setDialogInfo] = useState<ProfileDataType | null>(null)
    useEffect(() => {
        profileAPI.getProfile(props.userId).then(res => {
            setDialogInfo(res.data)
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
                <span className={s.messageText}>lorem ipsum dolor amet</span>
            </div>
            <div className={s.dateBlock}>
                <span className={s.dialog__created}>{formatDate(props.created)}</span>
                <span className={s.newMessagesAmount}>30</span>
            </div>
            
        </div>
    )
}