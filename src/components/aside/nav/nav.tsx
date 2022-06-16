import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import s from "./nav.module.css"
import { AppStateType } from "../../../redux/redux-store"

type PropsType = {
    ownerId: string | undefined
}

const Nav = (props: PropsType) => {
    return <div>
        <ul className={s.navList}>
            <NavLink className={s.active} to="/users"><li>Користувачі</li></NavLink>
            <NavLink className={s.active} to={`/profile/${props.ownerId}`}><li>Профіль</li></NavLink>
        </ul>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    ownerId: state.auth.ownerData?.id
})

export default connect(mapStateToProps, {})(Nav)