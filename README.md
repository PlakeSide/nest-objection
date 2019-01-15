### Run

1. `yarn run:services`
1. `yarn start`
1. `yarn "db:migrate:force&seed"`

### GraphQL

1. Click http://localhost:3000/graphql
1. Run some queries:

```
  query Users {
    user(id:1) {
      firstName,
    }
  }

  query Users {
    users {
      firstName,
      emailAddress
    }
  }

  mutation Users {
    createUser(createUserInput: {
      firstName:"theFirst",
      lastName:"theLast",
      emailAddress:"email@acme.com"
    }) {
      firstName,
      emailAddress
    }
  }
```
