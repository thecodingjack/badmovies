var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
const API_KEY = require('./config.js').API_KEY;
var model = require('./database.js');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    let params = {
        api_key : API_KEY
    }
    if(req.query.genreID) params.with_genres = req.query.genreID
    axios.get('https://api.themoviedb.org/3/discover/movie',{params})
        .then(({data})=>res.send(data.results))
    // and sort them by horrible votes using the search parameters in the API
});

app.get('/genres', function(req, res) {
    axios.get('https://api.themoviedb.org/3/genre/movie/list',{
        params:{
            api_key: API_KEY,
            language: 'en-US'
        }
    }).then(({data})=>res.send(data.genres))
});

app.post('/save', function(req, res) {
    model.saveFavorite(req.body,(err,results)=>{
        if(err) res.send(err)
        else res.send("SUCCESS")
    })
});

app.post('/delete', function(req, res) {
    model.deleteFavorite(req.body.id,(err,results)=>{
        if(err) res.send(err)
        else res.send("SUCCESS")
    })
});

app.get('/favs', function(req,res){
    model.getAllFavorites((err,results)=>{
        if(err) res.send(err)
        else res.send(results)
    })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
