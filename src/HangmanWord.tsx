type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}

// ======================
// Styling for Letters divs
// ======================
const letterDiv = {
  display: "flex",
  gap: ".25em",
  fontSize: "6rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontFamily: "monospace",
} as React.CSSProperties

// ======================

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div id="letter__div" style={letterDiv}>
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}