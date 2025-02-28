import {graphql} from 'overmind-graphql';
import * as queries from './queries';
import * as mutations from './mutations';

export const gql = graphql({
  queries,
  mutations,
});
