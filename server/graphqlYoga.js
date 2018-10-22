var path = require('path');
var express = require('express');
var {GraphQLServer} = require('graphql-yoga');
var bodyParser = require('body-parser');
var resolvers = require('./graphql/resolver')
var app = express();
app.use(bodyParser.json());

const options = {
  port: 3000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const server = new GraphQLServer({
  typeDefs: path.join(__dirname,'./graphql/schema.graphql'),
  resolvers
})

server.express.use(express.static(__dirname + '/../client/dist'));

server.start(options, ({port}) => {
  console.log(`Server listening on ${port}`)
})
