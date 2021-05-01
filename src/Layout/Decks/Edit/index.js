import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "" });

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckToDisplay = await readDeck(deckId, abortController.signal);
        setDeck(deckToDisplay);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <div className="card" style={{ width: "35rem", borderStyle: "none" }}>
        <h2>Edit Deck</h2>
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
              name="name"
              id="deckname"
              aria-describedby="DeckName"
              defaultValue={deck.name}
              deckname="deckname"
              required
              onChange={handleChange}
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">
              Please enter the title of the deck.
            </div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="5"
              defaultValue={deck.description}
              back="description"
              required
              onChange={handleChange}
            />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">
              Please enter the description here.
            </div>
            <div className="d-flex">
              <button className="btn btn-secondary ml-1 mt-2">Cancel</button>
              <button className="btn btn-primary ml-1 mt-2">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditDeck;
