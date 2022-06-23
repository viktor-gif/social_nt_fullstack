
import { Formik, Form, Field } from "formik"
import { CurrentDialogInfoType } from "../../../ts/dialogs"
import s from "./messages.module.css"

type PropsPage = {
    currentDialogInfo: CurrentDialogInfoType | null
    sendDialogMessage: (dialogId: string, userName: string, message: string) => void
}

export const MessagesForm = (props: PropsPage) => {
    return <Formik
       initialValues={{ textMessage: '' }}
        onSubmit={(val) => {
        //    @ts-ignore
         props.sendDialogMessage(props.currentDialogInfo.dialogId, props.currentDialogInfo.userName, val.textMessage)
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="textMessage" component="textarea" />
           <button type="submit">
             Submit
           </button>
         </Form>
       )}
     </Formik>
}

