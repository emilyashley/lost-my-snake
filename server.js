var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));



// views is directory for all template files
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});


//test form submission for single variable entry to db
app.route('/test')
  .get(function(request, response){
    response.render('pages/test')
  })
  .post(function(request, response){
    var name = request.body.name;
    pg.connect(process.env.DATABASE_URL, function(err, client, done){
      client.query('INSERT INTO test_table(name) VALUES ($1)', [name], function(err, result) {
        done();
        if (err)
        { console.error(err); response.send("Error " + err); }
        else
        { response.redirect('/posts'); } //redirect to sumbissions
      });
    })
  });


//submissions of lost and seen snakes
app.route('/lost')
  .get(function(request, response){
    response.render('pages/lost')
  })
  .post(function(request, response){
    var name = request.body.name;
    pg.connect(process.env.DATABASE_URL, function(err, client, done){
      client.query('INSERT INTO test_table(name) VALUES ($1)', [name], function(err, result) {
        done();
        if (err)
        { console.error(err); response.send("Error " + err); }
        else
        { response.redirect('/posts'); } //redirect to sumbissions
      });
    })
});

app.route('/seen')
  .get(function(request, response){
    response.render('pages/seen')
  })
  .post(function(request, response){
    var name = request.body.name;
    pg.connect(process.env.DATABASE_URL, function(err, client, done){
      client.query('INSERT INTO test_table(name) VALUES ($1)', [name], function(err, result) {
        done();
        if (err)
        { console.error(err); response.send("Error " + err); }
        else
        { response.redirect('/sightings'); } //redirect to sumbissions
      });
    })
});

app.route('/report')
  .get(function(request, response){
    response.render('pages/guidelines')
})


// requests from database for all snake, lost, and sighted tables
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

app.get('/sightings', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err)
       { console.error(err); response.send("Error " + err); }
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/sightings', {results: result.rows} ); }
    });
  });
})

app.get('/posts', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err)
       { console.error(err); response.send("Error " + err); }
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/posts', {results: result.rows} ); }
    });
  });
})




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



