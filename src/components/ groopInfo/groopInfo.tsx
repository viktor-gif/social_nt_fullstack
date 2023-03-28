import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { AppStateType } from "../../redux/redux-store"
import { getGroopInfo, deleteFollower, addFollower, addPost, deletePost } from "../../redux/groopsReducer"
import { GroopType } from "../../ts/groops"
import s from './groopInfo.module.css'
import avatar from '../../img/ava_groops.png'
import { AuthDataType } from "../../ts/auth"
import { GroopInfo__sidebar } from "./groopInfo__sidebar/groopInfo__sidebar"
import { GroopInfo__posts } from "./groopInfo__posts/groopInfo__posts"
import { ProfileDataType } from "../../ts/profile"
import { NavLink, Route, Routes } from "react-router-dom"
import GroopInfo__img from "./groopInfo__additional/groopInfo__img"
import { GroopInfo__video } from "./groopInfo__additional/groopInfo__video"
import { GroopInfo__audio } from "./groopInfo__additional/groopInfo__audio"

type PropsType = {
    authData: AuthDataType | null
    groopInfo: GroopType | null
    authProfileData: ProfileDataType | null

    getGroopInfo: (groopId: string) => void
    addFollower: (groopId: string) => void
    deleteFollower: (groopId: string) => void
    addPost: (groopId: string, postText: string) => void
    deletePost: (groopId: string, postId: string) => void
}

const GroopInfo = (props: PropsType) => {

    const params = useParams()
    console.log(params)

    const [infoType, setInfoType] = useState('posts')

    useEffect(() => {
        params.groopId && props.getGroopInfo(params.groopId)
    }, [])
    const isFollower = (props.groopInfo && props.authData) && props.groopInfo.followers.includes(props.authData.id)

    return <div className={s.groopInfo}>
        <div className={s.header}>
            <div className={s.groop__image}>
                <img src={props.groopInfo?.mainImg || avatar} alt="Groop" />
            </div>
            <div className={s.groop__info}>
                <h3 className={s.groop__title}>
                    {props.groopInfo?.title}
                </h3>
                <div className={s.groop__isFollower}>
                    {
                        isFollower
                        ? 'Ви підписані'
                        :
                        props.groopInfo?.followers.length + ' підписників'
                    }
                </div>

                {isFollower ?
                    <button className={s.followGroop}
                        onClick={() => {
                                props.groopInfo && props.deleteFollower(props.groopInfo._id)
                                props.groopInfo && props.getGroopInfo(props.groopInfo._id)
                            }
                        }    
                    >
                        Відписатись
                    </button>
                    :
                    <button className={s.followGroop}
                        onClick={() => {
                                props.groopInfo && props.addFollower(props.groopInfo._id)
                                props.groopInfo && props.getGroopInfo(props.groopInfo._id)
                            }
                        }    
                    >
                        Підписатись
                    </button>
                }
                
            </div>

            <div className={s.groop__nav_wrapper}>
                <ul className={s.groop__nav}>
                    <li onClick={() => setInfoType('posts')}>
                        <NavLink to={``} className={nav => ((nav.isActive && infoType === 'posts') ? s.active_link : " ")}>
                            Пости
                        </NavLink>
                    </li>
                    <li onClick={() => setInfoType('photo')}>
                        <NavLink to={`photo`} className={nav => ((nav.isActive && infoType === 'photo') ? s.active_link : " ")}>
                            Фото
                        </NavLink>
                    </li>
                    <li onClick={() => setInfoType('video')}>
                        <NavLink to={`video`} className={nav => ((nav.isActive && infoType === 'video') ? s.active_link : " ")}>
                            Відео
                        </NavLink>
                    </li>
                    <li onClick={() => setInfoType('audio')}>
                        <NavLink to={`audio`} className={nav => ((nav.isActive && infoType === 'audio') ? s.active_link : " ")}>
                            Аудіо
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className={s.posts}>
            <Routes>
                <Route path='' element={<GroopInfo__posts groopId={params.groopId} addPost={props.addPost}
                    groopPosts={props.groopInfo?.posts} authProfileData={props.authProfileData}
                    getGroopInfo={props.getGroopInfo} deletePost={props.deletePost} />} />
                <Route path='photo' element={<GroopInfo__img groopId={params.groopId} />} />
                <Route path='video' element={<GroopInfo__video />} />
                <Route path='audio' element={<GroopInfo__audio />} />
            </Routes>
            
        </div>
        <div className={s.sidebar}>
            <GroopInfo__sidebar followersCount={props.groopInfo?.followers.length}
                video={props.groopInfo?.video} audio={props.groopInfo?.audio}
                img={props.groopInfo?.img} />
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    groopInfo: state.groops.groopInfo,
    authData: state.auth.authData,
    authProfileData: state.auth.authProfileData
})

export default connect(mapStateToProps, {
    getGroopInfo,
    addFollower,
    deleteFollower,
    addPost,
    deletePost
})(GroopInfo)