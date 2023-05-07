import { NavLink } from "react-router-dom";
import blockedUserAvatar from "../../../img/deleted_accaunt_avatar.jpg"
import s from "./blockedUser.module.css"

type PropsType = {
    id: string
    key: string
    fullName: string
}

export const BlockedUser = (props: PropsType) => {
    
    return <div className={s.user}>
        <div className={s.user__avatar}>
            <NavLink to={`/profile/${props.id}`}>
                <img className={s.user__pic} src={blockedUserAvatar} />
            </NavLink>
        </div>
        <div className={s.user__dataBlock}>
            <div className={s.user__data}>
                <div>Користувач <span className={s.user__fullName}>{props.fullName}</span> заблокований</div>
            </div>
        </div>
        
    </div>

}