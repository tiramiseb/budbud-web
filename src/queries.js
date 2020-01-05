import { gql } from 'apollo-boost';

export const Qme = gql`
{
  me {
    email
  }
}`

export const Qworkspaces = gql`
{
  workspaces {
    id
    name
    owner {
      email
    }
  }
}
`

export const Mlogin = gql`
mutation DoLogin($email: String!, $password: String!) {
  login(email:$email, password:$password) {
    email
  }
}`

export const Mlogout = gql`
mutation {
  logout(none:true)
}`