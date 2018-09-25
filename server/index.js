var express = require('express');
var expressGraphQL = require('express-graphql');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
var model = require('./mongodb.js');
var schema = require('./graphqlSchema')
app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true
}))

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
