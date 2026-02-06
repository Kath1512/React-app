import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
    const initalBoard = new Array(3).fill(new Array(3).fill(''));
    const defaultScoreLimit = 1;
    const N = 3;
    let isMatchOver = false;

    const [board, setBoard] = useState(initalBoard);
    const [isPlayerOne, setIsPlayerOne] = useState(true);
    const [gameState, setGameState] = useState(0);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [scoreLimit, setScoreLimit] = useState(defaultScoreLimit);
    const [isSavedScoreLimit, setIsSavedScoreLimit] = useState(true);


    useEffect(() => {
        //check rows
        const checkGameState = () => {
            //win-lose
            const checkX = tile => tile == 'X';
            const checkO = tile => tile == 'O';
            const check = (arr) => arr.every(checkX) || arr.every(checkO);
            board.forEach((row) => (check(row) && setGameState(1)));
            console.log(gameState);
                // check column
            let col = [];
            for (let i = 0; i < N; i++) {
                col = [];
                for (let j = 0; j < N; ++j) {
                    col.push(board[j][i])
                }
                (check(col) && setGameState(1));
            }
                // check diagonal
            let mainDiagonal = [];
            let secondaryDiagonal = [];
            for (let i = 0; i < N; ++i) {
                mainDiagonal.push(board[i][i]);
                secondaryDiagonal.push(board[i][N - 1 - i]);
            }
            (check(mainDiagonal) && setGameState(1));
            (check(secondaryDiagonal) && setGameState(1));
            //tie
            let canMove = false;
            board.forEach((row) => {
                canMove |= row.some(tile => tile == '') 
            })
            setGameState(prevState => {
                if(!canMove && prevState == 0){
                    return 2;
                }
                else{
                    return prevState;
                }
            })

        }
        checkGameState();
    }, [board])


    function handleRestart() {
        setGameState(0);
        setBoard(initalBoard);
        setIsPlayerOne(true);
        if(gameState === 1){
            updateScore();
        }
        isMatchOver = false;
    }

    function updateScore(){
        (!isPlayerOne ? setPlayerOneScore(score => score + 1) : setPlayerTwoScore(score => score + 1));
    }


    if(playerOneScore === scoreLimit || playerTwoScore === scoreLimit){
        isMatchOver = true;
    }

    function handleNewGame() {
        setGameState(0);
        setBoard(initalBoard);
        setIsPlayerOne(true);
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        isMatchOver = false;
    }

    function handleInputScoreLimit(event) {
        if(isNaN(event.target.value)){
            alert('score limit must be a number');
            return;
        }
        setScoreLimit(Number(event.target.value));
    }

    function handleSaveScoreLimit(){
        setIsSavedScoreLimit(!isSavedScoreLimit);
    }

    function getWinner(){
        if(playerOneScore === scoreLimit){
            return 'Player 1';
        }
        else if(playerTwoScore === scoreLimit){
            return 'Player 2';
        }
    }

    function handleClick(event) {
        if (event.target.textContent !== '' || gameState || isMatchOver) {
            return;
        }
        setIsPlayerOne(!isPlayerOne)
        const id = JSON.parse(event.target.id)
        const newBoard = board.map((el, row) => {
            if (id.row === row) {
                return board[row].map((tile, i) => {
                    if (i === id.column) {
                        return (isPlayerOne ? 'X' : 'O');
                    }
                    else {
                        return tile;
                    }
                })
            }
            else {
                return el;
            }
        })
        setBoard(newBoard);
    }

    return (
        <div className='main'>
            <h1>Tic Tac Toe</h1>
            <div className='tools'>
                <button onClick={handleNewGame}>New Game</button>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="input-limit">
                        Set score limit:  
                        <input value={scoreLimit} onChange={handleInputScoreLimit} 
                    defaultValue={defaultScoreLimit}
                    readOnly={isSavedScoreLimit}/>
                    </label>
                    <button onClick={handleSaveScoreLimit}>
                        {isSavedScoreLimit ? 'Edit' : 'Save'}
                    </button>
                </form>
            </div>
            <div className='display-score'>
                <h2>Player One's Score: {playerOneScore}</h2>
                <h2>Player Two's Score: {playerTwoScore}</h2>
            </div>
            {isMatchOver && (
                <div className='display-victory'>
                    <h2 id='victory'>Match Over! {getWinner()}'s Victory
                    </h2>
                </div>
            )}
            <div className='mainboard'>
                {board.map((el, i) => {
                    return (
                        <Row key={i} id={i} onClick={handleClick} board={board} />
                    )
                })}
                {(gameState === 1) && (
                    <>
                        <h2>{isPlayerOne ? 'Player 2' : 'Player 1'} Won</h2>
                        <button onClick={handleRestart} >Restart</button>
                    </>
                )}
                {(gameState === 2) && (
                    <>
                        <h2>Tie</h2>
                        <button onClick={handleRestart} >Restart</button>
                    </>
                )}
            </div>
            {(gameState === 0) && (
                <div className='player-turn-noti'>
                    <h2>{isPlayerOne ? 'Player 1(X)\'s turn' : 'Player 2(O)\'s turn'}</h2>
                </div>
            )}
        </div>
    )

}
function Row({ id, onClick, board }) {
    let tiles = board[id];

    return (
        <div className='rows'>
            {tiles.map((el, i) => {
                return (
                    <div className='tiles' onClick={onClick} id={JSON.stringify({
                        row: id,
                        column: i
                    })} key={JSON.stringify({
                        row: id,
                        column: i
                    })}>
                        {el}
                    </div>
                )
            })}
        </div>
    )

}

