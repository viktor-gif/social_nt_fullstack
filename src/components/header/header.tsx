import { connect } from "react-redux"
import { appStateType } from "../../redux/redux-store"
import s from "./header.module.css"
import logo from "../../img/logo.png"
import { NavLink } from "react-router-dom"
import { AuthDataType } from "../../ts/auth"
import {logout} from "../../api/auth"

type PropsType = {
    ownerData: AuthDataType | null
}
const Header = (props: PropsType) => {
    
    const logoutClick = () => {
        logout().then((res) => console.log(res))
    }
    
    return <div className={s.header}>
        <img src={logo} className={s.header__logo} />
        {!props.ownerData?.id ? <div className={s.header__actions}>
            <NavLink to="/user/add" className={s.header__actions_item}>Створити нового користувача</NavLink>
            <NavLink to="/login" className={s.header__actions_item}>Зайти на свою сторінку</NavLink>
        </div>
        : <button onClick={logoutClick}>
            Вийти з свого профілю
        </button>}
    </div>
}

const mapStateToProps = (state: appStateType) => ({
    ownerData: state.auth.ownerData
})

export default connect(mapStateToProps, {})(Header)