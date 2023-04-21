import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import s from "./header.module.css"
import logo from "../../img/logo.png"
import { AuthDataType } from "../../ts/auth"
import { logout } from "../../redux/authReducer"
import { deleteUser } from "../../redux/usersReducer"
import avatar from "../../img/ava_male.jpeg"
import { ProfileDataType } from "../../ts/profile"
import { Images, LogOut, MusicalNote, Trash, Videocam } from "react-ionicons"
import { useState } from "react"
import { NavLink } from "react-router-dom"

type PropsType = {
    authData: AuthDataType | null
    isAuth: boolean
    authProfileData: ProfileDataType | null

    logout: () => void
    deleteUser: () => void
}
const Header = (props: PropsType) => {
    const [isMenuActionsActive, setmenuActionsActive] = useState(false)
    const [isDeleteMenuActive, setDeleteMenuActive] = useState(false)
    
    const logoutClick = () => {
        props.logout()
    }
    const toggleMenuActions = () => {
        isMenuActionsActive ? setmenuActionsActive(false) : setmenuActionsActive(true)
    }

    const onDeleteAccaunt = () => {
        props.deleteUser()
        setDeleteMenuActive(false)
    }
    
    return <div className={s.header}>
        <img src={logo} className={s.header__logo} />
        <NavLink to="commonVideo">
            <div className={s.header__filesBlock}>
                <Videocam />
            </div>
        </NavLink>
        <NavLink to="commonAudio">
            <div className={s.header__filesBlock}>
                <MusicalNote />
            </div>
        </NavLink>
        <NavLink to="commonImg">
            <div className={s.header__filesBlock}>
                <Images />
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
                        {!props.authData?.blockedAccaunt
                            && <li onClick={() => setDeleteMenuActive(true)} >
                                <Trash color={'#555'}/> 
                                <span>Видалити аккаунт</span>
                            </li>
                        }
                    </ul> 
                }
                {isDeleteMenuActive && <div>
                    <div>Ви точно хочете видалити аккаунт {props.authProfileData?.fullName}?</div>
                    <div>
                        <button onClick={onDeleteAccaunt}>Так</button>
                        <button onClick={() => setDeleteMenuActive(false)}>Ні</button>
                    </div>
                </div>}
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
    logout, deleteUser
})(Header)