import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../../utils/api";

function ViewDecks() {
  const { deckId } = useParams();

  const history = useHistory();

  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    async function getDeck(deckId) {
      const deckRead = await readDeck(deckId);
      setDeck(deckRead);
    }
    getDeck(deckId);
  }, [deckId]);

  async function handleDeleteDeck() {
    if (
      window.confirm(
        `Are you sure you want to delete this deck? You will not be able to recover it`
      )
    ) {
      const abortController = new AbortController();
      try {
        history.push("/");
        const response = await deleteDeck(deckId, abortController.signal);
        return response;
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
  }

  async function handleDeleteCard(card) {
    if (
      window.confirm(
        `Are you sure you want to delete this card? You will not be able to recover it`
      )
    ) {
      const abortController = new AbortController();
      try {
        history.go(0);
        const response = await deleteCard(card.id, abortController.signal);
        return response;
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mr-1" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card" style={{ width: "35rem", borderStyle: "none" }}>
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>

          <div className="d-flex">
            <Link
              to={`/decks/${deckId}/edit`}
              type="button"
              className="btn btn-secondary mr-1"
            >
              <span className="oi oi-pencil mr-2" />
              Edit
            </Link>
            <Link
              to={`${deckId}/study`}
              type="button"
              className="btn btn-primary mr-1"
            >
              <span className="oi oi-book mr-2" />
              Study
            </Link>
            <Link
              to={`${deckId}/cards/new`}
              type="button"
              className="btn btn-primary mr-1"
            >
              <span className="oi oi-plus mr-2" />
              Add Card
            </Link>
            <button
              onClick={handleDeleteDeck}
              type="button"
              className="btn ml-auto btn-danger"
            >
              <span className="oi oi-trash" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {deck.cards.map((card, idx) => (
          <div key={idx} className="card" style={{ width: "35rem" }}>
            <div className="card-body">
              <div className="d-flex justify-content-around">
                <p className="card-text">{card.front}</p>
                <p className="card-text">{card.back}</p>
              </div>
              <div className="d-flex justify-content-end">
                <Link
                  to={`${deckId}/cards/${card.id}/edit`}
                  type="button"
                  className="btn btn-secondary mr-1 mt-3"
                >
                  <span className="oi oi-pencil mr-2" />
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-danger mr-1 mt-3"
                  onClick={() => handleDeleteCard(card)}
                >
                  <span className="oi oi-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ViewDecks;
