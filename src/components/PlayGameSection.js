import React, { useState, useRef } from "react";
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
} from "react-bootstrap";

export default function PlayGameSection(props) {
  const auth = useAuth();
  const [isOpenGuide, setGuideIsOpen] = useState(true);
  const uid = auth.user && auth.user.uid;
  const { data: user, status } = useUser(uid);
  const { data: singleGame, status: otherStatus } = useSingleGame(
    auth.user.uid,
    props.gameId
  );
  const textAreaRef = useRef(null);

  if (status === "loading" || otherStatus === "loading") {
    return "Loading ...";
  }

  const isHost = uid === singleGame.owner;

  const getStartingMessage = () => {
    return isHost
      ? `You are the host of the party. Send the link below to all your friends so they can join you.`
      : "You aren't the host of the party, but you can still invite people to play. Send the link below to all your friends.";
  };
  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    window.alert("Copied!");
  };

  return (
    <>
      {isOpenGuide && (
        <div id="guide">
          <Jumbotron fluid>
            <Container>
              <h1>{`${singleGame.name}`}</h1>
              <p>{getStartingMessage()}</p>
              <p>{`Once everyone is here, click 'Let's Play'.`}</p>
              <Form width="50%">
                <Form.Group controlId="formRoom">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    ref={textAreaRef}
                    placeholder="Room link"
                    aria-label="Room link"
                    aria-describedby="basic-addon2"
                    readonly
                    value={`https://quarantine-cup.now.sh/game?action=join&code=${singleGame.roomCode}`}
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
                {singleGame.users.map((user) => (
                  <ListGroupItem>{user.name}</ListGroupItem>
                ))}
              </ListGroup>

              {isHost && (
                <p>
                  <Button
                    variant="primary"
                    style={{ marginTop: "16px" }}
                    onClick={() => {
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
    </>
  );
}
