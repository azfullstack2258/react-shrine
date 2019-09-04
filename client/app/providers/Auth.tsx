import React, { ComponentClass } from 'react';
import { Mutation, Query } from 'react-apollo';
import {
  CREATE_USER,
  LOGIN
} from 'app/providers/gql/auth';

function withCreateUser<C extends ComponentClass>(Component: C): C {
  return ((props => (
    <Mutation mutation={CREATE_USER}>
      {createUser => <Component createUser={createUser} {...props} />}
    </Mutation>
  )) as any) as C;
}

function withLogin<C extends React.ComponentClass>(Component: C): C {
  return ((props => (
    <Mutation mutation={LOGIN}>
      {login => {
        return <Component login={login} {...props} />;
      }}
    </Mutation>
  )) as any) as C;
}

export {
  withCreateUser,
  withLogin
};
