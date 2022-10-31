import express, { Request, Response } from 'express'
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './lib/typedefs';
import resolvers from './lib/resolvers/resolvers';

const app = express()
const port = 5100

const server = new ApolloServer({
    typeDefs,
    resolvers
})

await server.start()
server.applyMiddleware({app})


app.get('/', (req: Request, res: Response) => {
  res.json({ greeting: 'Hello world!' })
})

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`)
})
