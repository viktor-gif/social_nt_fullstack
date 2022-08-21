
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import { Attach } from "react-ionicons"
import { ProfileDataType } from "../../../ts/profile"
import s from "./messages.module.css"

type PropsPage = {
  currentDialogId: string | null
  currentDialogInfo: ProfileDataType | null
    
  sendDialogMessage: (dialogId: string, message: string, file: any) => void
}

export const MessagesForm = (props: PropsPage) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageFile, setMessageFile] = useState(null)
    return <Formik
       initialValues={{ textMessage: currentMessage }}
        onSubmit={(val) => {
        //    @ts-ignore
          props.sendDialogMessage(props.currentDialogId, currentMessage, messageFile)
          setCurrentMessage('')
       }}
     >
       {({ isSubmitting }) => (
         <Form className={s.formikMessagesForm}>
          <Field type="text" name="textMessage" component="input" value={currentMessage} onChange={(e: any) => setCurrentMessage(e.target.value)}
            placeholder="Відправити повідомлення"
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                console.log(messageFile)
                //    @ts-ignore
                props.sendDialogMessage(props.currentDialogId, currentMessage, messageFile)
                setCurrentMessage('')
            
              }
            }}
          />
          <div>
            <label htmlFor="messageFile" className={s.messageFile}>
              <Attach width="30px" height="30px" />
              <input type="file" id="messageFile" onChange={(e: any) => {
                setMessageFile(e.target.files[0])
              }} />
            </label>
          </div>
          <div>
            <button type="submit">
              
            </button>
          </div>
         </Form>
       )}
     </Formik>
}

