import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { AppStateType } from "../../redux/redux-store"
import { getGroopInfo } from "../../redux/groopsReducer"
import { GroopType } from "../../ts/groops"
import s from './groopInfo.module.css'
import avatar from '../../img/ava_groops.png'
import { AuthDataType } from "../../ts/auth"
import { Button } from "../common/button/Button"

type PropsType = {
    authData: AuthDataType | null
    groopInfo: GroopType | null
    getGroopInfo: (groopId: string) => void
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
                    {isFollower
                        ? 'Ви підписані'
                        : props.groopInfo?.followers.length + ' підписників'
                    }
                </div>

                <button className={s.followGroop}
                    onClick={() => console.log('test')}    
                >
                    {isFollower ? 'Відписатись' : 'Підписатись'}
                </button>
                
            </div>
        </div>
        <div className={s.posts}>
            POSTS
        </div>
        <div className={s.sidebar}>
            SIDEBAR
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    groopInfo: state.groops.groopInfo,
    authData: state.auth.authData
})

export default connect(mapStateToProps, {
    getGroopInfo
})(GroopInfo)