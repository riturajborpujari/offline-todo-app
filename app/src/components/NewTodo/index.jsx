import { gql, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import { BiTask as TaskIcon } from '@react-icons/all-files/bi/BiTask';

import { ADD_TODO } from '../../graphql/mutations';

import Form from "../../lib/Form";
import ActionArea from "../../lib/Form/ActionArea";
import FormField from "../../lib/Form/FormField";
import Section from "../../lib/Section";
import useForm from "../../utils/useForm";

export default function NewTodo() {
  const { values, onChange, resetForm } = useForm({
    title: '',
    description: '',
    checked: false,
    created_at: new Date().toISOString().substr(0, 10)
  });

  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { todo } }) {
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
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const optimisticResponse = {
      todo: {
        __typename: 'todo',
        id: uuidv4(),
        ...values
      }
    };

    console.log('Optimistic response: ', optimisticResponse);

    addTodo({
      variables: { todo: values },
      optimisticResponse
    })
      .then(({ data, errors }) => {
        console.log('Add todo response: ', { data, errors });
        resetForm();
      })
      .catch(err => {
        console.log('Add todo Error: ', err);
      })
  }
  return (
    <Section
      title="Add new Todo"
      description='Fill in the details below to add a new Todo'
      icon={<TaskIcon color='#2D4' />}
    >
      <Form onSubmit={handleSubmit}>
        <FormField labelText='Title'>
          <input
            type="text"
            name='title'
            value={values.title}
            onChange={onChange}
            placeholder="Pick up Groceries" />
        </FormField>

        <FormField labelText='Description'>
          <textarea
            name='description'
            value={values.description}
            onChange={onChange}
            placeholder="Need to buy groceries and stationery from the market" rows={5} />
        </FormField>

        <FormField labelText="Date">
          <input
            type="date"
            name='created_at'
            value={values.created_at}
            onChange={onChange} />
        </FormField>

        <ActionArea>
          <input type="submit" value="Create" />
        </ActionArea>
      </Form>
    </Section>
  )
}