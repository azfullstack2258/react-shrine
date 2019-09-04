import { gql } from 'apollo-boost';

export const GAMES = gql`
  query {
    games {
      title
      gameResults {
        player
        score
      }
    }
  }
`;
