import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Register from "./components/register/register";
import Search from "./components/search/search";
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { history } from "../src/components/helpers/history";

const client = new ApolloClient({
  uri: "https://1j1f2miflg.execute-api.us-east-1.amazonaws.com/dev",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Register} />
            {/* <Route path="/register" component={Register} /> */}
            {/* <Redirect from="*" to="/" /> */}
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
