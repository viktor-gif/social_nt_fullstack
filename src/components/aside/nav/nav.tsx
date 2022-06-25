import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import s from "./nav.module.css"
import { AppStateType } from "../../../redux/redux-store"

type PropsType = {
    authId: string | undefined
}

const Nav = (props: PropsType) => {
    return <div>
        <ul className={s.navList}>
            <NavLink className={s.active} to="/users"><li>Користувачі</li></NavLink>
            <NavLink className={s.active} to={`/profile/${props.authId}`}><li>Профіль</li></NavLink>
            <NavLink className={s.active} to="/dialogs"><li>Діалоги</li></NavLink>
        </ul>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    authId: state.auth.authData?.id
})

export default connect(mapStateToProps, {})(Nav)