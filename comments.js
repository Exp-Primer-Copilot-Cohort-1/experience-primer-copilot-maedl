// create web server
var express = require('express');
var app = express();
// create http server
var http = require('http');
var server = http.createServer(app);
// create socket.io server
var io = require('socket.io').listen(server);
// create mysql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'comments'
});
// connect to mysql
connection.connect();

// set view engine to ejs
app.set('view engine', 'ejs');
// set static folder
app.use(express.static(__dirname + '/public'));

// set default route
app.get('/', function(req, res) {
	res.render('index');
});

// socket.io server
io.on('connection', function(socket) {
	// get comments
	socket.on('getComments', function(data) {
		var sql = 'SELECT * FROM comments ORDER BY id DESC LIMIT 10';
		connection.query(sql, function(err, rows, fields) {
			if (err) {
				throw err;
			}
			socket.emit('getComments', rows);
		});
	});
	// add comment
	socket.on('addComment', function(data) {
		var sql = 'INSERT INTO comments (name, comment) VALUES (?, ?)';
		var params = [data.name, data.comment];
		connection.query(sql, params, function(err, rows, fields) {
			if (err) {
				throw err;
			}
			io.sockets.emit('addComment', data);
		});
	});
});

// listen to port 3000
server.listen(3000, function() {
	console.log('Server running at http://localhost:3000');
});