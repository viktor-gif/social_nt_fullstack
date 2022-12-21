import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { AppStateType } from "../../redux/redux-store"
import { getGroopInfo, deleteFollower, addFollower } from "../../redux/groopsReducer"
import { GroopType } from "../../ts/groops"
import s from './groopInfo.module.css'
import avatar from '../../img/ava_groops.png'
import { AuthDataType } from "../../ts/auth"
import { GroopInfo__sidebar } from "./groopInfo__sidebar/groopInfo__sidebar"
import { GroopInfo__posts } from "./groopInfo__posts/groopInfo__posts"

type PropsType = {
    authData: AuthDataType | null
    groopInfo: GroopType | null

    getGroopInfo: (groopId: string) => void
    addFollower: (groopId: string) => void
    deleteFollower: (groopId: string) => void
}

const GroopInfo = (props: PropsType) => {
    console.log(props.groopInfo)

    const params = useParams()
    console.log(params.groopId)

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
        </div>
        <div className={s.posts}>
            <GroopInfo__posts />
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
    authData: state.auth.authData
})

export default connect(mapStateToProps, {
    getGroopInfo,
    addFollower,
    deleteFollower
})(GroopInfo)