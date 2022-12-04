import express, { Request, Response } from 'express'
import { ApolloServer, Config, ExpressContext, gql } from 'apollo-server-express';
import typeDefs from './lib/typedefs';
import resolvers from './resolvers/resolvers';
import { createContext } from './context';

const app = express()
const port: number = 5100;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext
});

await server.start()
server.applyMiddleware({app})


app.get('/', (req: Request, res: Response) => {
  res.json({ greeting: 'Welcome to our server. Want a job?' })
})

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`)
})