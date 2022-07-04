import s from "./post.module.css"
import deleteIcon from "../../../../img/icons/delete-icon.png"

type PropsType = {
    canDeletePost: boolean
    deletePost: () => void
}

export const PostMenu = (props: PropsType) => {
    return <div className={s.postMenu}>
        {props.canDeletePost && <div className={s.postMenu__item} onClick={props.deletePost}>
            <img src={deleteIcon} alt="DEL" />
            <span>Видалити пост</span>
        </div>}
        <div className={s.postMenu__item}><img src={deleteIcon} alt="DEL" /><span>Копіювати пост</span></div>
        <div className={s.postMenu__item}><img src={deleteIcon} alt="DEL" /><span>Зробити ще щось</span></div>
    </div>
}