import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
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

const finaleDiv = {
  fontSize: "3rem", 
  textAlign: "center"
} as React.CSSProperties

const resetBtn = {
  display: "block",
  margin: "0 auto",
  marginTop: "1rem",
  padding: ".5rem",
  fontSize: "1.5rem",
} as React.CSSProperties

const randomizerBtn = {
  display: "block",
  margin: "0 auto",
  marginTop: "2rem",
  padding: ".5rem",
  fontSize: "1.5rem",
} as React.CSSProperties

const keyboardDiv = {
  alignSelf: "stretch"
} as React.CSSProperties

const titleDiv = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "-3rem",
  gap: "1rem",
  fontSize: "1.5rem",
  alignItems: "center",
} as React.CSSProperties

const revealDiv = {
  fontSize: "1rem", 
  textAlign: "center", 
  marginBottom: "-1rem"
} as React.CSSProperties

// ======================

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [reveal, setReveal] = useState(false)
  // const [language, setLanguage] = useState("en")

  // word randomizer button using getWord() function and resets game
const wordRandomizer = () => {
  const randomWord = getWord()
  setGuessedLetters([])
  setWordToGuess(getWord())
  setReveal(false)
  return randomWord
}

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

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
    // eslint-disable-next-line
  }, [guessedLetters])

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

  // prompt that selectsLanguage
  // const selectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setLanguage(e.target.value)
  // }

  // reset noise
  const resetNoise = new Audio("https://freesound.org/data/previews/269/269026_5094889-lq.mp3")

  // winner noise
  const winnerNoise = new Audio("https://freesound.org/data/previews/511/511484_6890478-lq.mp3")

  // play winnerNoise when isWinner displays
  isWinner && winnerNoise.play()

  // loser noise
  const loserNoise = new Audio("https://freesound.org/s/400581/")

  // play loserNoise when isLoser displays
  isLoser && loserNoise.play()

  return (
    <div style={mainDiv}>
      {/* h1 only visible when game hasn't started */}
      {guessedLetters.length !== 0 ? null : <h1 style={titleDiv}>Hang...That...MAN!</h1> }

      {/* Finale Text */}
      <div style={finaleDiv}>
        {
          isWinner && 
          <div>
              <div style={{ marginBottom: "10px" }}>Winner winner gets the dinner!</div>
              <div style={{ fontSize: "15px" }}>🐓🍽🐔 - Reset to play again</div>
            </div>
        }
        {
          isLoser && 
            <div>
              <div style={{ marginBottom: "10px" }}>Mamaaa! I just killed a man</div>
              <div style={{ fontSize: "15px" }}>LOL 🤦🏻‍♂️ u suck - Reset to try again
              </div>
            </div>
        }
      </div>
    
    {/* add ticking audio whenever keyboard is pressed */}
    {/* const ticking = "https://www.soundjay.com/button/sounds/button-3.mp3" 
    <audio src={ticking} autoPlay></audio> */}
    
      {/* selectLanguage Button */}
      {/* <div>
        <select value={language} onChange={selectLanguage}>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="nl">Nederlands</option>
        </select>
      </div> */}

      {/* Word Randomizer Button */}
      <button style={randomizerBtn} onClick={() => setWordToGuess(wordRandomizer)}>
        Random Word
      </button>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

      {/* Reset Button after game */}
      {
        isWinner || isLoser ? (
          <button style={resetBtn} onClick={() => {
              reset()
              resetNoise.play()
              }
            }
          >
            Reset
          </button>
        ) : null
      }

      {/* Reveal Word Button */}
          <button style={resetBtn} onClick={showHiddenWord}>
            Show Hidden Word
          </button>
        {
          reveal && (
            <div style={revealDiv}>
              {wordToGuess}
            </div>
          )
        }

      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      
      <div style={keyboardDiv}>
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