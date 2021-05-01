import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../../utils/api";

const DEFAULT_DECK_STATE = {
  name: "",
  description: "",
};

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState(DEFAULT_DECK_STATE);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const abortController = new AbortController();
  //   const response = await createDeck(deck, abortController.signal);
  //   history.push(`/decks/${deck.id}`);
  //   return response;
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    createDeck(deck).then((deck) => history.push(`/decks/${deck.id}`));
  }

  function cancel() {
    history.goBack();
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
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <div className="card" style={{ width: "35rem", borderStyle: "none" }}>
        <form
          className="was-validated"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <div className="form-group">
            <label htmlFor="deckname">Name</label>
            <input
              type="text"
              className="form-control"
              id="deckname"
              name="name"
              aria-describedby="InputDeckName"
              placeholder="DeckName"
              onChange={handleChange}
              value={deck.name}
              deckname="deckname"
              required
            />
            <div className="valid-feedback">Valid deck name.</div>
            <div className="invalid-feedback">
              Please enter the deck name here.
            </div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              placeholder="Brief description of the deck"
              onChange={handleChange}
              value={deck.description}
              description="description"
              required
            />
            <div className="valid-feedback">Valid deck desciption.</div>
            <div className="invalid-feedback">
              Please enter the description here.
            </div>
            <button
              type="button"
              className="btn btn-secondary ml-1 mt-2"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              type="sumbit"
              className="btn btn-primary ml-1 mt-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
