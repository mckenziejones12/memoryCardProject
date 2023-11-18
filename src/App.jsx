import { useEffect, useState } from "react";
import "./App.css";
import { MemoryCard } from "./components/MemoryCard";

function App() {
  // You have to access environment variables in Vite by
  // import.meta.env.<name_of_environment_variable>
  const accessKey = import.meta.env.VITE_UNSPLASH_API_KEY;
  const searchTerm = "fish";

  // Store photos
  const [photos, setPhotos] = useState([]);

  // Store current round count
  const [roundCount, setRoundCount] = useState(0);

  // Store isGameOver
  const [isGameOver, setIsGameOver] = useState(false);

  const hasWon = roundCount === photos.length && !isGameOver;

  const hasWonOrLost = hasWon || isGameOver;

  const transformResults = (result) => {
    return result.results.map((result) => {
      return {
        id: result.id,
        imageUrl: result.urls.regular,
        isClicked: false,
      };
    });
  };

  const shufflePhotoArray = (imageId) => {
    const photoArrayCopy = [...photos];
    const sortedPhotos = photoArrayCopy.sort(() => Math.random() - 0.5);

    // Check if clicked photo has been clicked
    const clickedPhoto = sortedPhotos.find((photo) => photo.id === imageId);

    // If it has, game over
    if (clickedPhoto.isClicked) {
      setIsGameOver(true);
      return;
    } else {
      //otherwise update it to be clicked
      clickedPhoto.isClicked = true;
    }

    // Update photos to be shuffled array
    setPhotos(sortedPhotos);

    // Increment round count
    setRoundCount(roundCount + 1);
  };

  const handleRestartClick = () => {
    setRoundCount(0);
    setIsGameOver(false);
  };

  // Fetch photos using useEffect and fetch
  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${searchTerm}&per_page=5`
    )
      .then((response) => response.json())
      .then((result) => {
        const transformedResults = transformResults(result);
        setPhotos(transformedResults);
      });
  }, [hasWonOrLost]);

  return (
    <div id="wholeGameContainer">
      <header>
        <div id="gameTitle">Memory Card Game</div>
        <div id="gameInstruction">
          Click on a card to start the game. Be sure to not click on the same
          card twice or you lose!
        </div>
      </header>
      {hasWon ? <div className="gameResult">You win</div> : null}
      {isGameOver ? <div className="gameResult">You lose</div> : null}
      <button onClick={handleRestartClick}>Restart</button>
      <div id="gameContent">
        {hasWonOrLost
          ? null
          : photos.map((result) => {
              return (
                <MemoryCard
                  key={result.id}
                  imageId={result.id}
                  imageUrl={result.imageUrl}
                  onClick={shufflePhotoArray}
                />
              );
            })}
      </div>
    </div>
  );
}

export default App;
