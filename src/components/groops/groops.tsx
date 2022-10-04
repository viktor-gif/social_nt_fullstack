import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { getGroops } from "../../redux/groopsReducer"
import { useEffect } from "react"

type PropsType = {
    groopsData: string | null

    getGroops: () => void
}

const Groops = (props: PropsType) => {

    useEffect(() => {
        props.getGroops()
    }, [])

    return <div>
        Groops
        <h1>{props.groopsData}</h1>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    groopsData: state.groops.groopsData
})

export default connect(mapStateToProps, {
    getGroops
})(Groops)