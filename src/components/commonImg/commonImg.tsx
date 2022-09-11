import { useEffect, useState } from "react"
import { Add } from "react-ionicons"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { addImg, getImg, addCommonImg } from "../../redux/imgReducer"
import { ImgDataType } from "../../ts/commonImg"
import { Button } from "../common/button/Button"
import { SearchInput } from "../common/searchInput/SearchInput"
import s from "./commonImg.module.css"

type PropsType = {
    imgData: ImgDataType[] | null

    getImg: (imgType: string, term: string | null) => void
    addImg: (title: string | null, isPrivat: boolean, file: any) => void
    addCommonImg: (imgId: string) => void
}

const CommonImg = (props: PropsType) => {
    const [titleText, setTitleText] = useState('')
    const [imgFile, setImgFile] = useState<any>(null)
    const [isPrivatImg, setPrivatImg] = useState(false)
    const [isImgFormActive, setImgFormActive] = useState(false)
    const [isMyImgOptionsActive, setMyImgOptionsActive] = useState(false)
    const [imgType, setImgType] = useState("common_img")
    const [term, setTerm] = useState('')

    useEffect(() => {
        props.getImg(imgType, null)
    }, [imgType])

    const imgItems = props.imgData?.map(v => {
        return <div key={v._id} className={s.img}>
            <img src={v.url} alt="CP" />
            <span>{
                v.title?.length && v.title?.length < 40 ? v.title : v.title?.slice(0, 40) + '...'
            }</span>
            <div className={s.addIcon} onClick={() => {
                props.addCommonImg(v._id)
            }
            }>
                <Add />
            </div>
        </div>
    })

    const cleanup = () => {
        setImgFormActive(false)
        setImgFile(null)
        setTitleText('')
        setPrivatImg(false)
    }

    const addImg = () => {
        props.addImg(titleText, isPrivatImg, imgFile)
        cleanup()
    }

    const getImgWithTerm = () => props.getImg(imgType, term.length > 0 ? term : null)

    return <div className={s.imgPage}>
        <div className={s.imgOptionsBlock}>
            <div className={s.addImg}>
                <label htmlFor="addImg" className={s.addImgLabel}>
                    <span onClick={() => setImgFormActive(true)}>Загрузити картинку</span>
                    <input type="file" id="addImg" onChange={(e: any) => {
                        setImgFile(e.target.files[0])
                    }} />
                </label>
                
                {isImgFormActive
                    && <div className={s.imgForm}>
                        <label htmlFor="">
                            Зробити приватною
                            <input type="checkbox" checked={isPrivatImg} onChange={e => setPrivatImg(e.target.checked)} />
                        </label>
                        <input type="text" onChange={(e: any) => setTitleText(e.target.value)}
                            placeholder="Додати назву"
                        />
                        <div className={s.formButtons}>
                            <Button onClick={addImg} value="Додати" />
                            <Button onClick={cleanup} value="Відмінити" />
                        </div>
                        
                </div>
                }
                
            </div>
            <div className={s.allImg} onClick={() => setImgType("common_img")}>Всі</div>
            <div className={s.myImg}>
                <span onClick={() => isMyImgOptionsActive ? setMyImgOptionsActive(false) : setMyImgOptionsActive(true)}>
                    Мої
                </span>
                {isMyImgOptionsActive
                    && <div className={s.myImgType}>
                        <span
                            className={s.myImgType_item}
                            onClick={() => {
                                setImgType("all_my_img")
                                setMyImgOptionsActive(false)
                        }}>
                            Всі мої
                        </span>
                        <span
                            className={s.myImgType_item}
                            onClick={() => {
                                setImgType("my_privat_img")
                                setMyImgOptionsActive(false)
                        }}>
                            Мої приватні
                        </span>
                        <span
                            className={s.myImgType_item}
                            onClick={() => {
                                setImgType("my_common_img")
                                setMyImgOptionsActive(false)
                        }}>
                            Мої публічні
                        </span>
                        <span
                            className={s.myImgType_item}
                            onClick={() => {
                                setImgType("added_img")
                                setMyImgOptionsActive(false)
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
                    getImgWithTerm()
                }   
            }}
        />
        <Button value="Знайти" onClick={getImgWithTerm} />
        <div className={s.imgBlock}>
            {imgItems}
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    imgData: state.img.imgData
})

export default connect(mapStateToProps, {addImg, addCommonImg, getImg})(CommonImg)