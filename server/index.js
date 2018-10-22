var express = require('express');
var expressGraphQL = require('express-graphql');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
var schema = require('./graphqlSchema')
app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true
}))

app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
