import React, { Component } from "react";
import { Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import "./App.css";
import AppRouter from "./routes";
import { createBrowserHistory } from "history";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Graphql error ${message}`);
      return 0;
    });
  }
});

const history = createBrowserHistory();

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <AppRouter />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
