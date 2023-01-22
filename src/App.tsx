import React from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './components/square';
import { FaChessKnight, FaRegFlag, FaFlagCheckered, FaCalculator, FaRegCompass } from "react-icons/fa";
import Solution from './components/solution';

function App() {

  const msgEN = {
    1: "Please, select a square on the chessboard to serve as the initial position of your knight.",
    2: "Once you have chosen your initial square, double click it to reset the configuration. Otherwise, select a second square of the opposite color to act as the goal of your knight's tour.",
    3: "You have just set an open knight's tour. To reset the ending position, double click the destination square.",
    4: "You have just set a closed knight's tour. To reset the ending position, double click the destination square.",
    5: "Warnsdorff's Rule is represented by integer numbers; choose the smallest, non-zero integer to determine which of the knight's possible moves it should take next. At any moment, double click the previous visited square to reset the position.",
    6: "Great job! Please take a moment to visit twitter.com/van_der_Haegen.",
    7: "To solve the Knight's Tour problem, double-click any square on the chessboard to reset the knight's path to that spot."
  }

  const msgJP = {
    1: "始めに、ナイトツアーの開始位置としてチェス盤の一つのマスを選択してください。",
    2: "初期のマスをダブルクリックすると構成がリセットされます。または、ナイトツアーの終了位置として反対の色の2番目のマスを選択することもできます。",
    3: "これでオープンナイトツアーを設定しました。終了位置をリセットするには、目的地のマスをダブルクリックしてください。",
    4: "これでクローズドナイトツアーを設定しました。終了位置をリセットするには、目的地のマスをダブルクリックしてください。",
    5: "ワーンズドルフのルールは整数で表されます。このルールは、最小非0整数を持つマスに移動することを指示しています。あなたは自由に行動を試すことができます。任意の位置をリセットするには、以前に訪れたマスをダブルクリックしてください。",
    6: "グレートジョブ！ twitter.com/van_der_Haegenを訪れてみてください。",
    7: "ナイトツアーの問題を解決するために、チェス盤の任意のマスをダブルクリックして、ナイトのパスをその場所にリセットします。"
  }

  const msgFR = {
    1: "Veuillez sélectionner une case sur l'échiquier pour servir de position initiale pour votre cavalier.",
    2: "Double-cliquez sur la case initiale pour réinitialiser la configuration, ou, sélectionnez une deuxième case de couleur opposée pour servir de destination pour le tour du cavalier.",
    3: "Vous avez désormais mis en place un tour ouvert du cavalier. Pour réinitialiser la position finale, double-cliquez sur la case de destination.",
    4: "Vous avez désormais mis en place un tour fermé du cavalier. Pour réinitialiser la position finale, double-cliquez sur la case de destination.",
    5: "La règle de Warnsdorff est représentée par des nombres entiers. Cette règle nous indique de se déplacer vers la case avec le plus petit nombre entier non nul. Vous pouvez expérimenter n'importe quel mouvement que vous souhaitez. Pour réinitialiser la position, double-cliquez sur la case précédemment visitée à tout moment.",
    6: "Félicitations! Veuillez prendre un moment pour visiter twitter.com/van_der_Haegen.",
    7: "Pour résoudre le problème du cavalier, double-cliquez sur n'importe quel carré sur l'échiquier pour réinitialiser le chemin du cavalier à cet endroit."
  }


  const [ board, setBoard ] = React.useState(
    [[0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0]]);

  const resetBoard = () => {
    let array =  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]]
    setBoard(array)
  }

  const [ initialRank, setInitialRank ] = React.useState(-1)
  const [ initialFile, setInitialFile ] = React.useState(-1)
  const [ finalRank, setFinalRank ] = React.useState(-1)
  const [ finalFile, setFinalFile ] = React.useState(-1)
  const [ pointer, setPointer ] = React.useState([-1, -1])
  const [ step, setStep ] = React.useState(0)
  const [ stepRank, setStepRank ] = React.useState(-1)
  const [ stepFile, setStepFile ] = React.useState(-1)

  React.useEffect(()=>{
    document.addEventListener('selectSquare', selectHandle as EventListener);
    document.addEventListener('selectDoubleSquare', selectDoubleHandle as EventListener);
    document.addEventListener('hoverSquare', hoverHandle as EventListener);
    return () => {
      document.removeEventListener("selectSquare", selectHandle as EventListener);
      document.addEventListener('selectDoubleSquare', selectDoubleHandle as EventListener);
      document.addEventListener('hoverSquare', hoverHandle as EventListener);
    };
  },[initialFile, initialRank, finalFile, finalRank, step])

  const checkDestination = (rank: number, file: number) => {
    let flag = true
    if (initialRank === rank && initialFile === file) {
      flag = false
    }
    if (initialRank % 2 === initialFile % 2 && rank % 2 === file % 2) {
      flag = false
    }
    if (initialRank % 2 !== initialFile % 2 && rank % 2 !== file % 2) {
      flag = false
    }
    return flag  
  }


  const selectHandle = (e: CustomEvent) => {
    if (step > 1 && step < 64 && e.detail.path === 0 && checkMove(e.detail.rank,e.detail.file)) {
      setBoard(previous=>{ previous[e.detail.rank][e.detail.file] = step; return previous })
      setStep(step => step + 1)
      setStepRank(e.detail.rank)
      setStepFile(e.detail.file)
    }
    if (step === 1 && e.detail.path === 0 && checkDestination(e.detail.rank,e.detail.file)) {
      setBoard(previous=>{ previous[e.detail.rank][e.detail.file] = 64; return previous })
      setFinalRank(e.detail.rank)
      setFinalFile(e.detail.file)
      setStep(2)
    }
    if (step === 0 && e.detail.path === 0) {
      setBoard(previous=>{ previous[ e.detail.rank][e.detail.file] = 1; return previous })
      setInitialRank(e.detail.rank)
      setInitialFile(e.detail.file)
      setStepRank(e.detail.rank)
      setStepFile(e.detail.file)
      setStep(1)
    }
  }

  const selectDoubleHandle = (e: CustomEvent) => {
    if (e.detail.path > 1 && e.detail.path < 64) {
      setStep(e.detail.path + 1)
      setStepRank(e.detail.rank)
      setStepFile(e.detail.file)
      clearBoard(e.detail.path)
    } 

    if (finalRank === e.detail.rank && finalFile === e.detail.file) {
      setFinalRank(-1)
      setFinalFile(-1)
      setStep(1)
      setStepRank(initialRank)
      setStepFile(initialFile)
      resetBoard()
      setBoard(previous=>{ previous[initialRank][initialFile] = 1; return previous })
    }
    if (initialRank === e.detail.rank && initialFile === e.detail.file) {
      setInitialRank(-1)
      setInitialFile(-1)
      setFinalRank(-1)
      setFinalFile(-1)
      setStep(0)
      setStepRank(-1)
      setStepFile(-1)
      resetBoard()
    } 
  }

  const clearBoard = (nstep: number) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] > nstep && board[i][j] !== 64 && board[i][j] !== 1) {
          setBoard(previous=>{ previous[i][j] = 0; return previous })
        }
      }
    }
  }


  const hoverHandle = (e: CustomEvent) => {
    setPointer([e.detail.rank, e.detail.file])
  }

    const checkCloseness = () =>{
      return (Math.abs(initialRank - finalRank) == 1 && Math.abs(initialFile - finalFile) == 2) || (Math.abs(initialRank - finalRank) == 2 && Math.abs(initialFile - finalFile) == 1)
    }

    const checkMove = (rank: number, file: number) => {
      return (Math.abs(stepRank - rank) == 1 && Math.abs(stepFile - file) == 2) || (Math.abs(stepRank - rank) == 2 && Math.abs(stepFile - file) == 1)
    }

    const getPath = (rank: number, file: number) => {
      if (rank < 0 || rank > 7 || file < 0 || file > 7) {
        return -1
      } else {
        return board[rank][file]
      }
    }

    const getKnight = (rank: number, file: number) => {
      return step > 1 && step < 64 && stepRank === rank && stepFile === file
    }

    const getWarnsdorff = (rank: number, file: number) => {
      if (step > 1 && step < 63 && checkMove(rank,file) && board[rank][file] === 0) {
        let moves = [ 
          getPath(rank + 1, file + 2) === 0 ? 1 : 0,
          getPath(rank + 2, file + 1) === 0 ? 1 : 0,
          getPath(rank + 1, file - 2) === 0 ? 1 : 0,
          getPath(rank + 2, file - 1) === 0 ? 1 : 0,
          getPath(rank - 1, file + 2) === 0 ? 1 : 0,
          getPath(rank - 2, file + 1) === 0 ? 1 : 0,
          getPath(rank - 1, file - 2) === 0 ? 1 : 0,
          getPath(rank - 2, file - 1) === 0 ? 1 : 0,
         ]
        return moves.reduce((total, num)=> total + num, 0)
      }
      if (step === 63 && checkMove(rank,file) && board[rank][file] === 0) {
        let moves = [ 
          getPath(rank + 1, file + 2) === 64 ? 1 : 0,
          getPath(rank + 2, file + 1) === 64 ? 1 : 0,
          getPath(rank + 1, file - 2) === 64 ? 1 : 0,
          getPath(rank + 2, file - 1) === 64 ? 1 : 0,
          getPath(rank - 1, file + 2) === 64 ? 1 : 0,
          getPath(rank - 2, file + 1) === 64 ? 1 : 0,
          getPath(rank - 1, file - 2) === 64 ? 1 : 0,
          getPath(rank - 2, file - 1) === 64 ? 1 : 0,
         ]
        return moves.reduce((total, num)=> total + num, 0) 
      }
  }

  const checkWin = () => {
    if (step === 64) {
      let moves = [ 
        getPath(stepRank + 1, stepFile + 2) === 64 ? 1 : 0,
        getPath(stepRank + 2, stepFile + 1) === 64 ? 1 : 0,
        getPath(stepRank + 1, stepFile - 2) === 64 ? 1 : 0,
        getPath(stepRank + 2, stepFile - 1) === 64 ? 1 : 0,
        getPath(stepRank - 1, stepFile + 2) === 64 ? 1 : 0,
        getPath(stepRank - 2, stepFile + 1) === 64 ? 1 : 0,
        getPath(stepRank - 1, stepFile - 2) === 64 ? 1 : 0,
        getPath(stepRank - 2, stepFile - 1) === 64 ? 1 : 0,
       ]
      return moves.reduce((total, num)=> total + num, 0)
    }

    let moves = [ 
      getPath(stepRank + 1, stepFile + 2) === 0 ? 1 : 0,
      getPath(stepRank + 2, stepFile + 1) === 0 ? 1 : 0,
      getPath(stepRank + 1, stepFile - 2) === 0 ? 1 : 0,
      getPath(stepRank + 2, stepFile - 1) === 0 ? 1 : 0,
      getPath(stepRank - 1, stepFile + 2) === 0 ? 1 : 0,
      getPath(stepRank - 2, stepFile + 1) === 0 ? 1 : 0,
      getPath(stepRank - 1, stepFile - 2) === 0 ? 1 : 0,
      getPath(stepRank - 2, stepFile - 1) === 0 ? 1 : 0,
   ]
    let count = moves.reduce((total, num)=> total + num, 0) 
    if (count === 0) {
      return 0
    }
    return -1
  }


  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (initialRank !== -1 && initialFile !== -1 && finalRank !== -1 && finalRank !== -1) {
      fetch('https://www.vanderhaegen.com.br/knight_tour/' + initialRank.toString() + initialFile.toString() + finalRank.toString() + finalFile.toString() + '/')
      .then((res) => res.json())
      .then((data) => setData(data));
    } else {
      setData({})
    }
  }, [initialRank, initialFile, finalRank, finalFile]);

  const getSolutions = () => {
    let elements = [] as JSX.Element[]
    if (Object.values(data).length !== 0) {
      let s = Object.values(data)[0] as Object
      if (Object.values(s).length !== 0) {
        let solutions = Object.values(s) as number[][][]
        elements = solutions.map((e,i)=><Solution key={i} data={e}/>)
      }
    }
    return elements
  }

  return (
    <div className="App">
      <h1>Hippogonal Tour</h1>
      <h2>by VanDerHaegen</h2>
      <div className='text'>
        <p className='en'>A Knight's Tour is a sequence of moves on a chessboard whereby a knight visits each square only once and ends on the same square it started from. This is an example of the "Hamiltonian path problem" in graph theory, with the number of possible closed tours on an 8x8 board estimated at 26,534,728,821,064. To aid in finding a single tour, Warnsdorff's Rule is a heuristic which guides the knight to always move to the square with the fewest possible onward moves.</p>
        <p className='jp'>ナイトツアーとは、チェス盤上のナイトがそれぞれのマスを1回ずつ訪問する移動シーケンスのことです。そして、これをクローズドツアーといいます。8行8列のチェス盤では、クローズドツアーのパターンは26,534,728,821,064通りあります。これはグラフ理論における「ハミルトン経路問題(Hamiltonian path problem)」の例です。ワンズドルフのルールは、1つのナイトツアーを見つけるためのヒューリスティック(近似法)で、ナイトを常に可能な移動先が最も少ないマスに移動させることを指示します。</p>
        <p className='fr'>Le problème du Tour du Cavalier consiste à trouver un parcours qui permette à un cavalier de visiter chacune des cases de l'échiquier, une seule fois et de revenir à sa case de départ. Il s'agit d'un cas particulier des graphes Hamiltoniens dans la théorie des graphes. L'heuristique de Warnsdorff peut être utilisée pour résoudre ce problème en déplaçant le cavalier de telle sorte qu'il ait le moins de mouvements possibles. Sur un échiquier 8 × 8, il existe exactement 26 534 728 821 064 tours fermés dirigés.</p>
      </div>

      <div className='board'>
        <div className='instructions'>
          <div className='display'>
            {initialRank >= 0 && initialFile >= 0 ? <p>1&nbsp;<FaRegFlag/>&nbsp;<span>{initialRank + 1}{['A','B','C','D','E','F','G','H'][initialFile]}</span></p> : <p className='off'>1&nbsp;<FaRegFlag/></p>}
            {finalRank >= 0 && finalFile >= 0 ? <p>64&nbsp;<FaFlagCheckered/>&nbsp;<span>{finalRank + 1}{['A','B','C','D','E','F','G','H'][finalFile]}</span></p> : <p className='off'>64&nbsp;<FaFlagCheckered/></p>}
            {finalRank >= 0 && finalFile >= 0 && step >= 1 ? <p>{step-1}&nbsp;<FaChessKnight/>&nbsp;<span>{stepRank + 1}{['A','B','C','D','E','F','G','H'][stepFile]}</span></p> : <p className='off'><FaChessKnight/></p>}
          </div>
          {initialRank === -1 ? <><p>{msgEN['1']}</p><p>{msgJP['1']}</p><p>{msgFR['1']}</p></> : null}
          {initialRank !== -1 && finalRank === -1 ? <><p>{msgEN['2']}</p><p>{msgJP['2']}</p><p>{msgFR['2']}</p></> : null}
          {checkWin() === -1 && checkMove(pointer[0],pointer[1]) === false && initialRank !== -1 && finalRank !== -1 ? <><p>{checkCloseness() ? msgEN['4'] : msgEN['3']}</p><p>{msgJP['3']}</p><p>{msgFR['3']}</p></> : null}
          {checkWin() === -1 && checkMove(pointer[0],pointer[1]) && initialRank !== -1 && finalRank !== -1 ? <><p>{msgEN['5']}</p><p>{msgJP['5']}</p><p>{msgFR['5']}</p></> : null}
          {checkWin() === 1 ? <><p>{msgEN['6']}</p><p>{msgJP['6']}</p><p>{msgFR['6']}</p></> : null}{checkWin() === 0 ? <><p>{msgEN['7']}</p><p>{msgJP['7']}</p><p>{msgFR['7']}</p></> : null}
        </div> 
        <div className='chess'>

          <Square rank={7} file={0} color={'white'} path={getPath(7,0)} warnsdorff={getWarnsdorff(7,0)} piece={getKnight(7,0)} rankLabel={'8'}/>
          <Square rank={7} file={1} color={'black'} path={getPath(7,1)} warnsdorff={getWarnsdorff(7,1)} piece={getKnight(7,1)}/>
          <Square rank={7} file={2} color={'white'} path={getPath(7,2)} warnsdorff={getWarnsdorff(7,2)} piece={getKnight(7,2)}/>
          <Square rank={7} file={3} color={'black'} path={getPath(7,3)} warnsdorff={getWarnsdorff(7,3)} piece={getKnight(7,3)}/>
          <Square rank={7} file={4} color={'white'} path={getPath(7,4)} warnsdorff={getWarnsdorff(7,4)} piece={getKnight(7,4)}/>
          <Square rank={7} file={5} color={'black'} path={getPath(7,5)} warnsdorff={getWarnsdorff(7,5)} piece={getKnight(7,5)}/>
          <Square rank={7} file={6} color={'white'} path={getPath(7,6)} warnsdorff={getWarnsdorff(7,6)} piece={getKnight(7,6)}/>
          <Square rank={7} file={7} color={'black'} path={getPath(7,7)} warnsdorff={getWarnsdorff(7,7)} piece={getKnight(7,7)}/>

          <Square rank={6} file={0} color={'black'} path={getPath(6,0)} warnsdorff={getWarnsdorff(6,0)} piece={getKnight(6,0)} rankLabel={'7'}/>
          <Square rank={6} file={1} color={'white'} path={getPath(6,1)} warnsdorff={getWarnsdorff(6,1)} piece={getKnight(6,1)}/>
          <Square rank={6} file={2} color={'black'} path={getPath(6,2)} warnsdorff={getWarnsdorff(6,2)} piece={getKnight(6,2)}/>
          <Square rank={6} file={3} color={'white'} path={getPath(6,3)} warnsdorff={getWarnsdorff(6,3)} piece={getKnight(6,3)}/>
          <Square rank={6} file={4} color={'black'} path={getPath(6,4)} warnsdorff={getWarnsdorff(6,4)} piece={getKnight(6,4)}/>
          <Square rank={6} file={5} color={'white'} path={getPath(6,5)} warnsdorff={getWarnsdorff(6,5)} piece={getKnight(6,5)}/>
          <Square rank={6} file={6} color={'black'} path={getPath(6,6)} warnsdorff={getWarnsdorff(6,6)} piece={getKnight(6,6)}/>
          <Square rank={6} file={7} color={'white'} path={getPath(6,7)} warnsdorff={getWarnsdorff(6,7)} piece={getKnight(6,7)}/>

          <Square rank={5} file={0} color={'white'} path={getPath(5,0)} warnsdorff={getWarnsdorff(5,0)} piece={getKnight(5,0)} rankLabel={'6'}/>
          <Square rank={5} file={1} color={'black'} path={getPath(5,1)} warnsdorff={getWarnsdorff(5,1)} piece={getKnight(5,1)}/>
          <Square rank={5} file={2} color={'white'} path={getPath(5,2)} warnsdorff={getWarnsdorff(5,2)} piece={getKnight(5,2)}/>
          <Square rank={5} file={3} color={'black'} path={getPath(5,3)} warnsdorff={getWarnsdorff(5,3)} piece={getKnight(5,3)}/>
          <Square rank={5} file={4} color={'white'} path={getPath(5,4)} warnsdorff={getWarnsdorff(5,4)} piece={getKnight(5,4)}/>
          <Square rank={5} file={5} color={'black'} path={getPath(5,5)} warnsdorff={getWarnsdorff(5,5)} piece={getKnight(5,5)}/>
          <Square rank={5} file={6} color={'white'} path={getPath(5,6)} warnsdorff={getWarnsdorff(5,6)} piece={getKnight(5,6)}/>
          <Square rank={5} file={7} color={'black'} path={getPath(5,7)} warnsdorff={getWarnsdorff(5,7)} piece={getKnight(5,7)}/>

          <Square rank={4} file={0} color={'black'} path={getPath(4,0)} warnsdorff={getWarnsdorff(4,0)} piece={getKnight(4,0)} rankLabel={'5'}/>
          <Square rank={4} file={1} color={'white'} path={getPath(4,1)} warnsdorff={getWarnsdorff(4,1)} piece={getKnight(4,1)}/>
          <Square rank={4} file={2} color={'black'} path={getPath(4,2)} warnsdorff={getWarnsdorff(4,2)} piece={getKnight(4,2)}/>
          <Square rank={4} file={3} color={'white'} path={getPath(4,3)} warnsdorff={getWarnsdorff(4,3)} piece={getKnight(4,3)}/>
          <Square rank={4} file={4} color={'black'} path={getPath(4,4)} warnsdorff={getWarnsdorff(4,4)} piece={getKnight(4,4)}/>
          <Square rank={4} file={5} color={'white'} path={getPath(4,5)} warnsdorff={getWarnsdorff(4,5)} piece={getKnight(4,5)}/>
          <Square rank={4} file={6} color={'black'} path={getPath(4,6)} warnsdorff={getWarnsdorff(4,6)} piece={getKnight(4,6)}/>
          <Square rank={4} file={7} color={'white'} path={getPath(4,7)} warnsdorff={getWarnsdorff(4,7)} piece={getKnight(4,7)}/>

          <Square rank={3} file={0} color={'white'} path={getPath(3,0)} warnsdorff={getWarnsdorff(3,0)} piece={getKnight(3,0)} rankLabel={'4'}/>
          <Square rank={3} file={1} color={'black'} path={getPath(3,1)} warnsdorff={getWarnsdorff(3,1)} piece={getKnight(3,1)}/>
          <Square rank={3} file={2} color={'white'} path={getPath(3,2)} warnsdorff={getWarnsdorff(3,2)} piece={getKnight(3,2)}/>
          <Square rank={3} file={3} color={'black'} path={getPath(3,3)} warnsdorff={getWarnsdorff(3,3)} piece={getKnight(3,3)}/>
          <Square rank={3} file={4} color={'white'} path={getPath(3,4)} warnsdorff={getWarnsdorff(3,4)} piece={getKnight(3,4)}/>
          <Square rank={3} file={5} color={'black'} path={getPath(3,5)} warnsdorff={getWarnsdorff(3,5)} piece={getKnight(3,5)}/>
          <Square rank={3} file={6} color={'white'} path={getPath(3,6)} warnsdorff={getWarnsdorff(3,6)} piece={getKnight(3,6)}/>
          <Square rank={3} file={7} color={'black'} path={getPath(3,7)} warnsdorff={getWarnsdorff(3,7)} piece={getKnight(3,7)}/>

          <Square rank={2} file={0} color={'black'} path={getPath(2,0)} warnsdorff={getWarnsdorff(2,0)} piece={getKnight(2,0)} rankLabel={'3'}/>
          <Square rank={2} file={1} color={'white'} path={getPath(2,1)} warnsdorff={getWarnsdorff(2,1)} piece={getKnight(2,1)}/>
          <Square rank={2} file={2} color={'black'} path={getPath(2,2)} warnsdorff={getWarnsdorff(2,2)} piece={getKnight(2,2)}/>
          <Square rank={2} file={3} color={'white'} path={getPath(2,3)} warnsdorff={getWarnsdorff(2,3)} piece={getKnight(2,3)}/>
          <Square rank={2} file={4} color={'black'} path={getPath(2,4)} warnsdorff={getWarnsdorff(2,4)} piece={getKnight(2,4)}/>
          <Square rank={2} file={5} color={'white'} path={getPath(2,5)} warnsdorff={getWarnsdorff(2,5)} piece={getKnight(2,5)}/>
          <Square rank={2} file={6} color={'black'} path={getPath(2,6)} warnsdorff={getWarnsdorff(2,6)} piece={getKnight(2,6)}/>
          <Square rank={2} file={7} color={'white'} path={getPath(2,7)} warnsdorff={getWarnsdorff(2,7)} piece={getKnight(2,7)}/>

          <Square rank={1} file={0} color={'white'} path={getPath(1,0)} warnsdorff={getWarnsdorff(1,0)} piece={getKnight(1,0)} rankLabel={'2'}/>
          <Square rank={1} file={1} color={'black'} path={getPath(1,1)} warnsdorff={getWarnsdorff(1,1)} piece={getKnight(1,1)}/>
          <Square rank={1} file={2} color={'white'} path={getPath(1,2)} warnsdorff={getWarnsdorff(1,2)} piece={getKnight(1,2)}/>
          <Square rank={1} file={3} color={'black'} path={getPath(1,3)} warnsdorff={getWarnsdorff(1,3)} piece={getKnight(1,3)}/>
          <Square rank={1} file={4} color={'white'} path={getPath(1,4)} warnsdorff={getWarnsdorff(1,4)} piece={getKnight(1,4)}/>
          <Square rank={1} file={5} color={'black'} path={getPath(1,5)} warnsdorff={getWarnsdorff(1,5)} piece={getKnight(1,5)}/>
          <Square rank={1} file={6} color={'white'} path={getPath(1,6)} warnsdorff={getWarnsdorff(1,6)} piece={getKnight(1,6)}/>
          <Square rank={1} file={7} color={'black'} path={getPath(1,7)} warnsdorff={getWarnsdorff(1,7)} piece={getKnight(1,7)}/>

          <Square rank={0} file={0} color={'black'} path={getPath(0,0)} warnsdorff={getWarnsdorff(0,0)} piece={getKnight(0,0)} rankLabel={'1'} fileLabel={'A'}/>
          <Square rank={0} file={1} color={'white'} path={getPath(0,1)} warnsdorff={getWarnsdorff(0,1)} piece={getKnight(0,1)} fileLabel={'B'}/>
          <Square rank={0} file={2} color={'black'} path={getPath(0,2)} warnsdorff={getWarnsdorff(0,2)} piece={getKnight(0,2)} fileLabel={'C'}/>
          <Square rank={0} file={3} color={'white'} path={getPath(0,3)} warnsdorff={getWarnsdorff(0,3)} piece={getKnight(0,3)} fileLabel={'D'}/>
          <Square rank={0} file={4} color={'black'} path={getPath(0,4)} warnsdorff={getWarnsdorff(0,4)} piece={getKnight(0,4)} fileLabel={'E'}/>
          <Square rank={0} file={5} color={'white'} path={getPath(0,5)} warnsdorff={getWarnsdorff(0,5)} piece={getKnight(0,5)} fileLabel={'F'}/>
          <Square rank={0} file={6} color={'black'} path={getPath(0,6)} warnsdorff={getWarnsdorff(0,6)} piece={getKnight(0,6)} fileLabel={'G'}/>
          <Square rank={0} file={7} color={'white'} path={getPath(0,7)} warnsdorff={getWarnsdorff(0,7)} piece={getKnight(0,7)} fileLabel={'H'}/>

        </div>

      </div>
      <div className='solutions'>
        <div className='solutions-list'>
        {initialRank !== -1 && finalRank !== -1 ? <>
          <div className='solution-presentation'>
            <p>These are some suggested solutions to the knight's tour problem. We hope these examples will help you find the solution to this challenging problem.</p>
            <p>ナイトツアーの問題のいくつかの解決策をご紹介します。これらの例を参考に、この難問の解決策を見つけられることを願っています。</p>
            <p>Voici quelques solutions suggérées au problème du cavalier. Nous espérons que ces exemples vous aideront à trouver la solution à ce problème stimulant.</p>
            </div>
          {getSolutions()}
          </> : null }     
        </div>
      </div>     
      <div className='text'>
        <p className='en'>To attempt a knight’s tour on the virtual chessboard, begin by selecting a starting and ending square. If the ending square is one knight’s move away from the starting square, the tour is considered closed (or re-entrant). Otherwise, it is open. For assistance, each square on the board contains an integer that indicates the number of moves the knight can make from that square. This follows Warnsdorff’s Rule, which states that the knight should move to the square with the smallest integer.</p>
        <p className='jp'>仮想チェス盤上でナイトツアーを試みるには、スタートと終了スクウェアを選択します。終了スクウェアがスタートスクウェアからナイトの1手先にある場合、ツアーは閉じられる（または再入）とみなされます。そうでない場合は開いています。支援のために、ボード上の各スクウェアにはナイトがそのスクウェアから移動できる手数を示す整数が含まれています。これはワーンスドルフルールに従います。このルールは、ナイトが最も小さい整数を持つスクウェアに移動するようにします。</p>
        <p className='fr'>Pour essayer de résoudre le problème du tour du cavalier sur l'échiquier virtuel, commencez par sélectionner une case de départ et une case d'arrivée. Si la case d'arrivée est à une case de cavalier de la case de départ, la tournée est considérée comme fermée (ou ré-entrante). Sinon, elle est ouverte. Pour obtenir de l'aide, chaque case sur le plateau contient un entier qui indique le nombre de mouvements que le cavalier peut effectuer à partir de cette case. Cela suit la règle de Warnsdorff, qui stipule que le cavalier doit se déplacer vers la case avec le plus petit entier.</p>
      </div>
      <div className='footer'>@van_der_Haegen</div>
    </div>

  );
}

export default App;
