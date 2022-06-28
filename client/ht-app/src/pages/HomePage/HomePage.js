import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Alert, Button, Form } from "react-bootstrap";
import info from "../../assets/info-icon.jpg";
import { ALERT_TIME } from "../../utils/environment";
import { getData, putData } from "../../utils/api.service";
import { io } from "socket.io-client";

export default function HomePage() {
  const [showAlert, setShowAlert] = useState(false);
  const [cameraImg, setCameraImg] = useState(
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
  );
  const [ledsStatus, setLedsStatus] = useState({
    led1: false,
    led2: false,
    led3: false,
  });

  useEffect(() => {
    const alertTimer = setTimeout(() => setShowAlert(false), ALERT_TIME);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [showAlert]);

  useEffect(() => {
    getData("/leds")
      .then((res) => {
        console.log("res :", res);
        setLedsStatus(res);
        console.log("get leds status successful");
      })
      .catch((err) => console.error("error :", err));
  }, []);

  const socket = io();
  socket.on("button", (notification) => {
    console.log("notification :", notification);
    if (!!notification) {
      setShowAlert(true);
    }
  });

  const blinkClicked = (event) => {
    event.preventDefault();

    putData("/leds/blinks")
      .then((res) => {
        console.log("leds blink successful");
      })
      .catch((err) => console.error("error :", err));
  };

  const cameraClicked = (event) => {
    event.preventDefault();

    getData("/camera")
      .then((res) => {
        setCameraImg(res);
        console.log("got camera image");
      })
      .catch((err) => console.error("error :", err));
  };

  const ledClicked = (e) => {
    const currentId = e.target.id;
    const ledData = { id: currentId, status: !ledsStatus[currentId] };
    // const led = {... ledsStatus};
    // led[currentId] = !led[currentId];
    // setLedsStatus(led);

    putData("/led", ledData)
      .then((res) => {
        const ledResults = { ...ledsStatus };
        console.log("res :", res);
        ledResults[currentId] = res.status;
        setLedsStatus(ledResults);
        console.log(`${currentId} state is change to ${res}`);
      })
      .catch((err) => console.error("error :", err));
  };

  return (
    <>
      {showAlert && (
        <Alert
          key="info"
          variant="info"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <img src={info} alt="info" />
          Button Press occurred
        </Alert>
      )}
      <div className="c-home-page">
        <h3 style={{ textAlign: "center" }}>Welcome to HT Bioimaging</h3>
        <div className="content-holder">
          <div>
            <div>
              <p>Capture an optic frame</p>
              <Button variant="outline-warning" onClick={cameraClicked}>
                Capture Optic
              </Button>
            </div>
            <img src={cameraImg} alt="camera img" />
          </div>
          <div>
            <div>
              <p>Control LEDs</p>
              <Button variant="outline-warning" onClick={blinkClicked}>
                Blink all LEDs
              </Button>
            </div>
            <Form>
              <Form.Check
                type="switch"
                id="led1"
                label="LED1"
                checked={!ledsStatus["led1"]}
                onChange={ledClicked}
              />
              <Form.Check
                type="switch"
                id="led2"
                label="LED2"
                checked={!ledsStatus["led2"]}
                onChange={ledClicked}
              />
              <Form.Check
                type="switch"
                id="led3"
                label="LED3"
                checked={!ledsStatus["led3"]}
                onChange={ledClicked}
              />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
