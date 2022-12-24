import express, { Request, Response } from 'express'
import { ApolloServer} from '@apollo/server';
import typeDefs from './typedefs';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers/resolvers';
import requestIp from "request-ip";
import { loadhashmap } from './lib/datastructures/hashmap';
import { ApolloServerPluginUsageReporting } from "@apollo/server/plugin/usageReporting"
// express server configuration

await loadhashmap()
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
console.log(`${url} on ${new Date}`)