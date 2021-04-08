import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const Home = () => {
  const { cards } = useSelector((state) => state.card);

  return (
    <div className="home">
      <h1>E-WALLET</h1>

      <div className="active">
        {cards.map((card, i) => {
          if (card.isActive) {
            return (
              <div key={i}>
                <h1>Active card</h1>
                <Card {...card} />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="notActive">
        {cards.map((card, i) => {
          if (!card.isActive) {
            return (
              <div className="nonActive" key={i}>
                <Card {...card} />
              </div>
            );
          }
          return null;
        })}
      </div>

      <Link to="/addcard">
        <button
          disabled={cards.length === 4}
          style={
            cards.length === 4
              ? { background: "rgb(126, 0, 0)" }
              : { background: "black" }
          }
        >
          {cards.length === 4 ? `Maximum card reached` : "Add a new card "}
        </button>
      </Link>
    </div>
  );
};

export default Home;
