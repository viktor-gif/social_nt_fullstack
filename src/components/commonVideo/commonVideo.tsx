import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { addVideo, getVideo } from "../../redux/videoReducer"
import { VideoDataType } from "../../ts/commonVideo"
import { Button } from "../common/button/Button"
import s from "./commonVideo.module.css"

type PropsType = {
    videoData: VideoDataType[] | null

    getVideo: () => void
    addVideo: (title: string | null, isPrivat: boolean, file: any) => void
}

const CommonVideo = (props: PropsType) => {
    const [titleText, setTitleText] = useState('')
    const [videoFile, setVideoFile] = useState<any>(null)
    const [isPrivatVideo, setPrivatVideo] = useState(false)
    const [isvideoFormActive, setVideoFormActive] = useState(false)

    useEffect(() => {
        props.getVideo()
    }, [])

    const videoItems = props.videoData?.filter(v => !v.isPrivat).map(v => {
        return <div key={v._id} className={s.video}>
            <video src={v.url} controls></video>
            <span>{
                v.title?.length && v.title?.length < 40 ? v.title : v.title?.slice(0, 40) + '...'
            }</span>
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

    return <div className={s.videoPage}>
        <div className={s.videoOptionsBlock}>
            <div className={s.addVideo}>
                <label htmlFor="addVideo" className={s.addVideoLabel}>
                    <span onClick={() => setVideoFormActive(true)}>Загрузити відео</span>
                    <input type="file" id="addVideo" onChange={(e: any) => {
                        setVideoFile(e.target.files[0])
                    }} />
                </label>
                {isvideoFormActive
                    && <div className={s.videoForm}>
                        <input type="checkbox" checked={isPrivatVideo} onChange={e => setPrivatVideo(e.target.checked)} />
                
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
        </div>
        <div className={s.videoBlock}>
            {videoItems}
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    videoData: state.video.videoData
})

export default connect(mapStateToProps, {addVideo, getVideo})(CommonVideo)