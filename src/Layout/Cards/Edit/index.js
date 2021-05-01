import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import CardForm from "../form";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    async function getDeck() {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
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
          <li className="breadcrumb-item">{`Edit Card ${cardId}`}</li>
        </ol>
      </nav>

      <CardForm cardId={cardId} deckId={deckId} deck={deck} />
    </div>
  );
}
export default EditCard;
