import s from './blockedProfile.module.css'
import blockedAvatar from '../../../img/deleted_accaunt_avatar.jpg'

type PropsType = {
    userName: string | undefined
}

export const BlockedProfile = (props: PropsType) => {
    return <div className={s.blockedProfile__container}>
        <div className={s.blockedProfile__avatar}>
            <img className={s.blockedProfile__pic} src={blockedAvatar} alt="BLOCKED" />
        </div>
        <div className={s.blockedProfile__info}>
            Користувач <span className={s.blockedProfile__userName}>
                "{props.userName}"
            </span> видалив свою сторінку або заблокований
        </div>
    </div>
}