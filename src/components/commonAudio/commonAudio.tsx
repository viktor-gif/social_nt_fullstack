import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { addAudio, getAudio, addCommonAudio } from "../../redux/audioReducer"
import { Button } from "../common/button/Button"
import { SearchInput } from "../common/searchInput/SearchInput"
import s from "./commonAudio.module.css"
import { AudioDataType } from "../../ts/commonAudio"
import { AudioPlayer } from "./audioPlayer/audioPlayer"
import { AudioItem } from "./audioItem/audioItem"

type PropsType = {
    audioData: AudioDataType[] | null

    getAudio: (audioType: string, term: string | null) => void
    addAudio: (title: string | null, isPrivat: boolean, file: any) => void
    addCommonAudio: (audioId: string) => void
}

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

    const [isPlaying, setPlaying] = useState(false)

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
            isPlaying={isPlaying}
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
        <AudioPlayer audioData={props.audioData} getAudio={getAudio} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}
            isPlaying={isPlaying} setPlaying={setPlaying} />
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