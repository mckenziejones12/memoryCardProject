import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div id="wholeGameContainer">
      <header>
        <div id="gameTitle">Memory Card Game</div>
        <div id="gameInstruction">
          Click on a card to start the game. Be sure to not click on the same
          card twice or you lose!
        </div>
      </header>
    </div>
  );
}

export default App;
