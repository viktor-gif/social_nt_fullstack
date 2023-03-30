import { Attach } from "react-ionicons"
import { Button } from "../button/Button"

import s from "./updateMessage.module.css"

type PropsType = {
    currentText: string

    setFile: (file: any) => void
    resetUpdate: () => void

    update: () => void
    setCurrentText: (text: string) => void
}

export const UpdateMessage = (props: PropsType) => {

    return <div className={s.updateMessage__Wrap}>
        <div className={s.inputsBlock}>
            <input className={s.textInput} type="text" value={props.currentText} onChange={(e) => props.setCurrentText(e.target.value)}
                onKeyDown={(e: any) => {
                    console.log(e.keyCode)
                    if (e.keyCode === 13) {
                        props.update()
                    }
                        
                }}/>
            <label htmlFor="messageFile" className={s.messageFile}>
                <Attach width="30px" height="30px" />
                <input type="file" id="messageFile" onChange={(e: any) => {
                    props.setFile(e.target.files[0])
                    }}
                 />
            </label>
        </div>
        <div className={s.updateMessage__buttons}>
            <Button value="Зберегти зміни" onClick={props.update} size="nine" />
            <Button value="Відмднити" onClick={props.resetUpdate} size="nine" />
        </div>
        
    </div>
}