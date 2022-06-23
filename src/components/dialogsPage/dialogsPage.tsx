import { useEffect } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { Dialogs } from "./dialogs/dialogs"
import s from "./dialogsPage.module.css"
import { Messages } from "./Messages/messages"

type PropsPage = {

}

const DialogsPage = (props: PropsPage) => {
    useEffect(() => {
        
    }, [])
    return <div className={s.dialogsPage}>
        <Dialogs />
        <Messages />
    </div>
}

const mapStateToProps = (state: AppStateType) => ({

})

export default connect(mapStateToProps, {})(DialogsPage)