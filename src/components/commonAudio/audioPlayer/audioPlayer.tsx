import { useEffect, useRef, useState } from "react"
import { Add, Pause, Play, PlayBack, PlayForward, Shuffle, Sync, VolumeHigh, VolumeLow, VolumeMedium, VolumeMute, VolumeOff } from "react-ionicons"
import { AudioDataType } from "../../../ts/commonAudio"
import s from "./audioPlayer.module.css"

type PropsType = {
    audioData: AudioDataType[] | null
    currentIndex: number
    isPlaying: boolean

    setPlaying: (isPlay: boolean) => void
    getAudio: () => void
    setCurrentIndex: (index: number) => void
}

export const AudioPlayer = (props: PropsType) => {

    const audioElem = useRef<any>(null)

    const [audioIndex, setAudioIndex] = useState(0)
    const [soundWidth, setSoundWidth] = useState(20)

    const [volume, setVolume] = useState(0.2)
    const [muted, setMuted] = useState(false)
    const [soundStrength, setSoundStrength] = useState('low')
    const [soundStrengthBeforeMuted, setSoundStrengthBeforeMuted] = useState(soundStrength)

    const currentUrl = (props.audioData && props.audioData.length > 0) ? props.audioData[audioIndex].url : ''
    // @ts-ignore
    console.log(props.audioData ? props.audioData[audioIndex] : props.audioData)
    console.log(props.audioData)
    console.log(audioIndex)
    
    const [currentAudioUrl, setCurrentAudioUrl] = useState(currentUrl)

    const [isRewind, setRewind] = useState(false)
    const [durationSong, setDurationSong] = useState<number | null>(null)

    const [isRepeat, setRepeat] = useState(false)
    const [isShuffle, setShuffle] = useState(false)

    const [progressWidth, setProgressWidth] = useState(0)

    const [isProgressBarOff, setProgressBarOff] = useState(false)
    const [progressBarWidth, setProgressBarWidth] = useState(0)
    const [progressBarOffsetLeft, setProgressBarOffsetLeft] = useState(0)

    const [isVolumeBarOff, setVolumeBarOff] = useState(false)
    const [volumeBarWidth, setVolumeBarWidth] = useState(0)
    const [volumeBarOffsetLeft, setVolumeBarOffsetLeft] = useState(0)

    const duration = audioElem ? audioElem.current?.duration : 0
    // const volume = audioElem ? audioElem.current?.volume : 0

    useEffect(() => {
        setAudioIndex(props.currentIndex)
        setTimeout(() => {
            props.isPlaying && playAudio()
        }, 100)
    }, [props.currentIndex])
    
    useEffect(() => {
        setTimeout(() => {
            setDurationSong(audioElem.current?.duration)
        }, 500)
        setCurrentAudioUrl(currentUrl)
    }, [audioIndex, props.audioData])

    useEffect(() => {
        audioElem.current.volume = volume
    }, [volume, props.audioData])

    useEffect(() => {
        if (volume > 0.7) {
            setSoundStrength('high')
        } else if (volume > 0.3) {
            setSoundStrength('medium')
        } else if (volume > 0) {
            setSoundStrength('low')
        } else {
            setSoundStrength('off')
        } 
    }, [volume])

    const playAudio = () => {
        audioElem.current.play()
        audioElem.current.volume = volume
    }
    const pauseAudio = () => {
        audioElem.current.pause()
    }

    const playButtonClick = () => {
        playAudio()
        props.setPlaying(true)
    }
    const pauseButtonClick = () => {
        pauseAudio()
        props.setPlaying(false)
    }

    const nextButtonClick = () => {
        if (isRepeat) {
            playAudio()
        } else {
            if (isShuffle) {
                const audioCount = props.audioData?.length
                const randomAudio = audioCount && Math.floor(Math.random() * audioCount)

                randomAudio && setAudioIndex(randomAudio)
                setTimeout(() => {
                    props.isPlaying && playAudio()
                }, 100)
            } else {
                if (props.audioData?.length === audioIndex + 1) {
                    setAudioIndex(0)
                } else {
                    setAudioIndex(audioIndex + 1)
                }
                setTimeout(() => {
                    props.isPlaying && playAudio()

                    if (props.audioData?.length === props.currentIndex + 1) {
                        props.setCurrentIndex(0)
                    } else {
                        props.setCurrentIndex(audioIndex + 1)
                    }
                }, 100)
            }
        }
    }
    const prevButtonClick = () => {
        if (isRepeat) {
            playAudio()
        } else {
            if (isShuffle) {
                const audioCount = props.audioData?.length
                const randomAudio = audioCount && Math.floor(Math.random() * audioCount)
        
                randomAudio && setAudioIndex(randomAudio)
                setTimeout(() => {
                    props.isPlaying && playAudio()
                }, 100)
            } else {
                if (audioIndex === 0) {
                    setAudioIndex(props.audioData ? props.audioData?.length - 1 : 0)
                } else {
                    setAudioIndex(audioIndex - 1)
                }

                setTimeout(() => {
                    props.isPlaying && playAudio()

                    if (props.audioData?.length === 0) {
                        props.setCurrentIndex(props.audioData ? props.audioData?.length - 1 : 0)
                    } else {
                        props.setCurrentIndex(audioIndex - 1)
                    }
                }, 100)
            }
        }
    }
    const onProgressBarContainerClick = (e: any) => {
        setRewind(true)

        const width = e.currentTarget.clientWidth
        const click = e.clientX
        const offsetLeft = e.currentTarget.offsetLeft
        const progressW = click - offsetLeft
        const progressWidthPersent = (progressW / width) * 100
        
        setProgressWidth(progressWidthPersent)
        
        audioElem.current.currentTime = (progressW / width) * duration
        
    }
    const onSoundContainerClick = (e: any) => {

        muted && setMuted(false)

        const width = e.currentTarget.clientWidth
        const click = e.clientX
        const offsetLeft = e.currentTarget.offsetLeft
        const progressW = click - offsetLeft
        const soundWidthPersent = (progressW / width) * 100
        
        setSoundWidth(soundWidthPersent)
        
        setVolume(progressW / width)
    }
    const onTimeUpdateHandler = (e: any) => {
        if (!isProgressBarOff) {
            isRewind ? setRewind(false) : setProgressWidth((e.target.currentTime / e.target.duration) * 100)
        }
    }

    const currentDuration = durationSong && (durationSong * progressWidth) / 100

    const currentDurationSec = currentDuration && Math.ceil(((currentDuration / 60) - (Math.trunc(currentDuration / 60))) * 60)
    const currentSeconds = (currentDurationSec && currentDurationSec > 9) ? currentDurationSec : "0" + currentDurationSec

    const durationSec = durationSong && Math.ceil(((durationSong / 60) - (Math.trunc(durationSong / 60))) * 60)
    
    return <div className={s.audioPlayer}
        onMouseUp={(e: any) => {
            const click = e.clientX
            if (isProgressBarOff) {
                if (click - progressBarOffsetLeft >= 0 && click - progressBarOffsetLeft <= progressBarWidth) {
                    const progressW = click - progressBarOffsetLeft
                    audioElem.current.currentTime = (progressW / progressBarWidth) * duration
                } else if (click - progressBarOffsetLeft < 0) {
                    audioElem.current.currentTime = 0
                } else if (click - progressBarOffsetLeft > progressBarWidth) {
                    audioElem.current.currentTime = duration
                }
                setProgressBarOff(false)
            }
            if (isVolumeBarOff) {
                if (click - volumeBarOffsetLeft >= 0 && click - volumeBarOffsetLeft <= volumeBarWidth) {
                    const volumeW = click - volumeBarOffsetLeft
                    setVolume(volumeW / volumeBarWidth)
                } else if (click - volumeBarOffsetLeft < 0) {
                    setVolume(0)
                    setSoundWidth(0)
                } else if (click - volumeBarOffsetLeft > volumeBarWidth) {
                    setVolume(1)
                    setSoundWidth(100)
                }
                setVolumeBarOff(false)
            }
        }}
        onMouseLeave={(e: any) => {
            const click = e.clientX
            if (isProgressBarOff) {
                if (click - progressBarOffsetLeft >= 0 && click - progressBarOffsetLeft <= progressBarWidth) {
                    const progressW = click - progressBarOffsetLeft
                    audioElem.current.currentTime = (progressW / progressBarWidth) * duration
                } else if (click - progressBarOffsetLeft < 0) {
                    audioElem.current.currentTime = 0
                } else if (click - progressBarOffsetLeft > progressBarWidth) {
                    audioElem.current.currentTime = duration
                }
                setProgressBarOff(false)
            }
            if (isVolumeBarOff) {
                if (click - volumeBarOffsetLeft >= 0 && click - volumeBarOffsetLeft <= volumeBarWidth) {
                    const volumeW = click - volumeBarOffsetLeft
                    setVolume(volumeW / volumeBarWidth)
                } else if (click - volumeBarOffsetLeft < 0) {
                    setVolume(0)
                    setSoundWidth(0)
                } else if (click - volumeBarOffsetLeft > volumeBarWidth) {
                    setVolume(1)
                    setSoundWidth(100)
                }
                setVolumeBarOff(false)
            }
        }}
        onMouseMove={(e: any) => {
                const click = e.clientX
            if (isProgressBarOff && click - progressBarOffsetLeft >= 0 && click - progressBarOffsetLeft <= progressBarWidth) {
                const progressW = click - progressBarOffsetLeft
                const progressWidthPersent = (progressW / progressBarWidth) * 100
                setProgressWidth(progressWidthPersent)
            }
            if (isVolumeBarOff && click - volumeBarOffsetLeft >= 0 && click - volumeBarOffsetLeft <= volumeBarWidth) {
                const volumeW = click - volumeBarOffsetLeft
                const volumeWidthPersent = (volumeW / volumeBarWidth) * 100
                setSoundWidth(volumeWidthPersent)
                setVolume(volumeW / volumeBarWidth)
            }
        }}
    >

        <div className={s.audioBlock}>
            <audio src={currentAudioUrl} ref={audioElem}
                onTimeUpdate={onTimeUpdateHandler}
                onEnded={nextButtonClick}
                
            >
                Вибачте, ваш браузер не підтримує формат аудіо. ОБНОВІТЬ БРАУЗЕР!
            </audio>
        </div>

        <div className={s.playBlock}>
            <span className={s.playOrPause}>
                {props.isPlaying
                    ? <Pause color="#fff" onClick={pauseButtonClick} />
                    : <Play color="#fff" onClick={playButtonClick} />
                }
            </span>
            <PlayBack color="#6060da" onClick={prevButtonClick} />
            <PlayForward color="#6060da" onClick={nextButtonClick} />
        </div>
        <div className={s.progressAndTitleBlock}>
            <div className={s.title}>
                <span>{props.audioData && props.audioData[audioIndex].title}</span>
                <span>{
                    currentDuration ? Math.trunc(currentDuration / 60)
                        + " : "
                        + currentSeconds : "0 : 00"
                } / {
                        durationSong ? Math.trunc(durationSong / 60)
                            + " : "
                            + durationSec : "0 : 00"
                }</span>
            </div>
            <div
                onMouseDown={(e: any) => {
                    setProgressBarOff(true)

                    const width = e.currentTarget.clientWidth
                    const click = e.clientX
                    const offsetLeft = e.currentTarget.offsetLeft
                    const progressW = click - offsetLeft
                    const progressWidthPersent = (progressW / width) * 100

                    setProgressBarWidth(width)
                    setProgressBarOffsetLeft(offsetLeft)

                    setProgressWidth(progressWidthPersent)
                }}
                
                onClick={onProgressBarContainerClick}
                className={s.progressContainer}
            >
                <div className={s.progress} style={{width: `${progressWidth}%`}}></div>
            </div>
        </div>
        <div className={s.soundBlock}>
            <span onClick={() => {
                if (muted) {
                    setMuted(false)
                    audioElem.current.volume = volume
                    setSoundStrength(soundStrengthBeforeMuted)
                } else {
                    setMuted(true)
                    audioElem.current.volume = 0
                    setSoundStrength('muted')
                    setSoundStrengthBeforeMuted(soundStrength)
                }
            }
            }>
                {soundStrength === 'muted' && <VolumeMute color="#6060da" />}
                {soundStrength === 'off' && <VolumeOff color="#6060da" />}
                {soundStrength === 'low' && <VolumeLow color="#6060da" />}
                {soundStrength === 'medium' && <VolumeMedium color="#6060da" />}
                {soundStrength === 'high' && <VolumeHigh color="#6060da" />}
                
            </span>
            
            <div onMouseMove={() => console.log('onMouseMove')} onClick={onSoundContainerClick} className={s.soundContainer}
                onMouseDown={(e: any) => {
                    setVolumeBarOff(true)

                    const width = e.currentTarget.clientWidth
                    const click = e.clientX
                    const offsetLeft = e.currentTarget.offsetLeft
                    const volumeW = click - offsetLeft
                    const volumeWidthPersent = (volumeW / width) * 100

                    setVolumeBarWidth(width)
                    setVolumeBarOffsetLeft(offsetLeft)

                    setSoundWidth(volumeWidthPersent)
                    setVolume(volumeW / width)
                }}
            >
                <div className={s.sound} style={{width: `${soundWidth}%`}}></div>
            </div>
        </div>
        
        <div className={s.addingIconsContainer}>
            <Sync color={isRepeat ? "#0303ff" : "#808080"} onClick={() => isRepeat ? setRepeat(false) : setRepeat(true)} />
            <Shuffle color={isShuffle ? "#0303ff" : "#808080"} onClick={() => isShuffle ? setShuffle(false) : setShuffle(true)} />
            <Add color="#6060da" />
        </div>
    </div>
}