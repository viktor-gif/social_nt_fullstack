import { useEffect, useState } from "react"
import { Add } from "react-ionicons"
import { AppStateType } from "../../../redux/redux-store"
import s from "./groopInfo__additional.module.css"
import { getImgGroop } from "../../../redux/imgReducer"
import { connect } from "react-redux"

type PropsType = {
    groopId: string | undefined

    getImgGroop: (imgType: string, groopId: string, term: string | null) => void
}

const GroopInfo__img = (props: PropsType) => {
    const [isImgFormActive, setImgFormActive] = useState(false)
    const [imgFile, setImgFile] = useState<any>(null)
    const [isPrivatImg, setPrivatImg] = useState(false)
    const [titleText, setTitleText] = useState('')
    const [imgType, setImgType] = useState('all_img')

    useEffect(() => {
        props.groopId && props.getImgGroop(imgType, props.groopId, null)
    }, [])

    const cleanup = () => {
        setImgFormActive(false)
        setImgFile(null)
        setTitleText('')
        setPrivatImg(false)
    }

    const imgData = [{_id: 'ddd', url: 'fsf', title: 'sf'}]

    const imgItems = imgData?.map(v => {
        return <div key={v._id} className={s.img}>
            <img src={v.url} alt="CP" />
            <span>{
                v.title?.length && v.title?.length < 40 ? v.title : v.title?.slice(0, 40) + '...'
            }</span>
            <div className={s.addIcon} onClick={() => {
                // props.addCommonImg(v._id)
            }
            }>
                <Add />
            </div>
        </div>
    })

    return (
        <div>
            <h1>IMG from groopInfo</h1>
            <label htmlFor="addImg" className={s.addImgLabel}>
                <span onClick={() => {
                    setImgFormActive(true)
                }
                }>Загрузити картинку</span>
                <input type="file" id="addImg" onChange={(e: any) => {
                    setImgFile(e.target.files[0])
                }} />
            </label>

            <div className={s.imgBlock}>
            {imgItems}
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    imgData: state.img.imgData
})

export default connect(mapStateToProps, {getImgGroop})(GroopInfo__img)