import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import englishWords from "./wordLists/englishWordList.json"

function getWord() {
  return englishWords[Math.floor(Math.random() * englishWords.length)]
}

// ======================
// Styling for Div's
// ======================
const mainDiv = {
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  margin: "0 auto",
  alignItems: "center",
} as React.CSSProperties


const keyboardDiv = {
  alignSelf: "stretch"
} as React.CSSProperties

const revealDiv = {
  fontSize: "1rem", 
  textAlign: "center", 
  marginBottom: "-1rem"
} as React.CSSProperties

const wordRevealText = {
  fontSize: "1rem", 
  textTransform: "uppercase",
  textAlign: "center", 
  marginBottom: "-1rem", 
  color: "darkred"
} as React.CSSProperties

// ======================

function App() {
  const [wordToGuess, setWordToGuess] = useState<string | "">(getWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [reveal, setReveal] = useState<Boolean>(false)
  const [remainingGuesses, setRemainingGuesses] = useState<number>(6)

  // word randomizer button using getWord() function and resets game
  const wordRandomizer = () => {
    const randomWord = getWord()
    setGuessedLetters([])
    setWordToGuess(getWord())
    setReveal(false)
    return randomWord
  }

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess?.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess && wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  // prompt for validate keyboard input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters, isWinner, isLoser, addGuessedLetter])

  // prompt for keyboard event listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  // prompt that resets game
  const reset = () => {
    setGuessedLetters([])
    setWordToGuess(getWord())
    setReveal(false)
  }

  // prompt that toggles boolean value
  const showHiddenWord = () => {
    setReveal(currentReveal => !currentReveal)
  }

  // prompt that shows remaining guesses
  useEffect(() => {
    setRemainingGuesses(6 - incorrectLetters.length)
    if(remainingGuesses === 0) <div>Remaing guesses: 🤷</div>
  }, [incorrectLetters, isLoser, isWinner, remainingGuesses])

  // prompt that displays guessed letters
  const guessedLettersDisplay = () => {
    if (guessedLetters.length === 0) return

    return <div>Guessed Letters: {guessedLetters.join(", ")}</div>
  }

  // reset noise
  // const resetNoise = new Audio("https://freesound.org/data/previews/269/269026_5094889-lq.mp3")

  // winner noise
  // const winnerNoise = new Audio("https://freesound.org/data/previews/511/511484_6890478-lq.mp3")

  // play winnerNoise when isWinner displays
  // isWinner && winnerNoise.play()

  // loser noise
  // const loserNoise = new Audio("https://freesound.org/s/400581/")

  // play loserNoise when isLoser displays
  // isLoser && loserNoise.play()

return (
  <div style={mainDiv}>

    {/* Welcome Message */}
    {guessedLetters.length !== 0 ? null : <h1 id="title__div">Hang...That...MAN!</h1> }

    {/* Finale Text */}
    <div id="finale__div">
      {
        isWinner && 
        <div id="winner__message">
          <div id="finale__message__top">Winner winner gets the dinner!</div>
          <div id="finale__message__bottom">🐓🍽🐔 - Reset to play again</div>
        </div>
      }
      {
        isLoser && 
          <div id="loser__message">
            <div id="finale__message__top">Mamaaa! I just killed a man</div>
            <div id="finale__message__bottom">LOL 🤦🏻‍♂️ u suck - hit "ENTER" to reset
            </div>
          </div>
      }
    </div>

    {/* setRemainingGuesses only hidden when game has ended */}
    <div id="remaining__guesses">
      <div>Remaining guesses: {remainingGuesses}</div>
    </div>

    {/* Word Randomizer Button */}
    <div id="randomizer__button" className="button__class" onClick={() => setWordToGuess(wordRandomizer)}>
      Random Word
    </div>

    {/* HangmanDrawing Component */}
    <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

    {/* Word reveal when isLoser is showing */}
    {
      isLoser ? (
        <div id="game__over__word__reveal" style={revealDiv}>
          Word was: <i style={wordRevealText}>{wordToGuess}</i>
        </div>
      ) : null
    }

    {/* Reset Button after game */}
    {
      isWinner || isLoser ? (
        <div id="reset__button" className="button__class" onClick={() => {
            reset()
            // resetNoise.play()
            }
          }
        >
          Reset
        </div>
      ) : null
    }

    {/* Guessed Letters */}
    <div id="guessed__letters">
      <div>{guessedLettersDisplay()}</div>
    </div>

    {/* Reveal Word Button */}
    {
      isWinner || isLoser ? null : (
        <div>
          <div id="hidden__word__button" className="button__class" onClick={showHiddenWord}>
            Show Hidden Word
          </div>

        {/* Word Reveal */}
        {
          reveal && (
            <div style={revealDiv}>
              {wordToGuess}
            </div>
          )
        }
        </div>
      )
    }

    {/* Hangman Component */}
    <HangmanWord
      reveal={isLoser}
      guessedLetters={guessedLetters}
      wordToGuess={wordToGuess}
    />
    
    {/* Keyboard Component */}
    <div id="keyboard__display" style={keyboardDiv}>
      <Keyboard
        disabled={isWinner || isLoser} 
        activeLetters={guessedLetters.filter(letter =>
          wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
      />
    </div>
    
  </div>
  )
}

export default App