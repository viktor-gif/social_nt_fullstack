
import { DialogType } from "../../../ts/dialogs"
import s from "./dialogs.module.css"
import avatar from "../../../img/ava_male.jpeg"
import { ProfileDataType } from "../../../ts/profile"
import { Dialog } from "./dialog/dialog"

type PropsType = {
    dialogs: DialogType[] | null
    authProfileData: ProfileDataType | null

    getDialogMessages: (dialogId: string) => void
    setCurrentDialogInfo: (dialogInfo: ProfileDataType | null) => void
    setCurrentDialogId: (dialogId: string) => void
}

export const Dialogs = (props: PropsType) => {


    const dialogsItems = props.dialogs?.map(d => {

        return <Dialog key={d.dialogId} userId={d.userId} dialogId={d.dialogId} created={d.created}
            getDialogMessages={props.getDialogMessages} setCurrentDialogInfo={props.setCurrentDialogInfo}
            setCurrentDialogId={props.setCurrentDialogId} />
    })
    return <div className={s.dialogs}>
        <div className={s.dialogs__head}>
            <img src={props.authProfileData?.photos.small || avatar} alt="ava" />
        </div>
        <div className={s.dialogs__items}>
            {dialogsItems}
        </div>
    </div>
}