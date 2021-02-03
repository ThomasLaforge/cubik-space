import dayjs from "dayjs"
import React from "react"
import { TimeDB } from "../definitions"

interface HistoryProps {
    data: TimeDB[]
}
export default function History(props: HistoryProps){
    const times = props.data

    return <div className="history">
        {times.map( (t, k) => {
            return <div className="history-line" key={k}>
                <div className="time">
                    {dayjs(t.time).format('mm:ss:SSS')}
                </div>
                <div className="date">
                    {dayjs(t.timestamp).toString()}
                </div>
            </div>
        })}
    </div>
}