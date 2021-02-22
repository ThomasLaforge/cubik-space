import React, { useEffect, useState } from "react";

import { AlgosDB, ollCollection, pllCollection, f2lCollection } from "../../database/index";
import { Link } from "react-router-dom";
import AlgoCollection from "./AlgoCollection";

import './style.scss'

export default function Algos(){
    const algoState = AlgosDB.getStates()
    console.log({ algoState })

    return <div className="algos">
        <div className="algos-type-selector">
            <div className="algos-type-selector-elt">
                <Link to='/algos/f2l'>F2L</Link>
            <div className="algos-type-selector-elt">
                <Link to='/algos/oll'>OLL</Link>
            </div>
            <div className="algos-type-selector-elt">
                <Link to='/algos/pll'>PLL</Link></div>
            </div>
        </div>

        <div className="algos-content">
            <AlgoCollection collection={pllCollection} title={'pll'} />
            <AlgoCollection collection={ollCollection} title={'oll'} />
            <AlgoCollection collection={f2lCollection} title={'f2l'} />
        </div>
    </div>
}