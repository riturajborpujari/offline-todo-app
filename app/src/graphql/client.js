import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { RetryLink } from 'apollo-link-retry';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';

import { OfflineMutationLink, SyncOfflineMutations } from '../utils/apolloOfflineMutation';
import LocalStorageStore from '../utils/localStorageStore';
import { HASURA_GRAPHQL_URL, HASURA_GRAPHQL_ADMIN_SECRET } from '../config';

const localStore = LocalStorageStore({ storageKey: 'OFFLINE_MUTATIONS_STORE' });

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
const offlineMutationsLink = OfflineMutationLink(localStore.AddObectToStore, localStore.DeleteObjectFromStore);

export default async function setup() {
  const link = ApolloLink.from([
    offlineMutationsLink,
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

  /** Run Tracked Offline mutations */

  const store = localStore.GetStore();

  if (Object.keys(store).length) {
    console.debug('[Offline Data]: Syncing...');
    SyncOfflineMutations(client, store)
      .then(_ => {
        console.debug('[Offline Data]: Sync complete');
        client.reFetchObservableQueries();
      })
      .catch(err => {
        console.log('[Offline Data]: Could not sync');
        console.debug(err);
      })
  }

  return { client };
}