import { gql } from '@apollo/client';

function ADD_TODO(cache, { data: { todo } }) {
  console.debug('In ADD_TODO update function: ', cache, todo);
  cache.modify({
    fields: {
      todo(existingTodos = []) {
        const newTodoRef = cache.writeFragment({
          data: todo,
          fragment: gql`
            fragment NewTodo on Todo {
              id
            }
          `
        });

        return [...existingTodos, newTodoRef];
      },
      todo_aggregate(aggregate) {
        const up = {
          __typename: 'todo_aggregate',
          aggregate: {
            __typename: 'todo_aggregate_fields',
            count: aggregate.aggregate.count + 1
          }
        };
        return up;
      }
    }
  });
}

function REMOVE_TODO(cache, { data: { result } }) {
  cache.modify({
    fields: {
      todo(existingTodos = []) {
        const deletedRef = `todo:${result.id}`;
        const newTodos = existingTodos.filter(item => item.__ref !== deletedRef);

        return newTodos;
      },
      todo_aggregate(count) {
        return { ...count, aggregate: { ...count.aggregate, count: count.aggregate.count - 1 } };
      }
    }
  });
}

export default function GetUpdateFunctionByName(name) {
  switch (name) {
    case 'ADD_TODO':
      return ADD_TODO;
    case 'REMOVE_TODO':
      return REMOVE_TODO;
    default:
      return null;
  }
}