import { TimeDB } from "../definitions"

import Store from 'electron-store';

class Database {
    constructor(
        protected dbName: string,
        private db = new Store()
    ){}

    getElement(defaultValue: any){
        return (this.db.get(this.dbName) || defaultValue)
    }

    setElement(data: any){
        this.db.set(this.dbName, data)
    }
}

class TimeDatabase extends Database {
    constructor(){
        super('times')
    }

    // alias
    setTimes(data: TimeDB[]){
        this.setElement(data)
    }

    getTimes(){
        return this.getElement([]) as TimeDB[]
    }

    getLastTimes(nb = 5){
        return this.getTimes().sort((a, b) => b.timestamp - a.timestamp).slice(0, nb)
    }
}


interface AlgoState {
    id: number,
    choice: number[]
}
interface AlgoTypeState {
    known: AlgoState[],
    wip: AlgoState[]
}

const defaultAlgoState: AlgoTypeState = {
    known: [],
    wip: []
}

type AlgosStates = {[key: string]: AlgoTypeState}

const AlgoTypes = ['oll', 'pll', 'f2l']
let defaultAlgosStates: AlgosStates = {}
AlgoTypes.forEach(t => {
    defaultAlgosStates[t] = defaultAlgoState
})
class AlgoStatesDB extends Database {

    constructor(){
        super('algo-states')
    }

    getStates() : AlgosStates {
        return this.getElement(defaultAlgosStates)
    }

    setStates(data: AlgosStates){
        this.setElement(data)
    }

    getOllState(){
        const data = this.getStates()
        return data.oll
    }
    
    getF2lState(){
        const data = this.getStates()
        return data.f2l
    }
    
    getPllState(){
        const data = this.getStates()
        return data.pll
    }
}

export const timeDB = new TimeDatabase()
export const AlgosDB = new AlgoStatesDB()

export interface AlgosJsonCollectionElt {
    name: string,
    algos: {
        alg: string,
        votes: number
    }[]
}
export type AlgosJsonCollection = AlgosJsonCollectionElt[]

export const ollCollection = require('./algos/oll.json') as AlgosJsonCollection
export const pllCollection = require('./algos/pll.json') as AlgosJsonCollection
export const f2lCollection = require('./algos/f2l.json') as AlgosJsonCollection