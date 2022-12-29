import { ApolloServer} from '@apollo/server';
import typeDefs from './typedefs';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers/resolvers';
import { loadhashmap } from './lib/datastructures/hashmap';
// express server configuration

// await loadhashmap()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError(formattedError, error) {
        return formattedError
    },
    
});

const {url} = await startStandaloneServer(server, {
  context: async ({req}) => ({ request: req }),
  listen: {port: 5100}
})
console.log(`${url}`)