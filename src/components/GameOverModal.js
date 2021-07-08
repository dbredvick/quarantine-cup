import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as Fathom from "fathom-client";

export default function GameOverModal(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    Fathom.trackGoal("X3MYG9C4", 0);
    setShow(false);
    if (props.resetGameCallback) {
      props.resetGameCallback();
    }
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show && props.isGameOver} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You finished the deck 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you played a whole game. If you enjoyed playing, please
          consider donating to my beer and server cost fund. Stay safe!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            End game
          </Button>
          <Button variant="red" onClick={handleClose}>
            Play another
          </Button>
          <div
            onClick={handleClose}
            dangerouslySetInnerHTML={{
              __html: `<style>.bmc-button img{height: 34px !important;width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 10px 7px 10px !important;line-height: 35px !important;height:51px !important;min-width:217px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#FF5F5F !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 10px 7px 10px !important;font-size: 20px !important;letter-spacing:-0.08px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Lato', sans-serif !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/drewbredvick"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a Beer"><span style="margin-left:15px;font-size:19px !important;">Buy me a Beer</span></a>`,
            }}
          ></div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
