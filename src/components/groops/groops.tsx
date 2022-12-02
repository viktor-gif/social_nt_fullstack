import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { getGroops, createGroop } from "../../redux/groopsReducer"
import { useEffect, useState } from "react"
import { AuthDataType } from "../../ts/auth"
import s from "./groops.module.css"
import { GroopType } from "../../ts/groops"
import { Groop } from "./groop"

type PropsType = {
    groopsData: GroopType[] | null
    authData: AuthDataType | null

    getGroops: () => void
    createGroop: (authorId: string, title: string, groopType: string) => void
}

const Groops = (props: PropsType) => {
    const [groopTitle, setGroopTitle] = useState('')

    console.log(props.groopsData)

    useEffect(() => {
        props.getGroops()
    }, [])

    const groopsItems = props.groopsData && props.groopsData.map(g => {
        return <Groop key={g._id} title={g.title} id={g._id} describeInfo={g.describeInfo}
            mainImg={g.mainImg} type={g.type} followersAmount={g.followers.length} />
    })

    return <div className={s.groops}>
        <h2 className={s.groops__title}>Групи</h2>
        <div className={s.groops__items}>
            {groopsItems}
        </div>
        
        <input type="text" value={groopTitle} onChange={(e: any) => setGroopTitle(e.target.value)} />
        <button onClick={() => props.authData && props.createGroop(props.authData.id, groopTitle, "public")}>
            Створити
        </button>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    groopsData: state.groops.groopsData,
    authData: state.auth.authData
})

export default connect(mapStateToProps, {
    getGroops,
    createGroop
})(Groops)