var express = require('express');
var app = express();
var pg = require('pg');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/test', function(request, response){
  response.render('pages/test')
});

app.post('/test', function(request, response){
  var name = request.body.name;
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('INSERT INTO test_table(name) VALUES ($1)', [name], function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.redirect('/lost'); } //redirect to sumbissions
    });
  })
});


// requests from database for snake, lost, and sighted tables
app.get('/snake', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err)
       { console.error(err); response.send("Error " + err); }
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/snake', {results: result.rows} ); }
    });
  });
})


app.get('/lost', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err)
       { console.error(err); response.send("Error " + err); }
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/lost', {results: result.rows} ); }
    });
  });
})

app.get('/sighted', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err)
       { console.error(err); response.send("Error " + err); }
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/sighted', {results: result.rows} ); }
    });
  });
})




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



