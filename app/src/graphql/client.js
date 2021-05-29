import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { RetryLink } from 'apollo-link-retry';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';

import { HASURA_GRAPHQL_URL, HASURA_GRAPHQL_ADMIN_SECRET } from '../config';

const httpLink = new HttpLink({
  uri: HASURA_GRAPHQL_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
  },
});

const retryLink = new RetryLink({
  attempts: { max: Infinity }
});

export const queueLink = new QueueLink();
const serializeLink = new SerializingLink();

export default async function setup() {
  /** retry infinitely upon HTTP link error */
  const link = ApolloLink.from([
    queueLink,
    serializeLink,
    retryLink,
    httpLink,
  ]);

  window.addEventListener('online', e => {
    queueLink.open();
  });

  window.addEventListener('offline', e => {
    queueLink.close();
  })

  const cache = new InMemoryCache();
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    key: 'app-cache'
  });

  const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true
  });

  return { client };
}