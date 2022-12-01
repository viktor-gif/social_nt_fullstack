import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { getGroops, createGroop } from "../../redux/groopsReducer"
import { useEffect, useState } from "react"
import { AuthDataType } from "../../ts/auth"

type PropsType = {
    groopsData: any
    authData: AuthDataType | null

    getGroops: () => void
    createGroop: (authorId: string, title: string, groopType: string) => void
}

const Groops = (props: PropsType) => {
    const [groopTitle, setGroopTitle] = useState('')

    useEffect(() => {
        props.getGroops()
    }, [])

    const groopsItems = props.groopsData?.map((g: any) => {
        return <div>
            <h1>{g.title}</h1>
            <div>{g.authorId}</div>
        </div>
    })

    return <div>
        Groops
        {groopsItems}
        
        <input type="text" value={groopTitle} onChange={(e: any) => setGroopTitle(e.target.value)} />
        <button onClick={() => props.authData && props.createGroop(props.authData.id, groopTitle, "public")}>Створити</button>
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