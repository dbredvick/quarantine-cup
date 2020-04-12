import React, { useState, useRef } from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useSingleGame, useUser } from "../util/db";
import { useAuth } from "../util/auth";
import {
  Jumbotron,
  Container,
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
  Image,
  Badge,
} from "react-bootstrap";

import { isHost, currentUser } from "../util/game-utils";

import "./Cards.scss";
import { suits } from "../util/constants";
import Card from "./Card";

export default function PlayGameSection(props) {
  const auth = useAuth();
  const uid = auth.user && auth.user.uid;
  const { data: singleGame, status: otherStatus } = useSingleGame(
    auth.user.uid,
    props.gameId
  );
  const textAreaRef = useRef(null);

  const isLoading = otherStatus === "loading";

  const host = isLoading ? false : isHost(singleGame, uid);
  const isOpenGuideFirstTime = isLoading
    ? true
    : singleGame.status === "created";
  const curUser = !isLoading ? currentUser(singleGame) : { name: "no one" };
  console.log(singleGame);
  const [isGuideOpen, setGuideIsOpen] = useState(true);

  const getStartingMessage = () => {
    return host
      ? `You are the host of the party. Send the link below to all your friends so they can join you.`
      : "You aren't the host of the party, but you can still invite people to play. Send the link below to all your friends.";
  };
  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    window.alert("Copied!");
  };

  const onCardClick = (cardData) => {
    const isItUsersTurn = curUser.name !== "no one" && curUser.uid === uid;

    if (isItUsersTurn) {
      // send move to server to validate
    }
  };
  return (
    <>
      {isOpenGuideFirstTime && isGuideOpen && (
        <div id="guide">
          <Jumbotron fluid>
            <Container>
              <h1>{`${isLoading ? "" : singleGame.name}`}</h1>
              <p>{getStartingMessage()}</p>
              <p>
                {host
                  ? `Once everyone is here, click 'Let's Play'.`
                  : `Waiting on the host to click play ...`}
              </p>
              <Form width="50%">
                <Form.Group controlId="formRoom">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    ref={textAreaRef}
                    placeholder="Room link"
                    aria-label="Room link"
                    aria-describedby="basic-addon2"
                    readonly
                    value={`${window.location.origin}/game?action=join&code=${
                      isLoading ? "" : singleGame.roomCode
                    }`}
                  />
                  <InputGroup.Append
                    onClick={copyToClipboard}
                    style={{ marginTop: "14px", marginBottom: "14px" }}
                  >
                    <Button variant="outline-secondary">Copy</Button>
                  </InputGroup.Append>
                </Form.Group>
              </Form>
              <h4>Who's all here</h4>
              <ListGroup>
                {isLoading
                  ? ""
                  : singleGame.users.map((user) => (
                      <ListGroupItem style={{ height: "72px" }} key={user.uid}>
                        <Image
                          src={user.picture}
                          roundedCircle
                          style={{ height: "48px" }}
                        />
                        <span style={{ marginLeft: "24px" }}>{user.name}</span>
                      </ListGroupItem>
                    ))}
              </ListGroup>

              {host && (
                <p>
                  <Button
                    variant="red"
                    style={{ marginTop: "16px" }}
                    onClick={() => {
                      // set state of game in update as well
                      setGuideIsOpen(false);
                    }}
                  >
                    Let's Play
                  </Button>
                </p>
              )}
            </Container>
          </Jumbotron>
        </div>
      )}
      {(!isGuideOpen || !isOpenGuideFirstTime) && (
        <>
          <Section
            bg={props.bg}
            textColor={props.textColor}
            size={props.size}
            bgImage={props.bgImage}
            bgImageOpacity={props.bgImageOpacity}
          >
            <Container>
              <SectionHeader
                title={isLoading ? "" : singleGame.name}
                subtitle={`${
                  isLoading ? "0" : singleGame.users.length
                } people are playing`}
                size={2}
                spaced={true}
                className="text-center"
              ></SectionHeader>
              <Container>
                <Row>
                  <Col></Col>
                  <Col>
                    <h2>{`It's ${curUser.name}'s turn`}</h2>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      style={{ float: "right" }}
                      onClick={() => {
                        // set state of game in update as well
                        setGuideIsOpen(true);
                      }}
                    >
                      Game <FontAwesomeIcon icon={faCog} />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="circle-container">
                      {isLoading
                        ? ""
                        : singleGame.state
                            .filter((x) => x.available)
                            .slice(0, 6)
                            .map((cardData) => (
                              <Card
                                cardClickHandler={onCardClick}
                                cardData={cardData}
                              ></Card>
                            ))}
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: "100px" }}>
                  <Col>
                    <ListGroup>
                      {isLoading
                        ? ""
                        : singleGame.users.map((user) => (
                            <ListGroupItem
                              style={{ height: "72px" }}
                              key={user.uid}
                              variant={user.isMyTurn ? "dark" : ""}
                            >
                              <Image
                                src={user.picture}
                                roundedCircle
                                style={{ height: "48px" }}
                              />
                              <span
                                style={{ marginLeft: "24px", fontSize: "24px" }}
                              >
                                {user.name}
                              </span>
                              {user.isMyTurn && (
                                <Badge
                                  style={{ marginLeft: "18px" }}
                                  variant="secondary"
                                >
                                  It's your turn!
                                </Badge>
                              )}
                            </ListGroupItem>
                          ))}
                    </ListGroup>
                  </Col>
                </Row>
              </Container>
            </Container>
          </Section>
        </>
      )}
    </>
  );
}
