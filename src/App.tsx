import React from "react";
import "./ApolloProvider";
import logo from "./logo.svg";
import "./App.css";
import ApolloProvider from "./ApolloProvider";
import Foo from "./Foo";

function App() {
  return (
    <ApolloProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Foo />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
