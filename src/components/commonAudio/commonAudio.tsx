import React, { useEffect, useRef, useState } from "react"
import { Add, Pause, Play } from "react-ionicons"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { addAudio, getAudio, addCommonAudio } from "../../redux/audioReducer"
import { Button } from "../common/button/Button"
import { SearchInput } from "../common/searchInput/SearchInput"
import s from "./commonAudio.module.css"
import { AudioDataType } from "../../ts/commonAudio"
import { AudioPlayer } from "./audioPlayer/audioPlayer"

type PropsType = {
    audioData: AudioDataType[] | null

    getAudio: (audioType: string, term: string | null) => void
    addAudio: (title: string | null, isPrivat: boolean, file: any) => void
    addCommonAudio: (audioId: string) => void
}

type AudioItemPropsType = {
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
const AudioItem = React.memo((props: AudioItemPropsType) => {

    const [isPlaying, setPlaying] = useState(false)

    const audioEl = useRef<any>(null)
    // console.log(props.currentIndex !== 2 && props.index === props.currentIndex)
    // console.log(props.currentIndex)
    // console.log(props.index)


            // console.log(audioEl)

    return <div className={s.audioItem}
        onMouseUp={(e: any) => {
        }}
        onMouseLeave={(e: any) => {
        }}
        onMouseMove={(e: any) => {
        }}
    >

        <div className={s.playBlock}>
            {isPlaying
                ? <Pause color="#fff" />
                : <Play color="#fff" />
            }
        </div>
        <div className={s.progressAndTitleBlock}>
            <div className={s.title}>
                
            </div>
            <div
                onMouseDown={(e: any) => {
                    const width = e.currentTarget.clientWidth
                    const click = e.clientX
                    const offsetLeft = e.currentTarget.offsetLeft
                    const progressW = click - offsetLeft
                    const progressWidthPersent = (progressW / width) * 100

                }}
                className={s.progressContainer}
            >
                <div className={s.progress} style={{width: `50%`}}></div>
            </div>
        </div>
        <div className={s.soundBlock}>
            
            <div onMouseMove={() => console.log('onMouseMove')} className={s.soundContainer}>
                <div className={s.sound} style={{width: `50%`}}></div>
            </div>
        </div>
        
        <div className={s.addingIconsContainer}>
            <Add color="#6060da" />
        </div>
    </div>
})

const CommonAudio = (props: PropsType) => {
    const [titleText, setTitleText] = useState('')
    const [audioFile, setAudioFile] = useState<any>(null)
    const [isPrivatAudio, setPrivatAudio] = useState(false)
    const [isAudioFormActive, setAudioFormActive] = useState(false)
    const [isMyAudioOptionsActive, setMyAudioOptionsActive] = useState(false)
    const [audioType, setAudioType] = useState("common_audio")
    const [term, setTerm] = useState('')

    const [currentAudio, setCurrentAudio] = useState<any>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [audioVolume, setAudioVolume] = useState(0.2)

    const getAudio = () => {
        props.getAudio(audioType, null)
    }

    useEffect(() => {
        getAudio()
    }, [audioType])

    

    const audioItems = props.audioData?.map((v, index) => {
        return <AudioItem key={v._id} index={index} id={v._id} title={v.title} url={v.url}
            addCommonAudio={props.addCommonAudio}
            currentAudio={currentAudio} setCurrentAudio={setCurrentAudio}
            currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}
            audioVolume={audioVolume} setAudioVolume={setAudioVolume}
            />
    })

    const cleanup = () => {
        setAudioFormActive(false)
        setAudioFile(null)
        setTitleText('')
        setPrivatAudio(false)
    }

    const addAudio = () => {
        props.addAudio(titleText, isPrivatAudio, audioFile)
        cleanup()
    }

    const getAudioWithTerm = () => props.getAudio(audioType, term.length > 0 ? term : null)
    
    return <div className={s.videoPage}>
        <AudioPlayer audioData={props.audioData} getAudio={getAudio} />
        <div className={s.videoOptionsBlock}>
            <div className={s.addVideo}>
                <label htmlFor="addVideo" className={s.addVideoLabel}>
                    <span onClick={() => setAudioFormActive(true)}>Загрузити трек</span>
                    <input type="file" id="addVideo" onChange={(e: any) => {
                        setAudioFile(e.target.files[0])
                    }} />
                </label>
                
                {isAudioFormActive
                    && <div className={s.videoForm}>
                        <label htmlFor="">
                            Зробити приватним
                            <input type="checkbox" checked={isPrivatAudio} onChange={e => setPrivatAudio(e.target.checked)} />
                        </label>
                        <input type="text" onChange={(e: any) => setTitleText(e.target.value)}
                            placeholder="Додати назву"
                        />
                        <div className={s.formButtons}>
                            <Button onClick={addAudio} value="Додати" />
                            <Button onClick={cleanup} value="Відмінити" />
                        </div>
                        
                </div>
                }
                
            </div>
            <div className={s.allVideo} onClick={() => setAudioType("common_audio")}>Всі</div>
            <div className={s.myVideo}>
                <span onClick={() => isMyAudioOptionsActive ? setMyAudioOptionsActive(false) : setMyAudioOptionsActive(true)}>
                    Мої
                </span>
                {isMyAudioOptionsActive
                    && <div className={s.myVideoType}>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setAudioType("all_my_audio")
                                setMyAudioOptionsActive(false)
                        }}>
                            Всі мої
                        </span>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setAudioType("my_privat_audio")
                                setMyAudioOptionsActive(false)
                        }}>
                            Мої приватні
                        </span>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setAudioType("my_common_audio")
                                setMyAudioOptionsActive(false)
                        }}>
                            Мої публічні
                        </span>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setAudioType("added_audio")
                                setMyAudioOptionsActive(false)
                        }}>
                            Додані
                        </span>
                    </div>
                }
            </div>
        </div>

        <SearchInput placeholder="Знайти відео" value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyPress={(e: any) => {
                if (e.charCode === 13) {
                    getAudioWithTerm()
                }   
            }}
        />
        <Button value="Знайти" onClick={getAudioWithTerm} />
        <div className={s.videoBlock}>
            {audioItems}
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    audioData: state.audio.audioData
})

export default connect(mapStateToProps, {addAudio, addCommonAudio, getAudio})(CommonAudio)