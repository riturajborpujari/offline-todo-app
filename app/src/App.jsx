import {ApolloProvider} from '@apollo/client';

import client from './graphql/client';
import AppLayout from './layouts/AppLayout';
import Homepage from './pages/Homepage';

export default function App() {
  return (
    <AppLayout>
      <ApolloProvider client={client}>
        <Homepage />
      </ApolloProvider>
    </AppLayout>
  );
}
