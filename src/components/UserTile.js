import React, { useState } from "react";
import { Image, Badge, ListGroupItem } from "react-bootstrap";
import SmallCard from "./SmallCard";

export default function UserTile({ userData, isMyTurn }) {
  // todo: make custom 500 page
  return (
    <>
      <ListGroupItem
        style={{ height: "auto" }}
        key={userData.uid}
        variant={userData.isMyTurn ? "dark" : ""}
      >
        <Image
          src={userData.picture}
          roundedCircle
          style={{ height: "48px" }}
        />
        <span style={{ marginLeft: "24px", fontSize: "24px" }}>
          {userData.name}
        </span>
        {userData.isMyTurn && (
          <Badge style={{ marginLeft: "18px" }} variant="secondary">
            It's your turn!
          </Badge>
        )}
        <div className="card-hand">
          {isMyTurn
            ? ""
            : userData.cards
                .reverse()
                .map((cardData) => (
                  <SmallCard
                    key={`sm-${cardData.value}-${cardData.suit}`}
                    cardData={cardData}
                  ></SmallCard>
                ))}
        </div>
      </ListGroupItem>
    </>
  );
}
