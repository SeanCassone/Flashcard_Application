import React from "react";
import { Link } from "react-router-dom";
import ListDecks from "../Decks/List";

function Home() {
  return (
    <div>
      <Link to={`/decks/new`} type="button" className="btn btn-secondary">
        <span className="oi oi-plus mr-2" />
        Create Deck
      </Link>
      <ListDecks />
    </div>
  );
}
export default Home;
