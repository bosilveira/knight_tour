import React, { EventHandler, MouseEventHandler } from 'react';

type Data = {
    data: number[][]
}

function Solution({data}:Data) {

    const create = (data: number[][]) => {
        let elements = []
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                elements.push(<div key={`${i}${j}`}>{data[i][j]}</div>)
            }
        }
        return elements
    }

  return (
    <div className="solution">
        {create(data)}
    </div>
  );
}

export default Solution;
