import { useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../redux/redux-store"
import s from "./chat.module.css"

type PropsType = {

}

// let ws = new WebSocket('ws://localhost:4000')

const Chat = (props: PropsType) => {

    const [wsStatus, setWsStatus] = useState('DISCONNECTED')
    const [messages, setMessages] = useState([])
    const [currentText, setCurrentText] = useState('')

    let ws = new WebSocket('ws://localhost:4000')
    ws.onopen = () => setWsStatus('ONLINE')
    ws.onclose = () => setWsStatus('DISCONNECTED')
    ws.onmessage = (response) => {
        console.log(response.data)
        setMessages(messages.concat(response.data))
    }
    console.log(ws)
    return <div className={s.chat}>
        <div>{wsStatus}</div>
        <div>
            <input type='text' value={currentText} onChange={(e: any) => setCurrentText(e.target.value)} />
            <button onClick={() => {
                ws.send(currentText)
                setCurrentText('')
            }
            }>Send</button>
        </div>
        <div>
            {messages.map(item => <div>{item}</div>)}
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({

})

export default connect(mapStateToProps, {})(Chat)