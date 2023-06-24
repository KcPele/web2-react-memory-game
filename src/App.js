import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard.js";
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },

  { src: "/img/ring-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]); //
  const [turns, setTurns] = useState(0); //
  const [choiceOne, setChoiceOne] = useState(null); //
  const [choiceTwo, setChoiceTwo] = useState(null); //
  const [disabled, setDisabled] = useState(false); //
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  useEffect(() => {}, [choiceTwo]);
  //handle a choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevState) =>
          prevState.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );

        restTurn();
      } else {
        setTimeout(restTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  //rest choice & increase turn
  const restTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState) => prevState + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns {turns}</p>
    </div>
  );
}

export default App;
