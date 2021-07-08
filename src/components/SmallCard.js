import React, { useState } from "react";
import "./Cards.scss";
import { symbolFromName } from "../util/constants";

export default function SmallCard(props) {
  const value = props.cardData.value;
  const suit = props.cardData.suit;
  const [isFlipped, setIsFlipped] = useState(true);

  const isBlack = suit === "spades" || suit === "clubs" ? true : false;

  return (
    <div
      onClick={() => {
        setIsFlipped(true);
        if (props.cardClickHandler) {
          props.cardClickHandler(props.cardData);
        }
      }}
    >
      {!isFlipped && (
        <div className="small-card card-flipped">
          <div class="Aligner-item Aligner-item--top"></div>
          <div class="Aligner-item">Q</div>
          <div class="Aligner-item Aligner-item--bottom"></div>
        </div>
      )}
      {isFlipped && (
        <div
          className={isBlack ? "small-card card-black" : "small-card card-red"}
        >
          <div className="card-tl">
            <div className="small-card-value">{value ? value : ""}</div>
            <div className="small-card-suit">
              {suit ? symbolFromName(suit) : ""}
            </div>
          </div>
          <div className="card-br">
            <div className="small-card-value">{value ? value : ""}</div>
            <div className="small-card-suit">
              {suit ? symbolFromName(suit) : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
