import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import casual from 'casual-browserify';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { SchemaLink } from "apollo-link-schema";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';
import { BrowserRouter } from 'react-router-dom';

import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
const typeDefs = `
type Query {
  galleries: [Gallery]
}

type Gallery {
  id: ID!
  name: String!
  photos: [Photo]
}

type Photo {
    id: ID!
    url: String!
}
`;
const schema = makeExecutableSchema({ typeDefs });
const mocks = {
    ID: () => 'SomeID',

    String: () => 'It works!',

    Gallery: () => ({
        name: casual.name(),
        photos: new MockList([2,6])
    }),

    Photo: () => ({
        url: 'http://lorem.pixel/200/200?lock=1'
    })
}
addMockFunctionsToSchema({ schema, mocks });


// const httpLink = new HttpLink({ uri: 'http://localhost:4000' });
const schemaLink = new SchemaLink(schema);

const client = new ApolloClient({
    link: schemaLink,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            < App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root')
);
registerServiceWorker();
