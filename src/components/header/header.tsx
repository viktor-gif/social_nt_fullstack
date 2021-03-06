import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import s from "./header.module.css"
import logo from "../../img/logo.png"
import { NavLink } from "react-router-dom"
import { AuthDataType } from "../../ts/auth"
import { logout } from "../../redux/authReducer"
import { Navigate } from "react-router-dom"

type PropsType = {
    authData: AuthDataType | null
    isAuth: boolean

    logout: () => void
}
const Header = (props: PropsType) => {
    
    const logoutClick = () => {
        props.logout()
    }
    
    
    return <div className={s.header}>
        <img src={logo} className={s.header__logo} />
        {!props.authData?.id ? <div className={s.header__actions}>
            <NavLink to="/user/add" className={s.header__actions_item}>Створити нового користувача</NavLink>
            <NavLink to="/login" className={s.header__actions_item}>Зайти на свою сторінку</NavLink>
        </div>
        : <button onClick={logoutClick}>
            Вийти з свого профілю
            </button>}
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    authData: state.auth.authData,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    logout
})(Header)