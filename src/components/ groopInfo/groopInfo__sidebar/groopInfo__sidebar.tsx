import { AudioDataType } from '../../../ts/commonAudio'
import { ImgDataType } from '../../../ts/commonImg'
import { VideoDataType } from '../../../ts/commonVideo'
import s from './groopInfo__sidebar.module.css'

type PropsType = {
    followersCount: number | undefined
    img: ImgDataType[] | undefined
    video: VideoDataType[] | undefined
    audio: AudioDataType[] | undefined
}

export const GroopInfo__sidebar = (props: PropsType) => {
    return <div>
        <div className={s.sidebar__item + " " + s.sidebar__followersCount}>
            <span>Підписники: </span>
            <span>{ props.followersCount || '0' }</span>
        </div>
        <div className={s.sidebar__item}>
            sidebar__item
        </div>
        <div className={s.sidebar__item}>
            sidebar__item
        </div>
    </div>
}