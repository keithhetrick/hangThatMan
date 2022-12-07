import styles from "./HangmanDrawing.module.css"

// ======================
// Styling for Hangman drawing
// ======================
const HEAD = (
  <div 
    id="head"
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
  </div>
)
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

const BODY = (
  <div 
    id="body"
    style={{
      width: "10px",
      height: "100px",
      background: "black",
      position: "absolute",
      top: "120px",
      right: 0,
    }}
  />
)

const RIGHT_ARM = (
  <div 
    id="body"
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "-100px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
    }}
  />
)

const LEFT_ARM = (
  <div 
    id="body"
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "10px",
      rotate: "30deg",
      transformOrigin: "right bottom",
    }}
  />
)

const RIGHT_LEG = <div id={styles.right__leg} />
const LEFT_LEG = <div id={styles.left__leg} />


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
          // zIndex: 1,
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
    <div id="outer__hangman__div">
      <div id="hangman__container">
        {/* show HAT only when all body parts are visible */}
        {numberOfGuesses === 6 && HAT}
        {numberOfGuesses === 6 && FACIAL_EXPRESSION}
        {/* {HAT} */}
        {BODY_PARTS.slice(0, numberOfGuesses)}
          <div id={styles.small__vertical} />
          <div id={styles.top__horizontal} />
          <div id={styles.middle__vertical} />
          <div id={styles.bottom__horizontal} />
      </div>
    </div>
  )
}
