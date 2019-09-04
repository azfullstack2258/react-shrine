import React, { ComponentClass } from 'react';
import { ApolloConsumer } from 'react-apollo';

function withApolloClient<C extends ComponentClass>(Component: C): C {
  return ((props => (
    <ApolloConsumer>
      {client => (<Component client={client} {...props} />)}
    </ApolloConsumer>
  )) as any) as C;
}

export default withApolloClient;
