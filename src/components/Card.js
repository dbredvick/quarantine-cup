import React, { useState } from "react";
import "./Cards.scss";
import { symbolFromName } from "../util/constants";
import { useSpring, animated as a } from "react-spring";

export default function Card(props) {
  const value = props.cardData.value;
  const suit = props.cardData.suit;
  const [isFlipped, setIsFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 700, friction: 80 },
  });

  const isBlack = suit === "spades" || suit === "clubs" ? true : false;

  return (
    <div className="card-container" onClick={() => setIsFlipped(!isFlipped)}>
      <a.div
        className="c"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      >
        <div className="card card-flipped">
          <div class="Aligner-item Aligner-item--top"></div>
          <div class="Aligner-item">Q</div>
          <div class="Aligner-item Aligner-item--bottom"></div>
        </div>
      </a.div>
      <a.div
        className="c"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      >
        <div className={isBlack ? "card card-black" : "card card-red"}>
          <div className="card-tl">
            <div className="card-value">{value}</div>
            <div className="card-suit">{symbolFromName(suit)}</div>
          </div>
          <div className="card-br">
            <div className="card-value">{value}</div>
            <div className="card-suit">{symbolFromName(suit)}</div>
          </div>
        </div>
      </a.div>
    </div>
  );
}
