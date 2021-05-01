import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCardsToStudy({ deckId }) {
  return (
    <div>
      <h3>Not enough cards</h3>
      <p>You need at least 3 to study.</p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        <span className="oi oi-plus" />
        Add Cards
      </Link>
    </div>
  );
}

export default NotEnoughCardsToStudy;
