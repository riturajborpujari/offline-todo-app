import { gql } from '@apollo/client';

export const LIST_TODOS = gql`
  query LIST_TODOS($filters:todo_bool_exp $offset: Int $limit:Int){
    todos:todo(where:$filters offset: $offset limit:$limit order_by: {created_at: desc}){
      __typename
      id
      title
      description
      checked
      created_at
    }
    aggregate: todo_aggregate{
      todo: aggregate{
        count
      }
    }
  }
`;

export const GET_TODO = gql`
  query GET_TODO($id:bigint!){
    todo: todo_by_pk(id: $id){
      __typename
      id
      title
      description
      checked
      created_at
    }
  }
`;