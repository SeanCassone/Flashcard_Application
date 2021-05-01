import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import CardForm from "../form";

const AddCard = () => {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function getDeck() {
      const deckRead = await readDeck(deckId);
      setDeck(deckRead);
    }
    getDeck();
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
          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <CardForm deckId={deckId} deck={deck} />
    </div>
  );
};
export default AddCard;
