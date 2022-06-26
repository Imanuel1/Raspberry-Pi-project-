import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Alert, Button, Form } from "react-bootstrap";
import info from '../../assets/info-icon.jpg'
const ALERT_TIME = 8000;

export default function HomePage() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowAlert(false), ALERT_TIME);
  }, [showAlert])
  
  return (
    <>
      {showAlert && (
        <Alert key='info' variant='info' onClose={() => setShowAlert(false)} dismissible>
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
              <Button variant="outline-warning">Capture Optic</Button>
            </div>
            <p>camera</p>
          </div>
          <div>
            <div>
              <p>Control LEDs</p>
              <Button variant="outline-warning">Blink all LEDs</Button>
            </div>
            <Form>
              <Form.Check type="switch" id="led1" label="LED1" />
              <Form.Check type="switch" id="led2" label="LED2" />
              <Form.Check type="switch" id="led3" label="LED3" />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
