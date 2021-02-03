import React, { useState } from "react";
import * as SRScrambler from 'sr-scrambler'

import VisualCube from '../../components/VisualCube'
import Timer from '../../components/Timer';

import './style.scss'
import { db } from "../../renderer";
import { TimeDB } from "../../definitions";
import History from "../../components/History";

export default function Home(){
    const [scramble, setScramble] = useState(SRScrambler.generateHtmlScramble(3, 30))
    const [times, setTimes] = useState(db.get('times') as TimeDB[] || [])

    const handleOnEnd = (time: number) => {
        const currentRecords: TimeDB[] = db.get('times') as TimeDB[] || []
        const newTimes = [...currentRecords, {time: time, timestamp: Date.now()}]
        
        db.set('times', newTimes)
        setTimes(newTimes)
        setScramble(SRScrambler.generateHtmlScramble(3, 30))
    }

    return <div className="home">
        <div className="speed-cubing">
            <div className="scramble">
                {scramble}
            </div>
            <div className="cube-scramble-check">
                <VisualCube
                    scramble={scramble}
                    background={'213461'}
                />
            </div>
            <div className="timer">
                <Timer onEnd={handleOnEnd} />
            </div>
        </div>
        <div className="stats"></div>
        <div className="history-data">
            <History data={times} />
        </div>
    </div>
}