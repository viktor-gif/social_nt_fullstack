
import { DialogType } from "../../../ts/dialogs"
import s from "./dialogs.module.css"
import avatar from "../../../img/ava_male.jpeg"

type PropsType = {
    dialogs: DialogType[] | null
    getDialogMessages: (dialogId: string, userName: string, userImg: string | null) => void
}

export const Dialogs = (props: PropsType) => {
    const dialogsItems = props.dialogs?.map(d => {
        return <div className={s.dialogs__item} key={d.dialogId}>
            <div className={s.dialogs__avatar} onClick={() => props.getDialogMessages(d.dialogId, d.userName, d.userImgUrl)}>
                <img className={s.dialogs__pic} src={d.userImgUrl || avatar} alt="userAvatar" />
            </div>
            <div className={s.dialogs__avatar}>{d.userId}</div>
            <div className={s.dialogs__userName}>{d.userName}</div>
            <div className={s.dialogs__created}>{d.created}</div>
            <hr />
        </div>
    })
    return <div className={s.dialogs}>
        {dialogsItems}
    </div>
}