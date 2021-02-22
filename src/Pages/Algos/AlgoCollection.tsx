import React, { useEffect, useState } from "react";
import {Card, CardBody, CardTitle} from 'reactstrap'
import VisualCube, { OLL_THEME } from '../../components/VisualCube'

import { AlgosDB, AlgosJsonCollection, ollCollection } from "../../database/index";

interface AlgoCollectionProps {
    collection: AlgosJsonCollection,
    title: 'oll' | 'f2l' | 'pll'
}

export default function AlgoCollection(props: AlgoCollectionProps){
    const { collection, title } = props

    return <div className="algo-collection">
        <div className="collection-title">{title.toUpperCase()}</div>
        <div className="collection-list">
            {collection.map( (algo, algoKey) => {
                return <Card key={algoKey} className="collection-elt">
                    <CardBody className="collection-elt-name">
                        <VisualCube
                            solution={algo.algos[0].alg}
                            mask={title === 'pll' ? undefined : title}
                            view={['pll', 'oll'].includes(title) ? 'plan' : undefined}
                            colors={title === 'oll' ? OLL_THEME : undefined}
                            background={'213461'}
                        />
                        <CardTitle tag="h5">{algo.name}</CardTitle>
                        <div className="collection-elt-algo-list">
                            {algo.algos.map( (a, k) => 
                                <div key={k} className="algo-list-elt">
                                    <div className="algo-string">{a.alg}</div>
                                    <div className="algo-votes">{a.votes}</div>
                                </div>
                            )}
                        </div>
                    </CardBody>
                </Card>
            })}
        </div>
    </div>
}