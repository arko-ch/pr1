import React from "react";
import QRious from "qrious";

import "./styles.css";
//  fetch(config.returnEnv() + `pdftronannots?annotationId=${annotationId}`, 7373fc5d-baf3-803c-a0ac-9a7f284bd898
export default function App() {
  const generateQR = () => {
    new QRious({
      element: document.getElementById("qr-div"),
      value: "random-string"
    });
  };
  return (
    <div className="App">
      <canvas id="qr-div" />
      <br />
      <button onClick={generateQR}> Generate QR </button>
    </div>
  );
}

//  fetch(config.returnEnv() + `pdftronannots?annotationId=${annotationId}`, 7373fc5d-baf3-803c-a0ac-9a7f284bd898