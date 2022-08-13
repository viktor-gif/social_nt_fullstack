
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import { ProfileDataType } from "../../../ts/profile"
import s from "./messages.module.css"

type PropsPage = {
  currentDialogId: string | null
  currentDialogInfo: ProfileDataType | null
    
  sendDialogMessage: (dialogId: string, message: string) => void
}

export const MessagesForm = (props: PropsPage) => {
  const [currentMessage, setCurrentMessage] = useState('')
    return <Formik
       initialValues={{ textMessage: currentMessage }}
        onSubmit={(val) => {
        //    @ts-ignore
          props.sendDialogMessage(props.currentDialogId, currentMessage)
          setCurrentMessage('')
       }}
     >
       {({ isSubmitting }) => (
         <Form className={s.formikMessagesForm}>
          <Field type="text" name="textMessage" component="input" value={currentMessage} onChange={(e: any) => setCurrentMessage(e.target.value)}
            placeholder="Відправити повідомлення"
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                //    @ts-ignore
                props.sendDialogMessage(props.currentDialogId, currentMessage)
                setCurrentMessage('')
            
              }
            }}
          />
          <div>
            <button type="submit">
              
            </button>
          </div>
         </Form>
       )}
     </Formik>
}

