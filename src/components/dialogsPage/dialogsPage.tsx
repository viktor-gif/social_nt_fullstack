import { useEffect } from "react"
import { connect } from "react-redux"
import { getDialogs } from "../../redux/dialogsReducer"
import { AppStateType } from "../../redux/redux-store"
import { DialogType } from "../../ts/dialogs"
import { Dialogs } from "./dialogs/dialogs"
import s from "./dialogsPage.module.css"
import { Messages } from "./Messages/messages"

type PropsType = {
    dialogs: DialogType[] | null

    getDialogs: () => void
}

const DialogsPage = (props: PropsType) => {
    useEffect(() => {
        props.getDialogs()
    }, [])
    return <div className={s.dialogsPage}>
        <Dialogs dialogs={props.dialogs} />
        <Messages />
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    dialogs: state.dialogsPage.dialogs
})

export default connect(mapStateToProps, {
    getDialogs
})(DialogsPage)