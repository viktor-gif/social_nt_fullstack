import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { io } from "socket.io-client"
import { AppStateType } from "../../../redux/redux-store"

type PropsType = {

}

// let ws = new WebSocket('ws://localhost:4000')

const Chat = React.memo((props: PropsType) => {
console.log('RENDER CHAT')
    const [data, setData] = useState('Default')

    const ws = io()
    

    useEffect(() => {
        ws.on('data', (data) => {
            setData(data.someData)
            console.log(data.someData)
            ws.emit('my event', { my: 'some cool data from me' })
            
        })
        ws.close()
    }, [])

    // const [wsStatus, setWsStatus] = useState('DISCONNECTED')
    // const [messages, setMessages] = useState([])
    // const [currentText, setCurrentText] = useState('')

    // let ws = new WebSocket('ws://localhost:4000')
    // ws.onopen = () => setWsStatus('ONLINE')
    // ws.onclose = () => setWsStatus('DISCONNECTED')
    // ws.onmessage = (response) => {
    //     console.log(response)
    //     setMessages(messages.concat(response.data))
    // }
    // return <div className={s.chat}>
    //     <div>{wsStatus}</div>
    //     <div>
    //         <input type='text' value={currentText} onChange={(e: any) => setCurrentText(e.target.value)} />
    //         <button onClick={() => {
    //             ws.send(currentText)
    //             setCurrentText('')
    //         }
    //         }>Send</button>
    //     </div>
    //     <div>
    //         {messages.map(item => <div key={item}>{item}</div>)}
    //     </div>
    // </div>
    return <div>{data}</div>
})

const mapStateToProps = (state: AppStateType) => ({

})

export default connect(mapStateToProps, {})(Chat)