import { EllipsisVertical } from "react-ionicons"
import { DialogType } from "../../../ts/dialogs"
import s from "./dialogs.module.css"
import avatar from "../../../img/ava_male.jpeg"
import { ProfileDataType } from "../../../ts/profile"
import { Dialog } from "./dialog/dialog"
import { useState } from "react"

type PropsType = {
    dialogs: DialogType[] | null
    authProfileData: ProfileDataType | null
    isSpamMode: boolean

    getDialogMessages: (dialogId: string | null) => void
    setCurrentDialogInfo: (dialogInfo: ProfileDataType | null) => void
    setCurrentDialogId: (dialogId: string) => void
    setSpamMode: (isSpam: boolean) => void
}

export const Dialogs = (props: PropsType) => {
    
    const [isDialogsMenu, setDialogsmenu] = useState(false)

    const dialogsItems = props.dialogs?.map(d => {

        return <Dialog key={d.dialogId} userId={d.userId} dialogId={d.dialogId} created={d.created}
            getDialogMessages={props.getDialogMessages} setCurrentDialogInfo={props.setCurrentDialogInfo}
            setCurrentDialogId={props.setCurrentDialogId} authProfileData={props.authProfileData} />
    })
    const toggleSpamMode = () => {
        props.isSpamMode ? props.setSpamMode(false) : props.setSpamMode(true)
    }
    return <div className={s.dialogs}>
        <div className={s.dialogs__head}>
            <img src={props.authProfileData?.photos.small || avatar} alt="ava" />
            <span className={s.menuIcon} onClick={() => isDialogsMenu ? setDialogsmenu(false) : setDialogsmenu(true)}>
                <EllipsisVertical width="25px" height="25px" color="#555" />
                {isDialogsMenu
                    && <ul className={s.dialogs__menu}>
                        <li onClick={toggleSpamMode}>
                            {props.isSpamMode ? "Всі повідомлення" : "Спам"}
                        </li>
                    </ul>
                }
            </span>
        </div>
        <div className={s.dialogs__items}>
            {dialogsItems}
        </div>
    </div>
}