import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import { ReactQueryProvider } from "./lib/react-query";

ReactDOM.render(
  <TransactionsProvider>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </TransactionsProvider>,
  document.getElementById("root"),
);
