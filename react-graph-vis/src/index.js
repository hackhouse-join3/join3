import React,{useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ForceGraph from "./ForceGraph";
// import ForceGraph from "./ForceGraph_raw";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <ForceGraph />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
