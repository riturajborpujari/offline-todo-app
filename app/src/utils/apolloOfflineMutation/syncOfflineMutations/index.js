import GetUpdateFunctionByName from "../../../graphql/updateFunctions";

/**
 * Sync Offline mutations from localStorage by running them again
 * @param {ApolloClient} client 
 */
export default function SyncOfflineMutations(client, store) {
  const trackedMutationIds = Object.keys(store);

  const mutations = [];

  if (trackedMutationIds.length) {
    trackedMutationIds.forEach(id => {
      const { query, name, context, variables } = store[id];

      const mutationData = {
        mutation: query,
        context,
        variables,
        optimisticResponse: context.optimisticResponse,
      };
      const update = GetUpdateFunctionByName(name);

      if (update) {
        mutationData.update = update;
      }

      mutations.push(client.mutate(mutationData));
    });
  }

  return Promise.all(mutations);
}