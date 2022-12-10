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

  // Word Randomizer
  const wordRandomizer = () => {
    const randomWord = getWord()
    setGuessedLetters([])
    setWordToGuess(getWord())
    setReveal(false)
    return randomWord
  }

  // Incorrect Letters
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess?.includes(letter)
  )

  // Game Status
  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess && wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  // Add Guessed Letter
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
      if (!key.match(/^[a-zA-Z]$/)) return
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

  // Remaining Guesses
  useEffect(() => {
    setRemainingGuesses(6 - incorrectLetters.length)
  }, [incorrectLetters, isLoser, isWinner, remainingGuesses])

  // Guessed Letters Display
  const guessedLettersDisplay = () => {
    if (guessedLetters.length === 0) return null
    return <div>Guessed Letters: {guessedLetters.join(", ").toLowerCase()}</div>
  }

  // Reset Game
  const reset = () => {
    setGuessedLetters([])
    setWordToGuess(getWord())
    setReveal(false)
  }

  // Toggles Word Reveal
  const showHiddenWord = () => {
    setReveal(currentReveal => !currentReveal)
  }

return (
  <div  id="main__wrapper">

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
    <div id="keyboard__display">
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

// Custom Keyboard Hook
// export const useKeyboard = () => {
//   const [keyboard, setKeyboard] = useState<KeyboardType[]>([])
//   useEffect(() => {
//     const keyboard: KeyboardType[] = []
//     for (let i = 0; i < 26; i++) {
//       keyboard.push({
//         letter: String.fromCharCode(65 + i),
//         active: false,
//         disabled: false,
//       })
//     }
//     setKeyboard(keyboard)
//   }, [])
//   return keyboard
// }

export default App