import React, { ComponentClass } from 'react';
import { Query } from 'react-apollo';

import {
  GAMES
} from './gql/games';

function withGames<C extends ComponentClass>(Component: C): C {
  return ((props => (
    <Query query={GAMES}>
      {({ loading, data }) => (
        <Component
          loading={loading}
          countries={data && data.countries}
          {...props}
        />)
      }
    </Query>
  )) as any) as C;
}

export { withGames };
