import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { AuthProvider } from '../hooks/auth-context';
import { DarkModeProvider } from '../hooks/dark-mode-context';

import { AUTH_TOKEN_NAME } from '../constants';


const httpLink = createHttpLink({
  // uri: 'http://localhost:4000'
  // uri: process.env.REACT_APP_GRAPHQL_HOST
  uri: process.env.NODE_ENV === "development"
  ? "http://localhost:4000"
  : "https://api.twofiftysix.williambuck.dev",
});

const authLink = setContext((_, { headers}) => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const wsLink = new WebSocketLink({
  // uri: `ws://localhost:4000`,
  // uri: `${process.env.REACT_APP_GRAPHQL_WS_HOST}`,
  uri: process.env.NODE_ENV === "development" 
  ? "ws://localhost:4000"
  : "wss://api.twofiftysix.williambuck.dev",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN_NAME),
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

window.matchMedia = window.matchMedia || function() {
  return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
  };
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
