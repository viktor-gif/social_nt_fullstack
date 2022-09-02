import { useState } from "react"
import { Attach } from "react-ionicons"
import { Button } from "../button/Button"

import s from "./updateMessage.module.css"

type PropsType = {
    message: string | null
    currentDialogId: string | null
    messageId: string
    file: any

    setMessageFile: (file: any) => void
    setCorrectMode: (correcting: boolean) => void
    updateMessage: (dialogId: string, messageId: string, message: string | null, file: any) => void
    getDialogMessages: (dialogId: string) => void
}

export const UpdateMessage = (props: PropsType) => {
    const [currentMessageText, setCurrentMessageText] = useState(props.message || '')

    const updateMessage = () => {
        {/* @ts-ignore */ }
        props.updateMessage(props.currentDialogId, props.messageId, currentMessageText, props.file)
        props.setCorrectMode(false)
        {/* @ts-ignore */}
        props.getDialogMessages(props.currentDialogId)
    }

    return <div className={s.updateMessage__Wrap}>
        <div className={s.inputsBlock}>
            <input className={s.textInput} type="text" value={currentMessageText} onChange={(e) => setCurrentMessageText(e.target.value)}
                onKeyDown={(e: any) => {
                    console.log(e.keyCode)
                    if (e.keyCode === 13) {
                        updateMessage()
                    }
                        
                }}/>
            <label htmlFor="messageFile" className={s.messageFile}>
                <Attach width="30px" height="30px" />
                <input type="file" id="messageFile" onChange={(e: any) => {
                    props.setMessageFile(e.target.files[0])
                    }}
                 />
            </label>
        </div>
        <div className={s.updateMessage__buttons}>
            <Button value="Зберегти зміни" onClick={updateMessage} size="nine" />
            <Button value="Відмднити" onClick={() => { props.setCorrectMode(false); console.log("gggggggggg") }} size="nine" />
        </div>
        
    </div>
}