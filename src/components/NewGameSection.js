import React, { useState } from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import { useForm } from "react-hook-form";
import FormAlert from "./FormAlert";
import Form from "react-bootstrap/Form";
import FormField from "./FormField";
import Button from "react-bootstrap/Button";
import {
  useGame,
  createGame,
  updateGame,
  useUser,
  useSingleGame,
  updateUser,
} from "../util/db";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "./../util/auth.js";
import { useRouter } from "next/router";
import Games from "./Games";

function NewGameSection(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const router = useRouter();

  const code = router.query.code;
  const isJoining = router.query.action === "join";

  // Fetch user from database
  const uid = auth.user && auth.user.uid;
  const { data: user, status } = useUser(uid);
  const { data: games, status: gameStatus } = useGame(uid);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    // Show pending indicator
    setPending(true);
    let game;
    if (isJoining) {
      // update existing game with new user
      game = await updateGame(code, uid, { name: data.name });
    } else {
      // create existing game thing
      game = await createGame(user.uid, { name: data.name });
    }
    setPending(false);
    router.push(`/play/${game.id}`);
  };

  // Show loading indicator until
  // database query completes.
  if (status === "loading" || gameStatus === "loading") {
    return "Loading ...";
  }

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={2}
          spaced={true}
          className="text-center"
        ></SectionHeader>
        {formAlert && (
          <FormAlert
            type={formAlert.type}
            message={formAlert.message}
          ></FormAlert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <FormField
              name="name"
              type="text"
              label="Your name"
              defaultValue=""
              placeholder="Name"
              error={errors.name}
              inputRef={register({
                required: "Please enter your name",
              })}
            ></FormField>
            {isJoining && (
              <FormField
                name="code"
                type="text"
                label="Room Code"
                defaultValue={code ? code : ""}
                placeholder="Name"
                error={errors.name}
                inputRef={register({
                  required: "Please enter your name",
                })}
              ></FormField>
            )}
          </Form.Group>
          <Button type="submit" disabled={pending}>
            <span>Let's play</span>

            {pending && (
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden={true}
                className="ml-2"
              >
                <span className="sr-only">Sending...</span>
              </Spinner>
            )}
          </Button>
        </Form>
      </Container>
    </Section>
  );
}

export default NewGameSection;
