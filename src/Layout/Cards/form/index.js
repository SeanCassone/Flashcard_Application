import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../../utils/api";

function CardForm({ deckId, deck, cardId }) {
  const history = useHistory();
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    async function getCard() {
      if (cardId) {
        const newCard = await readCard(cardId);
        setCard(newCard);
      }
    }
    getCard();
  }, [cardId]);

  function handleFrontChange({ target: { value } }) {
    setCard({ ...card, front: value });
  }

  function handleBackChange({ target: { value } }) {
    setCard({ ...card, back: value });
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (cardId) {
      const response = await updateCard(card);
      history.push(`/decks/${deck.id}`);
      return response;
    } else {
      const response = await createCard(deckId, card);
      history.go(0);
      setCard({ front: "", back: "" });
      return response;
    }
  }

  return (
    <div className="card" style={{ width: "35rem", borderStyle: "none" }}>
      <form className="was-validated" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            rows="5"
            front="front"
            required
            defaultValue={card.front}
            onChange={handleFrontChange}
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">
            Please edit the text on the front of the card here.
          </div>
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            rows="5"
            defaultValue={card.back}
            back="back"
            required
            onChange={handleBackChange}
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">
            Please edit the text on the back of the card here.
          </div>
          <div className="d-flex">
            <button
              onClick={handleDone}
              className="btn btn-secondary ml-1 mt-2"
            >
              Done
            </button>
            <button
              className="btn btn-primary ml-1 mt-2"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
