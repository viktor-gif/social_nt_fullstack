import { useEffect, useState } from "react"
import { Add } from "react-ionicons"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { addVideo, getVideo, addCommonVideo } from "../../redux/videoReducer"
import { VideoDataType } from "../../ts/commonVideo"
import { Button } from "../common/button/Button"
import { SearchInput } from "../common/searchInput/SearchInput"
import s from "./commonVideo.module.css"

type PropsType = {
    videoData: VideoDataType[] | null

    getVideo: (videoType: string, term: string | null) => void
    addVideo: (title: string | null, isPrivat: boolean, file: any) => void
    addCommonVideo: (videoId: string) => void
}

const CommonVideo = (props: PropsType) => {
    const [titleText, setTitleText] = useState('')
    const [videoFile, setVideoFile] = useState<any>(null)
    const [isPrivatVideo, setPrivatVideo] = useState(false)
    const [isVideoFormActive, setVideoFormActive] = useState(false)
    const [isMyVideoOptionsActive, setMyVideoOptionsActive] = useState(false)
    const [videoType, setVideoType] = useState("common_video")
    const [term, setTerm] = useState('')

    useEffect(() => {
        props.getVideo(videoType, null)
    }, [videoType])

    const videoItems = props.videoData?.map(v => {
        return <div key={v._id} className={s.video}>
            <video src={v.url} controls></video>
            <span>{
                v.title?.length && v.title?.length < 40 ? v.title : v.title?.slice(0, 40) + '...'
            }</span>
            <div className={s.addIcon} onClick={() => {
                props.addCommonVideo(v._id)
            }
            }>
                <Add />
            </div>
        </div>
    })

    const cleanup = () => {
        setVideoFormActive(false)
        setVideoFile(null)
        setTitleText('')
        setPrivatVideo(false)
    }

    const addVideo = () => {
        props.addVideo(titleText, isPrivatVideo, videoFile)
        cleanup()
    }

    const getVideoWithTerm = () => props.getVideo(videoType, term.length > 0 ? term : null)

    return <div className={s.videoPage}>
        <div className={s.videoOptionsBlock}>
            <div className={s.addVideo}>
                <label htmlFor="addVideo" className={s.addVideoLabel}>
                    <span onClick={() => setVideoFormActive(true)}>Загрузити відео</span>
                    <input type="file" id="addVideo" onChange={(e: any) => {
                        setVideoFile(e.target.files[0])
                    }} />
                </label>
                
                {isVideoFormActive
                    && <div className={s.videoForm}>
                        <label htmlFor="">
                            Зробити приватним
                            <input type="checkbox" checked={isPrivatVideo} onChange={e => setPrivatVideo(e.target.checked)} />
                        </label>
                        <input type="text" onChange={(e: any) => setTitleText(e.target.value)}
                            placeholder="Додати назву"
                        />
                        <div className={s.formButtons}>
                            <Button onClick={addVideo} value="Додати" />
                            <Button onClick={cleanup} value="Відмінити" />
                        </div>
                        
                </div>
                }
                
            </div>
            <div className={s.allVideo} onClick={() => setVideoType("common_video")}>Всі</div>
            <div className={s.myVideo}>
                <span onClick={() => isMyVideoOptionsActive ? setMyVideoOptionsActive(false) : setMyVideoOptionsActive(true)}>
                    Мої
                </span>
                {isMyVideoOptionsActive
                    && <div className={s.myVideoType}>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setVideoType("all_my_video")
                                setMyVideoOptionsActive(false)
                        }}>
                            Всі мої
                        </span>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setVideoType("my_privat_video")
                                setMyVideoOptionsActive(false)
                        }}>
                            Мої приватні
                        </span>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setVideoType("my_common_video")
                                setMyVideoOptionsActive(false)
                        }}>
                            Мої публічні
                        </span>
                        <span
                            className={s.myVideoType_item}
                            onClick={() => {
                                setVideoType("added_video")
                                setMyVideoOptionsActive(false)
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
                    getVideoWithTerm()
                }   
            }}
        />
        <Button value="Знайти" onClick={getVideoWithTerm} />
        <div className={s.videoBlock}>
            {videoItems}
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    videoData: state.video.videoData
})

export default connect(mapStateToProps, {addVideo, addCommonVideo, getVideo})(CommonVideo)