
import { AUTH_TOKEN_NAME } from './constants';

// const host = 'localhost:5000';
// const host = 'twofiftysix.api.williambuck.dev';

function logoutUser() {
  return new Promise((resolve, reject) => {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    resolve(false);
  });
}

// function loginUser(credentials) {
//   const LOGIN_MUTATION = gql`
//     mutation LoginMutation($email: String!, $password: String!) {
//       login(email: $email, password: $password) {
//         token
//       }
//     }
//   `;
//   return new Promise((resolve, reject) => {
//     const { loading, error, data } = useQuery(LOGIN_MUTATION, {
//       variables: {
//         email: credentials.email,
//         password: credentials.password
//       }
//     });
//     resolve(data)
//   });
// }

export {
  logoutUser,
}