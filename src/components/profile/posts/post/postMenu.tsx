import s from "./post.module.css"
import deleteIcon from "../../../../img/icons/delete-icon.png"
import updateIcon from "../../../../img/icons/update.png"
import copyIcon from "../../../../img/icons/copy.png"

type PropsType = {
    canDeletePost: boolean
    canUpdatePost: boolean

    deletePost: () => void
    setUpdate: (isUpdate: boolean) => void
}

export const PostMenu = (props: PropsType) => {
    return <div className={s.postMenu}>
        {props.canUpdatePost && <div className={s.postMenu__item} onClick={() => props.setUpdate(true)}>
            <img src={updateIcon} alt="UPDATE" />
            <span>Виправити пост</span>
        </div>}
        <div className={s.postMenu__item}>
            <img src={copyIcon} alt="COPY" />
            <span>Копіювати текст</span>
        </div>
        {props.canDeletePost && <div className={s.postMenu__item} onClick={props.deletePost}>
            <img src={deleteIcon} alt="DEL" />
            <span>Видалити пост</span>
        </div>}
    </div>
}