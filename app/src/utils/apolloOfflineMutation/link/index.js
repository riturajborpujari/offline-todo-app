import { ApolloLink } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

export default function OfflineMutationLink(AddObectToStore, DeleteObjectFromStore) {
  return new ApolloLink((operation, forward) => {
    if (forward === undefined) {
      return null;
    }

    const name = operation.operationName;
    const context = operation.getContext();

    const id = uuidv4();

    if (!context.tracked) {
      const mutation = {
        name,
        query: operation.query,
        variables: operation.variables,
        context: {
          id,
          optimisticResponse: context.optimisticResponse,
          tracked: true
        }
      };

      AddObectToStore(id, { name, ...mutation });
      operation.setContext({ tracked: true, id });
    }

    return forward(operation).map(data => {
      const context = operation.getContext();

      if (context.tracked) {
        DeleteObjectFromStore(context.id);
      }
      return data;
    });
  });
}