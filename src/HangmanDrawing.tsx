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

const RIGHT_LEG = (
  <div 
    id="body"
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "210px",
      right: "-90px",
      rotate: "60deg",
      transformOrigin: "left bottom",
    }}
  />
)

const LEFT_LEG = (
  <div 
    id="body"
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "210px",
      right: 0,
      rotate: "-60deg",
      transformOrigin: "right bottom",
    }}
  />
)

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
          top: "-5px", 
          borderRadius: "100%", 
          background: "lightGreen",
          // zIndex: 1,
          }} 
        />
    </div>
  )

// ======================
// Styling for Gallow divs
// ======================
const smallVertical = { 
  height: "50px", 
  width: "10px", 
  background: "black", 
  position: "absolute",
  top: 0,
  right: 0,
} as React.CSSProperties

const topHorizontal = { 
  height: "10px", 
  width: "200px", 
  background: "black", 
  marginLeft: "120px" 
} as React.CSSProperties

const middleVertical = {
  height: "400px", 
  width: "10px", 
  background: "black", 
  marginLeft: "120px" 
} as React.CSSProperties

const bottomHorizontal = {
  height: "10px", 
  width: "250px", 
  background: "black" 
} as React.CSSProperties

// ======================

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG, HAT]

const positioning = { 
  position: "relative",
} as React.CSSProperties

type HangmanDrawingProps = {
  numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={positioning}>
      <div id="hangman__container" style={positioning}>
        {/* show HAT only when all body parts are visible */}
        {numberOfGuesses === 6 && HAT}
        {/* {HAT} */}
        {BODY_PARTS.slice(0, numberOfGuesses)}
          <div style={smallVertical} />
          <div style={topHorizontal} />
          <div style={middleVertical} />
          <div style={bottomHorizontal} />
      </div>
    </div>
  )
}
