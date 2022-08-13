
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
         <Form>
           <Field type="text" name="textMessage" component="textarea" value={currentMessage} onChange={(e: any) => setCurrentMessage(e.target.value)} />
          <div>
            <button type="submit">
              Надіслати
            </button>
          </div>
         </Form>
       )}
     </Formik>
}

