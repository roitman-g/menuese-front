import ApolloClient, {gql} from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { withApollo, graphql } from '@apollo/react-hoc'
import React from 'react'
import { compose } from 'rambda'
import { GraphQLObjectType } from 'graphql'


const uri = 'http://localhost:4000/api'

const client =  new ApolloClient({ uri,
    request: (operation) => {
        const token = localStorage.getItem('token')
        console.log('doing what i can', token)
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    }
  })

// const logIn = () => ({
//     logIn: (username) => {
//         graphql(gql`
//         mutation updateUser(username: ${username}) {
//             id,
//             username
//         }`, { name: 'logIn' })
//     }
// })

const SIGN_UP_MUTATION = gql`
    mutation signUp($username: String!, $password: String!) {
        signUp(username: $username, password: $password) {
            token
        }
    }`

const LOG_IN_MUTATION = gql`
    mutation logIn($username: String!, $password: String!) {
        logIn(username: $username, password: $password) {
            token
        }
    }`

const QUERY_USER = gql`{
    user {
        id
    }
    
}`

// export const auth = (Component) => withApollo(graphql(PROFILE_QUERY, {
//     name: 'signUp',
//     props: ({ error, loading, customer, ownProps: { client }}) => ({
//       userLoading: loading, 
//       customer,
//       isLoggedIn: () => !!localStorage.getItem('nickname'),
//       resetOnLogout: async () => client.resetStore(),
//     }),
//     // options: {
//     //     name: ''
//     // }
//   }))(Component);

    // const fetchSome = async (url, i = 5) => {
    //     try {
    //         if (i > 0) {
    //             return await fetch(url)
    //         } else return
    //     } catch {
    //         return fetchSome(url, i - 1)
    //     }
    //     // return i < 0 ? prom.then(r => r.json()).catch(err => fetchSome(prom, i - 1)) : null 
    // }
export const createMutationForm = (mutation) => (props) => graphql(mutation, 
    {props: (ownProps) => ({ ...ownProps,  ...props})})

export const withLogIn = createMutationForm(LOG_IN_MUTATION)
export const withSignUp = createMutationForm(SIGN_UP_MUTATION)


export const auth = (Component) => compose(
    withApollo,
    graphql(SIGN_UP_MUTATION, {name: 'signUp'}),
    graphql(LOG_IN_MUTATION, {name: 'logIn'}),
    graphql(QUERY_USER, {name: 'user'})
)(Component)

export default (App) =>  (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)