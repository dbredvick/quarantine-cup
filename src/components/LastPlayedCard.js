import React from "react";
import Card from "./Card";
import { Figure, Image, Col, Media } from "react-bootstrap";
import { getGameRule } from "../util/constants";

export default function LastPlayedCard({ cardData }) {
  const rule = getGameRule(cardData.card);
  return (
    <>
      <Col style={{ marginTop: "40px" }} sm={8}>
        <Media>
          <div style={{ height: "80px", marginRight: "120px" }}>
            {cardData && cardData.card && cardData.card.value ? (
              <Card
                key={`${cardData.card.value}-${cardData.card.suit}`}
                cardData={cardData.card}
                autoFlip={true}
              ></Card>
            ) : (
              ""
            )}
          </div>
          <Media.Body>
            {rule &&
            rule.rule &&
            cardData &&
            cardData.user &&
            cardData.card &&
            cardData.card.suit ? (
              <>
                <h4>{rule.rule}</h4>
                <h5>
                  {cardData.user.name} played {rule.stringRep} of{" "}
                  {cardData.card.suit}
                  {". "}
                </h5>
                <p>{rule.moreInfo}</p>
              </>
            ) : (
              ""
            )}
          </Media.Body>
        </Media>
      </Col>
    </>
  );
}
