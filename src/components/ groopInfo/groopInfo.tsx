import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { AppStateType } from "../../redux/redux-store"
import { getGroopInfo } from "../../redux/groopsReducer"
import { GroopType } from "../../ts/groops"

type PropsType = {
    groopInfo: GroopType | null
    getGroopInfo: (groopId: string) => void
}

const GroopInfo = (props: PropsType) => {
    console.log(props.groopInfo)

    const params = useParams()
    console.log(params.groopId)

    useEffect(() => {
        params.groopId && props.getGroopInfo(params.groopId)
    }, [])

    return <div>{props.groopInfo && props.groopInfo._id + props.groopInfo.title}</div>
}

const mapStateToProps = (state: AppStateType) => ({
    groopInfo: state.groops.groopInfo
})

export default connect(mapStateToProps, {
    getGroopInfo
})(GroopInfo)