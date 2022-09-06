import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import s from "./header.module.css"
import logo from "../../img/logo.png"
import { AuthDataType } from "../../ts/auth"
import { logout } from "../../redux/authReducer"
import avatar from "../../img/ava_male.jpeg"
import { ProfileDataType } from "../../ts/profile"
import { LogOut, Videocam } from "react-ionicons"
import { useState } from "react"
import { NavLink } from "react-router-dom"

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
        <NavLink to="commonVideo">
            <div className={s.header__filesBlock}>
                <Videocam />
            </div>
        </NavLink>
        {props.authData?.id
            && <div className={s.menuProfileActions} onClick={toggleMenuActions}>
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