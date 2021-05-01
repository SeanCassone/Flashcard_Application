import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import NotEnoughCardsToStudy from "./NotEnoughCardsToStudy";

const DEFAULT_CARD_STATE = { index: 0, flipped: false };
function StudyDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });
  const [currentCard, setCurrentCard] = useState(DEFAULT_CARD_STATE);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      const apiResponse = await readDeck(deckId, abortController.signal);
      setDeck(apiResponse);
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  const card = deck.cards[currentCard.index];

  function flipCard() {
    setCurrentCard({
      ...currentCard,
      flipped: !currentCard.flipped,
    });
  }

  function nextCard() {
    if (currentCard.index === deck.cards.length - 1) {
      const returnToHomePage = !window.confirm(
        `Restart cards? Click 'cancel' to return to the home page`
      );
      return returnToHomePage
        ? history.push("/")
        : setCurrentCard(DEFAULT_CARD_STATE);
    } else {
      setCurrentCard({
        ...currentCard,
        index: currentCard.index + 1,
        flipped: false,
      });
    }
  }

  return (
    <div>
      <header>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home mr-2" />
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        {deck.cards.length < 3 && (
          <div>
            <NotEnoughCardsToStudy deckId={deckId} />
          </div>
        )}
        {deck.cards.length >= 3 && card && (
          <div className="card" style={{ width: "35rem" }}>
            <div className="card-body">
              <h5 className="card-title">
                Card {currentCard.index + 1} of {deck.cards.length}
              </h5>

              <p className="card-text">
                {currentCard.flipped ? card.back : card.front}
              </p>
              <button onClick={flipCard} className="btn btn-secondary">
                Flip
              </button>
              {currentCard.flipped && (
                <button onClick={nextCard} className="btn btn-primary ml-1">
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
export default StudyDeck;
