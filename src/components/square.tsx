import React, { EventHandler, MouseEventHandler } from 'react';
import internal from 'stream';
import { FaChessKnight } from "react-icons/fa";

type iSquare = {
    piece?: boolean,
    warnsdorff?: number,
    path?: number,
    color?: string,
    rank?: number,
    file?: number,
    rankLabel?: string | null,
    fileLabel?: string | null,
    selection?: boolean
}

type iProps = {
    data?: iSquare
}

function Square({piece = false, warnsdorff = -1, path = 0, color = 'white', rank = 0, file = 0, rankLabel = null, fileLabel = null, selection = true}: iSquare) {

    const selectHandler = (e: React.MouseEvent<HTMLDivElement>, rank: number, file: number, path: number) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('selectSquare', { bubbles: true, detail: { rank, file, path } }))
    }

    const selectDoubleHandler = (e: React.MouseEvent<HTMLDivElement>, rank: number, file: number, path: number) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('selectDoubleSquare', { bubbles: true, detail: { rank, file, path } }))
    }

    const overHandler = (e: React.MouseEvent<HTMLDivElement>, rank: number, file: number, path: number) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('hoverSquare', { bubbles: true, detail: { rank, file, path } }))
    }
    const outHandler = (e: React.MouseEvent<HTMLDivElement>, rank: number, file: number, path: number) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('hoverSquare', { bubbles: true, detail: { rank: -1, file: -1, path: -1 } }))
    }

  return (
    <div className={ (color == "white" ? "square-white" : "square-black") + (path === 1 ? " initial" : "") + (path === 64 ? " final" : "") }>
        <div className="color">
        </div>
        <div className="file">
            <p>{fileLabel}</p>
        </div>
        <div className="rank">
            <p>{rankLabel}</p>
        </div>
        <div className="path">
            {piece === false && path ? <p>{path}</p> : null }
        </div>
        <div className="warnsdorff">
            {warnsdorff > -1 ? <p>+{warnsdorff}</p> : null }
        </div>
        <div className="piece">
            {piece ? <FaChessKnight/> : null}
        </div>
        <div className={selection ? "selection-true" : "selection-false"} 
            onClick={(e: React.MouseEvent<HTMLDivElement>)=>{selectHandler(e, rank, file, path)}}
            onDoubleClick={(e: React.MouseEvent<HTMLDivElement>)=>{selectDoubleHandler(e, rank, file, path)}}
            onMouseOver={(e: React.MouseEvent<HTMLDivElement>)=>{overHandler(e, rank, file, path)}}
            onMouseOut={(e: React.MouseEvent<HTMLDivElement>)=>{outHandler(e, rank, file, path)}}
        >
            
        </div>
    </div>
  );
}

export default Square;
