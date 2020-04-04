import React, { useState } from "react";
import FormAlert from "./FormAlert";
import AuthForm from "./AuthForm";
import AuthSocial from "./AuthSocial";
import AuthFooter from "./AuthFooter";
import { useRouter } from "next/router";

function Auth(props) {
  const router = useRouter();
  const redirectTo = router.query.redirect;
  const [formAlert, setFormAlert] = useState(null);

  const handleAuth = (user) => {
    if (redirectTo) {
      router.push(decodeURIComponent(redirectTo));
    } else {
      router.push(props.afterAuthPath);
    }
  };

  const handleFormAlert = (data) => {
    setFormAlert(data);
  };

  return (
    <>
      {formAlert && (
        <FormAlert
          type={formAlert.type}
          message={formAlert.message}
        ></FormAlert>
      )}

      <AuthForm
        type={props.type}
        typeValues={props.typeValues}
        inputSize={props.inputSize}
        onAuth={handleAuth}
        onFormAlert={handleFormAlert}
      ></AuthForm>

      {["signup", "signin"].includes(props.type) && (
        <>
          {props.providers && props.providers.length && (
            <>
              <small className="text-center d-block my-3">OR</small>
              <AuthSocial
                type={props.type}
                buttonText={props.typeValues.buttonText}
                inputSize={props.inputSize}
                providers={props.providers}
                showLastUsed={true}
                onAuth={handleAuth}
                onError={(message) => {
                  console.log(message);
                  handleFormAlert({
                    type: "error",
                    message: message,
                  });
                }}
              ></AuthSocial>
            </>
          )}

          <AuthFooter
            type={props.type}
            typeValues={props.typeValues}
          ></AuthFooter>
        </>
      )}
    </>
  );
}

export default Auth;
