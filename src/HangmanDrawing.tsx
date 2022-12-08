import styles from "./HangmanDrawing.module.css"

// ======================
// Styling for Hangman drawing
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


// ======================
// Styling for Hat
// ======================
const HAT = (
    <div
      id="hat"
      style={{
        width: "0",
        height: "0",
        borderLeft: "25px solid transparent",
        borderRight: "25px solid transparent",
        borderTop: "50px solid red",
        position: "absolute",
        top: "7px",
        right: "-20px",
        rotate: "180deg",
        zIndex: 1,
      }}
      >
      <div 
        style={{ 
          height: "25px", 
          width: "25px", 
          position: "absolute", 
          right: "-13px", 
          top: "-8px", 
          borderRadius: "100%", 
          background: "lightGreen",
          }} 
        />
    </div>
  )

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG, HAT]

type HangmanDrawingProps = {
  numberOfGuesses: number
} 

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div id="hangman__display">
      <div id="hangman__container">

        {/* Character */}
        {/* {numberOfGuesses === 6 && HAT} */}
        {/* {numberOfGuesses === 6 && FACIAL_EXPRESSION} */}
        {BODY_PARTS.slice(0, numberOfGuesses)}

      </div>
      <div id="gallows__container"> 
        {/* Gallows */}
        <div id={styles.gallows__top__horizontal} />
        <div id={styles.gallows__small__vertical} />
        <div id={styles.gallows__middle__vertical} />
        <div id={styles.gallows__bottom__horizontal} />
      </div>

    </div>
  )
}
