import "./Cards.scss";
import { symbolFromName } from "../util/constants";

export default function Card(props) {
  const value = props.cardData.value;
  const suit = props.cardData.suit;
  if (suit === "clubs" || suit === "spades") {
    return (
      <div className="card card-black">
        <div className="card-tl">
          <div className="card-value">{value}</div>
          <div className="card-suit">{symbolFromName(suit)}</div>
        </div>
        <div className="card-br">
          <div className="card-value">{value}</div>
          <div className="card-suit">{symbolFromName(suit)}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card card-red">
        <div className="card-tl">
          <div className="card-value">{value}</div>
          <div className="card-suit">{symbolFromName(suit)}</div>
        </div>
        <div className="card-br">
          <div className="card-value">{value}</div>
          <div className="card-suit">{symbolFromName(suit)}</div>
        </div>
      </div>
    );
  }
}
