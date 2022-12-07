import { PersonAdd } from 'react-ionicons'
import s from './groops.module.css'
import avaGroop from '../../img/ava_groops.png'
import { NavLink } from 'react-router-dom'

type PropsType = {
    title: string
    id: string
    describeInfo: string | null
    mainImg: string | null
    type: string
    followersAmount: number
}

export const Groop = (props: PropsType) => {
    return <div className={s.groop}>
        <div className={s.groop__ava}>
            <NavLink to={`/groopInfo/${props.id}`}>
                <img src={props.mainImg || avaGroop} alt="GroopAva" />
            </NavLink>
        </div>
        <div className={s.groop__info}>
            <NavLink to={`/groopInfo/${props.id}`}>
                <div className={s.groop__title}>
                    {props.title}
                </div>
            </NavLink>
            
            <div className={s.groop__typeAndFollowers}>
                <span>
                    {props.type === 'public' ? 'Відкрита група' : 'Закрита група'}
                </span>
                <span>
                    Учасники: {props.followersAmount}
                </span>
            </div>
            <p className={s.groop__describe}>
                {props.describeInfo || "Наразі опис до цієї групи відсутній sff sfsdf fssf s Наразі опис до цієї групи відсутній"}
            </p>
        </div>
        <div className={s.groop__addIcon}>
            <PersonAdd />
        </div>
    </div>
}