import { Button } from '../button/Button'
import s from './booleanDialogWindow.module.css'

type PropsType = {
    dialogInfo: string

    yesButtonHandler: (() => void) | null
    setDialogWindowActive: (isActive: boolean) => void
}

export const BooleanDialogWindow = (props: PropsType) => {

    const yesButtonHandler = () => {
        props.yesButtonHandler && props.yesButtonHandler()
        props.setDialogWindowActive(false)
    }

    return <div className={s.dialogWindowContainer}>
        <div className={s.dialogInfo}>{props.dialogInfo}</div>
        <div className={s.buttonsBlock}>
            <Button value={'Так'} onClick={yesButtonHandler} />
            <Button value={'Ні'} onClick={() => props.setDialogWindowActive(false)} />
        </div>
    </div>
}