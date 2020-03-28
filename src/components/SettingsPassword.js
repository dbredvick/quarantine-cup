import React, { useState } from "react";
import FormAlert from "./FormAlert";
import Form from "react-bootstrap/Form";
import FormField from "./FormField";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "./../util/auth.js";
import { useForm } from "react-hook-form";

function SettingsPassword(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  const { register, handleSubmit, errors, reset, getValues } = useForm();

  const onSubmit = data => {
    // Show pending indicator
    setPending(true);

    auth
      .updatePassword(data.pass)
      .then(() => {
        // Clear form
        reset();
        // Show success alert message
        setFormAlert({
          type: "success",
          message: "Your password has been updated"
        });
      })
      .catch(error => {
        if (error.code === "auth/requires-recent-login") {
          // Remove existing alert message
          setFormAlert(null);

          // Show re-authentication modal and
          // then re-call onSubmit() when done.
          props.onRequireReauth(() => {
            onSubmit({ pass: data.pass });
          });
        } else {
          // Show error alert message
          setFormAlert({
            type: "error",
            message: error.message
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <>
      {formAlert && formAlert.message && (
        <FormAlert
          type={formAlert.type}
          message={formAlert.message}
        ></FormAlert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formName">
          <FormField
            name="pass"
            type="password"
            label="New Password"
            placeholder="Password"
            error={errors.pass}
            inputRef={register({
              required: "Please enter a password"
            })}
          ></FormField>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <FormField
            name="confirmPass"
            type="password"
            label="Confirm New Password"
            placeholder="Confirm Password"
            error={errors.confirmPass}
            inputRef={register({
              required: "Please enter your new password again",
              validate: value => {
                if (value === getValues().pass) {
                  return true;
                } else {
                  return "This doesn't match your password";
                }
              }
            })}
          ></FormField>
        </Form.Group>
        <Button
          variant={props.buttonColor}
          size={props.inputSize}
          type="submit"
          disabled={pending}
        >
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

export default SettingsPassword;
