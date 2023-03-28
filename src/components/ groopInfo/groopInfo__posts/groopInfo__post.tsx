import { useEffect, useState } from 'react'
import { profileAPI } from '../../../api/profile'
import { CommentType } from '../../../ts/posts'
import { ProfileDataType } from '../../../ts/profile'
import { BurgerMenu } from '../../common/burgerMenu/burgerMenu'
import s from './groopInfo__posts.module.css'
import avatar from '../../../img/ava_male.jpeg'
import { formatDate } from '../../../utils/formatDate'
import { Trash } from 'react-ionicons'

type PropsType = {
    postText: string | null
    created: string
    postId: string
    authorId: string
    likedUsers: string[]
    comments: CommentType[]
    groopId: string | undefined

    getGroopInfo: (groopId: string) => void
    deletePost: (groopId: string, postId: string) => void
}

export const GroopInfo__post = (props: PropsType) => {

    const [authorProfileData, setAuthProfileData] = useState<ProfileDataType | null>(null)
    const [disablePostOptions, setDisablePostOptions] = useState(true)

    useEffect(() => {
        props.authorId && profileAPI.getProfile(props.authorId)
            .then(res => {
                setAuthProfileData(res.data)
            })
    }, [])

    const deletePost = () => {
        props.groopId && props.deletePost(props.groopId, props.postId)
        props.groopId && props.getGroopInfo(props.groopId)
    }

    return <div className={s.post}>
        <div className={s.post__header}>
            <div className={s.post__headerInfoBlock}>
                <div className={s.post__avatar}>
                    <img src={authorProfileData?.photos.small || avatar} alt="AVA" />
                </div>
                <div className={s.post__headerInfo}>
                    <div className={s.post__authorName}>
                        {authorProfileData?.fullName}
                    </div>
                    <div className={s.post__created}>
                        {authorProfileData && formatDate(authorProfileData.created)}
                    </div>
                </div>
            </div>
            <div className={s.post__burger}>
                <BurgerMenu burgerClick={() => {
                    disablePostOptions ? setDisablePostOptions(false) : setDisablePostOptions(true)
                }} />
                <div className={s.post__options + !disablePostOptions ? s.post__options_enable : ""}>
                    <div onClick={deletePost} className={s.post__options_item}>
                        <Trash width="30px" height="30px" color="#e65c5c" />
                        <span>Видалити</span>
                    </div>
                </div>
            </div>
            
            {/* <div className={s.message__options + " " + (senderIsAuthUser ? s.message__optionsAuth : "")}>
                                <div onClick={getDeletemenu} className={s.message__options_item}>
                                    <Trash width="30px" height="30px" color="#e65c5c" />
                                    <span>Видалити</span>
                                </div>
                                <div onClick={toggleSpam} className={s.message__options_item + " " + s.message__options_itemSpam}>
                                    <Ban width="30px" height="30px" color="#e65c5c" />
                                    <span>{props.isSpam ? "Вилучити зі спаму" : "Вважати спамом"}</span>
                                </div>
                                {props.senderId === props.authProfileData?._id
                                    && <div onClick={() => {
                                        setCorrectMode(true)
                                        setActiveMessageOptions(false)
                                    }} className={s.message__options_item}>
                                        <Construct width="30px" height="30px" color="#555" />
                                        <span>Виправити</span>
                                    </div>
                                }
                            </div> */}
        </div>
        <div className={s.post__content}>

        </div>
        <div className={s.post__footer}>

        </div>
        <h1>{props.postText}</h1>
    </div>
}