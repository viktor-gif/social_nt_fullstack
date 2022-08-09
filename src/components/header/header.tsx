import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import s from "./header.module.css"
import logo from "../../img/logo.png"
import { NavLink } from "react-router-dom"
import { AuthDataType } from "../../ts/auth"
import { logout } from "../../redux/authReducer"
import { Button } from "../common/button/Button"
import avatar from "../../img/ava_male.jpeg"
import { ProfileDataType } from "../../ts/profile"
import { LogOut } from "react-ionicons"
import { useState } from "react"

type PropsType = {
    authData: AuthDataType | null
    isAuth: boolean
    authProfileData: ProfileDataType | null

    logout: () => void
}
const Header = (props: PropsType) => {
    const [isMenuActionsActive, setmenuActionsActive] = useState(false)
    
    const logoutClick = () => {
        props.logout()
    }
    const toggleMenuActions = () => {
        isMenuActionsActive ? setmenuActionsActive(false) : setmenuActionsActive(true)
    }
    
    return <div className={s.header}>
        <img src={logo} className={s.header__logo} />
        {!props.authData?.id ? <div className={s.header__actions}>
            <NavLink to="/user/add" className={s.header__actions_item}>Створити нового користувача</NavLink>
            <NavLink to="/login" className={s.header__actions_item}>Зайти на свою сторінку</NavLink>
        </div>
            :
        <div className={s.menuProfileActions} onClick={toggleMenuActions}>
            <img src={props.authProfileData?.photos.small || avatar} alt="ava" />
            {isMenuActionsActive
                
            && <ul className={s.actionsList}>
                <li onClick={logoutClick} >
                    <LogOut color={'#555'}/> 
                    <span>Вийти з свого профілю</span>
                </li>
            </ul> 
            }
        </div>
        }
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    authData: state.auth.authData,
    isAuth: state.auth.isAuth,
    authProfileData: state.auth.authProfileData
})

export default connect(mapStateToProps, {
    logout
})(Header)