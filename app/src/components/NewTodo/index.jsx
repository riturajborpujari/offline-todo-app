import { gql, useMutation } from '@apollo/client';

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
              data: { ...todo, ...values },
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  title
                  description
                  checked
                  created_at
                }
              `
            });

            return [...existingTodos, newTodoRef];
          },
          todo_aggregate(count) {
            return { ...count, aggregate: { ...count.aggregate, count: count.aggregate.count + 1 } };
          }
        }
      });
    },
    optimisticResponse: {
      todo: {
        __typename: 'todo',
        id: 'temp_id'
      }
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();

    addTodo({ variables: { todo: values } })
      .then(_ => {
        resetForm();
      })
      .catch(err => {
        console.log('Error: ', err);
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