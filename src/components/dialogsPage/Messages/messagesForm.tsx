
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import { CurrentDialogInfoType } from "../../../ts/dialogs"
import s from "./messages.module.css"

type PropsPage = {
    currentDialogInfo: CurrentDialogInfoType | null
    sendDialogMessage: (dialogId: string, userName: string, userImg: string | null, message: string) => void
}

export const MessagesForm = (props: PropsPage) => {
  const [currentMessage, setCurrentMessage] = useState('')
    return <Formik
       initialValues={{ textMessage: currentMessage }}
        onSubmit={(val) => {
        //    @ts-ignore
          props.sendDialogMessage(props.currentDialogInfo?.dialogId, props.currentDialogInfo?.userName, props.currentDialogInfo?.userImg, currentMessage)
          setCurrentMessage('')
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="textMessage" component="textarea" value={currentMessage} onChange={(e: any) => setCurrentMessage(e.target.value)} />
           <button type="submit">
             Submit
           </button>
         </Form>
       )}
     </Formik>
}

