import React, { useEffect, useRef, useState } from "react"
import { Add, Pause, Play, VolumeHigh, VolumeLow, VolumeMedium, VolumeOff } from "react-ionicons"
import s from "./audioItem.module.css"


type PropsType = {
    index: number
    id: string
    url: string
    title: string | null
    currentAudio: any
    currentIndex: number
    audioVolume: number

    setCurrentAudio: (element: any) => void
    setCurrentIndex: (index: number) => void
    addCommonAudio: (audioId: string) => void
    setAudioVolume: (volume: number) => void
}
export const AudioItem = React.memo((props: PropsType) => {

    const playButtonClick = () => {
        props.setCurrentIndex(props.index)
    }

    return <div className={s.audioPlayer}>

        <div className={s.playBlock}>
            {props.currentIndex === props.index
                ? <VolumeHigh color="#6060da" />
                : <Play color="#000" onClick={playButtonClick} />
            }
        </div>
        <div className={s.title}>
            {props.title}
        </div>
        
        <div className={s.addingIcon}>
            <Add color="#6060da" />
        </div>
    </div>
})