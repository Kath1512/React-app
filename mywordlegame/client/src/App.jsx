import { useState } from 'react'
import { useEffect } from 'react'
import './index.css'
const API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words'
export default function App() {

    const [solution, setSolution] = useState('')
    const [board, setBoard] = useState(new Array(6).fill(null))
    const [currentGuess, setCurrentGuess] = useState('')
    const [currentRow, setCurrentRow] = useState(0)
    const [won, setWon] = useState(false)

    useEffect(() => {

        const fetchWord = async () => {
            const response = await fetch('/api/word')
            const words = await response.json()
            const randomWord = words[Math.floor(Math.random() * words.length)]
            setSolution(randomWord.toLowerCase())
        }

        fetchWord()
    }, [])

    const isLost = (!won && (currentRow > 5))


    useEffect(() => {

        const handleType = function (event) {
            if(won || isLost){
                return;
            }
            if (event.key.match(/^[a-z]{1}$/)) {
                if (currentGuess.length == 5) {
                    return;
                }
                setCurrentGuess(prevGuess => prevGuess + event.key)
            }
            else if (event.key == 'Backspace') {
                setCurrentGuess(prevGuess => prevGuess.slice(0, -1))
            }
            else if (event.key == 'Enter') {
                //TODO: ADD color
                //TODO: move to next line
                if (currentGuess.length < 5) {
                    alert('Not enough letters')
                    return;
                }
                setCurrentRow(row => row + 1)
                //save board
                let newBoard = board.map((el, index) => {
                    if (index == currentRow) {
                        return (
                            <div className='rows'>
                                {[...currentGuess].map((el, i) => {
                                    let className = 'tile '
                                    if (el.toLowerCase() == solution[i]) {
                                        className += 'correct'
                                    }
                                    else if (solution.includes(el)) {
                                        className += 'close'
                                    }
                                    else className += 'wrong'
                                    return (
                                        <div className={className}>
                                            {el}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                    else return el
                })
                setBoard(newBoard)
                setCurrentGuess('')
                if(currentGuess == solution){
                    setWon(true)
                }
            }
        }

        window.addEventListener('keydown', handleType)

        return () => {
            window.removeEventListener('keydown', handleType)
        }

    }, [currentGuess, board, currentRow, won])

    return (
        <div className='board'>
            <h1>Wordle Game</h1>
            {/* <p>{solution}</p> */}
            {board.map((el, index) => {
                if (index >= currentRow) {
                    return (
                        <Row key={index} id={index} />
                    )
                }
                else {
                    return el
                }
            })}
            {isLost && (
                <>
                    <h2>You Lost!</h2>
                    <p>Your word is: {solution}</p>
                </>
            )}
            {won && (
                <>
                    <h2>You Won!</h2>
                    <p>Your word is: {solution}</p>
                </>
            )}

        </div>
    )


    function Row({ id }) {
        let tiles = new Array(5).fill(null)
        if (id == currentRow) {
            for (let i = 0; i < tiles.length; i++) {
                tiles[i] = currentGuess.at(i)
            }
        }

        return (
            <div className='rows'>
                {tiles.map((el, index) => (
                    <div className='tile'>
                        {el}
                    </div>
                ))}
            </div>
        )
    }
}


