import { ApolloClient, InMemoryCache } from '@apollo/client';

import { HASURA_GRAPHQL_URL, HASURA_GRAPHQL_ADMIN_SECRET } from '../config';

const client = new ApolloClient({
  uri: HASURA_GRAPHQL_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
  },
  cache: new InMemoryCache()
});

export default client;