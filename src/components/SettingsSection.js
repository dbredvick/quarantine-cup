import React, { useState } from "react";
import Section from "./Section";
import ReauthModal from "./ReauthModal";
import SettingsNav from "./SettingsNav";
import Container from "react-bootstrap/Container";
import SettingsGeneral from "./SettingsGeneral";
import SettingsPassword from "./SettingsPassword";
import { useAuth } from "./../util/auth.js";

function SettingsSection(props) {
  const auth = useAuth();
  const [section, setSection] = useState("general");

  // If an action is security sensitive it will
  // trigger a re-authentication flow.
  const [reauthState, setReauthState] = useState({
    show: false
  });

  const handleRequireReauth = callback => {
    setReauthState({
      show: true,
      callback: callback
    });
  };

  const handleCompleteReauth = () => {
    reauthState.callback();
    setReauthState({ show: false });
  };

  const handleCancelReauth = () => {
    setReauthState({ show: false });
  };

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {reauthState.show && (
        <ReauthModal
          provider={auth.user.providers[0]}
          onComplete={handleCompleteReauth}
          onCancel={handleCancelReauth}
        ></ReauthModal>
      )}

      <SettingsNav
        activeKey={section}
        onSelect={selected => setSection(selected)}
        className="justify-content-center"
      ></SettingsNav>
      <Container
        className="mt-5"
        style={{
          maxWidth: "450px"
        }}
      >
        {section === "general" && (
          <SettingsGeneral
            onRequireReauth={handleRequireReauth}
          ></SettingsGeneral>
        )}

        {section === "password" && (
          <SettingsPassword
            onRequireReauth={handleRequireReauth}
          ></SettingsPassword>
        )}
      </Container>
    </Section>
  );
}

export default SettingsSection;
