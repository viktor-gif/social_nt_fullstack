import React from "react";
import { NavLink } from "react-router-dom";
import s from "./nav.module.css"

export const Nav = () => {
    return <div>
        <ul className={s.navList}>
            <NavLink className={s.active} to="/users"><li>Користувачі</li></NavLink>
            <NavLink className={s.active} to="/profile"><li>Профіль</li></NavLink>
        </ul>
    </div>
}