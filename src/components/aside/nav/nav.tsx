import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import s from "./nav.module.css"
import { AppStateType } from "../../../redux/redux-store"
import {
    PersonOutline, PeopleOutline, ChatbubblesOutline,
    SettingsOutline, HelpOutline, LogoElectron, PeopleCircle
} from "react-ionicons"
import { useState } from "react"

type PropsType = {
    authId: string | undefined
}

const Nav = (props: PropsType) => {
    const [isNavActive, setNavActive] = useState(false)

    const onNavToggleClick = () => {
        isNavActive ? setNavActive(false) : setNavActive(true)
    }

    return <div className={s.navigation + " " + (isNavActive ? s.navigation_active : '')}>
        <ul className={s.navList}>
            <li>
                <NavLink className={s.active} to={`/profile/${props.authId}`}>
                    <span className={s.nav__icon}>
                        <PersonOutline
                            color={'#00000'}
                            height="25px"
                            width="25px"
                        />
                    </span>
                    <span className={s.nav__title}>Профіль</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={s.active} to="/users">
                    <span className={s.nav__icon}>
                        <PeopleOutline
                            color={'#00000'}
                            height="25px"
                            width="25px"
                        />
                    </span>
                    <span className={s.nav__title}>Користувачі</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={s.active} to="/Groops">
                    <span className={s.nav__icon}>
                        <PeopleCircle
                            color={'#fff'}
                            height="25px"
                            width="25px"
                        />
                    </span>
                    <span className={s.nav__title}>Групи</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={s.active} to="/dialogs">
                    <span className={s.nav__icon}>
                        <ChatbubblesOutline
                            color={'#00000'}
                            height="25px"
                            width="25px"
                        />
                    </span>
                    <span className={s.nav__title}>Діалоги</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={s.active} to="#">
                    <span className={s.nav__icon}>
                        <SettingsOutline
                            color={'#00000'}
                            height="25px"
                            width="25px"
                        />
                    </span>
                    <span className={s.nav__title}>Налаштування</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={s.active} to="/#">
                    <span className={s.nav__icon}>
                        <HelpOutline
                            color={'#00000'}
                            height="25px"
                            width="25px"
                        />
                    </span>
                    <span className={s.nav__title}>Допомога</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={s.active} to="/#">
                    <span className={s.nav__icon}>
                        <LogoElectron
                            color={'#00000'}
                            height="25px"
                            width="25px"
                        />
                    </span>
                    <span className={s.nav__title}>Ще щось</span>
                </NavLink>
            </li>
        </ul>
        <div className={s.nav__toggle + " " + (isNavActive ? s.nav__toggle_active : '')}
            onClick={onNavToggleClick}
        >
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    authId: state.auth.authData?.id
})

export default connect(mapStateToProps, {})(Nav)