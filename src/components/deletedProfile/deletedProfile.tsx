import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import deletedAccauntAvatar from '../../img/deleted_accaunt_avatar.jpg'
import { restoreUser } from '../../redux/usersReducer'
import s from "./deletedProfile.module.css"

type PropsType = {
    authUserName: string | undefined

    restoreUser: () => void
}

const DeletedProfile = (props: PropsType) => {
    return <div className={s.delContainer}>
        <div className={s.delAvatar}>
            <img className={s.delAvatar__img} src={deletedAccauntAvatar} alt="DELETED" />
        </div>
        
        <div className={s.delInfo}>Сторінку{" "}
            <span className={s.delUserName}>
                {props.authUserName && props.authUserName}
            </span>{" "}
            видалено
        </div>
        <button className={s.delRestoreButton} onClick={() => props.restoreUser()}>Відновити сторінку</button>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    authUserName: state.auth.authProfileData?.fullName
})

export default connect(mapStateToProps, {
    restoreUser
})(DeletedProfile)