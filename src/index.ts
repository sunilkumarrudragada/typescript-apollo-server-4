// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import 'dotenv/config';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from '@graphql-tools/schema';

import dbConnection from './models/index.js';
import basicAuthDirective from './directives/basicAuth.js';
import schema from './schema/index.js';
import resolvers from './resolvers/index.js';

const baDirective = basicAuthDirective('basicAuth');


await dbConnection.connect();

interface MyContext {
  token?: string;
}

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

let execSchema = makeExecutableSchema({
  typeDefs: [ ...schema ],
  resolvers: [ ...resolvers ],
});

execSchema = baDirective(execSchema);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<MyContext>({
  schema: execSchema,
  plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async () => ({
      models: dbConnection.models,
    }),
  }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log('🚀 Server ready at http://localhost:4000/');
