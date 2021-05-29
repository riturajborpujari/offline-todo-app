import { gql } from '@apollo/client';

export const ADD_TODO = gql`
  mutation ADD_TODO($todo:todo_insert_input!){
    todo: insert_todo_one(object:$todo){
      __typename
      id
      title
      description
      checked
      created_at
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UPDATE_TODO($id:bigint! $update:todo_set_input!){
    todo: update_todo_by_pk(pk_columns:{id: $id} _set:$update){
      __typename
      id
    }
  }
`;

export const UPDATE_TODO_CHECK_STATE = gql`
  mutation UPDATE_TODO_CHECK_STATE($id:bigint! $checked:Boolean!){
    todo: update_todo_by_pk(pk_columns:{id: $id} _set:{checked: $checked}){
      __typename
      id
      checked
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation REMOVE_TODO($id:bigint!){
    result: delete_todo_by_pk(id:$id){
      __typename
      id
    }
  }
`;