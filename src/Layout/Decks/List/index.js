import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../../../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function ListDecks() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const apiResponse = await listDecks(abortController.signal);
        setDecks(apiResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  async function handleDelete(deck) {
    if (
      window.confirm(
        `Are you sure you want to delete this deck? You will not be able to recover it.`
      )
    ) {
      history.go(0);
      const response = await deleteDeck(deck.id);
      return response;
    }
  }

  return decks.map((deck) => (
    <div key={deck.id} className="card" style={{ width: "35rem" }}>
      <div className="card-body">
        <h3 className="card-title">{deck.name}</h3>
        <p className="card-text">{deck.description}</p>
        <p className="card-text">{deck.cards.length} cards</p>
        <div className="row justify-content-between">
          <div className="d-flex">
            <Link
              to={`decks/${deck.id}`}
              type="button"
              className="btn btn-secondary ml-1"
            >
              <span className="oi oi-eye mr-2" />
              View
            </Link>
            <Link
              to={`decks/${deck.id}/study`}
              type="button"
              className="btn btn-primary ml-1"
            >
              <span className="oi oi-book mr-2" />
              Study
            </Link>
          </div>

          <button
            onClick={() => handleDelete(deck)}
            type="button"
            className="btn ml-auto btn-danger mr-1"
          >
            <span className="oi oi-trash" />
          </button>
        </div>
      </div>
    </div>
  ));
}
export default ListDecks;
