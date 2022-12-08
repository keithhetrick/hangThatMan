import styles from "./HangmanDrawing.module.css"

// ======================
// Styling for Hangman drawing - NOT BEING USED
// ======================
const FACIAL_EXPRESSION = (
  <div 
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "100%",
      border: "10px solid black",
      position: "absolute",
      top: "50px",
      right: "-30px",
      // rotate: "45deg",
    }}
  >
    {/* ====================== */}
    {/* Facial Expressions */}
    {/* ====================== */}
    <div id="facial__expression">
      <div id="eyes">
        <div id="left__eye">
          <div 
            style={{ 
              height: "3px", 
              width: "23px", 
              position: "absolute", 
              right: "22px", 
              top: "15px", 
              rotate: "45deg",
              background: "black" 
            }} 
            />
          <div 
            style={{ 
              height: "23px", 
              width: "3px", 
              position: "absolute", 
              right: "32px", 
              top: "5px", 
              rotate: "45deg",
              background: "black" 
              }} 
            />
        </div>
        <div id="right__eye">
          <div 
            style={{ 
              height: "3px", 
              width: "23px", 
              position: "absolute", 
              right: "2px", 
              top: "15px", 
              rotate: "45deg",
              background: "black" 
            }} 
            />
          <div 
            style={{ 
              height: "23px", 
              width: "3px", 
              position: "absolute", 
              right: "12px", 
              top: "5px", 
              rotate: "45deg",
              background: "black" 
              }} 
            />
        </div>
      </div>
      <div 
        id="mouth"
        style={{ 
          height: "15px", 
          width: "15px", 
          position: "absolute", 
          right: "13px", 
          top: "30px", 
          borderRadius: "100%", 
          background: "black",
          }} 
        />
    </div>
  </div>
)

const HEAD = <div id={styles.character__head} />
const BODY = <div id={styles.character__body} />
const RIGHT_ARM = <div id={styles.character__right__arm} />
const LEFT_ARM = <div id={styles.character__left__arm} />
const RIGHT_LEG = <div id={styles.character__right__leg} />
const LEFT_LEG = <div id={styles.character__left__leg} />


const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
  numberOfGuesses: number
} 

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div id="hangman__display">

      {/* Character */}
      <div id="hangman__container">
        {BODY_PARTS.slice(0, numberOfGuesses)}
        {/* {numberOfGuesses === 6 && FACIAL_EXPRESSION} */}
      </div>

      {/* Gallows */}
      <div id="gallows__container"> 
        <div id={styles.gallows__top__horizontal} />
        <div id={styles.gallows__small__vertical} />
        <div id={styles.gallows__middle__vertical} />
        <div id={styles.gallows__bottom__horizontal} />
      </div>

    </div>
  )
}
