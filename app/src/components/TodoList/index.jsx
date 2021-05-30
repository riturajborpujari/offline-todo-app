import { useQuery, useMutation } from '@apollo/client';

import { BsListTask as TaskListIcon } from '@react-icons/all-files/bs/BsListTask';

import { LIST_TODOS } from '../../graphql/queries';
import { UPDATE_TODO_CHECK_STATE, REMOVE_TODO } from '../../graphql/mutations';

import Section from '../../lib/Section';
import Todo from '../Todo';
import styles from './index.module.css';
import Icon from '../../lib/Icon';
import { useEffect, useState } from 'react';

export default function TodoList() {
  const [todo_delete_id, SetTodoForDeletion] = useState(null);
  const [todo_update, SetTodoForUpdate] = useState({ id: null, checked: false });

  const { error, loading, data } = useQuery(LIST_TODOS, { fetchPolicy: 'cache-and-network' });
  
  const [updateTodoCheckState] = useMutation(UPDATE_TODO_CHECK_STATE);
  const [removeTodo] = useMutation(REMOVE_TODO, {
    update(cache, { data: { result } }) {
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
    },

  })

  useEffect(() => {
    if (todo_delete_id) {
      removeTodo({
        variables: { id: todo_delete_id },
        optimisticResponse: {
          result: {
            __typename: 'todo',
            id: todo_delete_id
          }
        }
      })
        .then(_ => {
          SetTodoForDeletion(null);
        })
        .catch(err => {
          console.log('Delete error: ', err);
        })
    }
  }, [todo_delete_id, removeTodo]);

  useEffect(() => {
    if (todo_update && todo_update.id) {
      updateTodoCheckState({
        variables: { id: todo_update.id, checked: !todo_update.checked },
        optimisticResponse: {
          todo: {
            __typename: 'todo',
            id: todo_update.id,
            checked: !todo_update.checked
          }
        }
      })
        .then(_ => {
          SetTodoForUpdate({ id: null });
        })
        .catch(err => {
          console.log('Update error: ', err);
        })
    }
  }, [todo_update, updateTodoCheckState]);

  if (error) return <p className={styles.error}>{error.message}</p>;
  if (loading) return <p className={styles.info}>Loading...</p>;

  const handleCheckIconClick = (todo_id, curr_checked) => {
    SetTodoForUpdate({ id: todo_id, checked: curr_checked });
  }

  const handleDeleteIconClick = (todo_id) => {
    SetTodoForDeletion(todo_id);
  }

  return (
    <Section
      title={`Todos (${data && (data.aggregate ? data.aggregate.todo.count : '')})`}
      description='All the things you have to do'
      icon={
        <Icon
          Icon={TaskListIcon}
          color='#194ad1'
        />
      }
    >
      <div className={styles.list}>
        {
          data && data.todos.map(todo => (
            <div className={styles.list_item} key={todo.id}>
              <Todo
                todo={todo}
                handleCheckIconClick={handleCheckIconClick}
                handleDeleteIconClick={handleDeleteIconClick} />
            </div>
          ))
        }
      </div>
    </Section>
  )
}