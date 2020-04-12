import React, { useState } from "react";
import FormAlert from "./FormAlert";
import Form from "react-bootstrap/Form";
import FormField from "./FormField";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "./../util/auth.js";
import { useForm } from "react-hook-form";
import { useUser, updateUser } from "./../util/db.js";

function SettingsGeneral(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  // Fetch user from database
  const uid = auth.user && auth.user.uid;
  const { data: user, status } = useUser(uid);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    return auth
      .updateEmail(data.email)
      .then(() => {
        // Show success alert message
        setFormAlert({
          type: "success",
          message: "Your profile has been updated",
        });

        // Update user in database
        return updateUser(user.uid, data);
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          // Remove existing alert message
          setFormAlert(null);

          // Show re-authentication modal and
          // then re-call onSubmit() when done.
          props.onRequireReauth(() => {
            onSubmit({ email: data.email });
          });
        } else {
          // Show error alert message
          setFormAlert({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  // Show loading indicator until
  // database query completes.
  if (status === "loading") {
    return "Loading ...";
  }

  return (
    <>
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
            label="Name"
            defaultValue={user.name}
            placeholder="Name"
            error={errors.name}
            inputRef={register({
              required: "Please enter your name",
            })}
          ></FormField>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <FormField
            name="email"
            type="email"
            label="Email Address"
            defaultValue={user.email}
            placeholder="Email"
            error={errors.email}
            inputRef={register({
              required: "Please enter your email",
            })}
          ></FormField>
        </Form.Group>
        <Button variant="red" type="submit" disabled={pending}>
          <span>Save</span>

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
    </>
  );
}

export default SettingsGeneral;
