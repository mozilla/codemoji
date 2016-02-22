var express = require('express');
var path = require('path')
var bodyParser = require('body-parser');
var google_recaptcha = require('./google_recaptcha.js');
var app = express();
var port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
	res.sendFile(path.resolve('./views/form.html'))
})

app.post('/register', function(req, res) {

	google_recaptcha.verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
		console.log(req.body["g-recaptcha-response"]);
		if (success) {
			res.sendFile(path.resolve('./views/success.html'))
		}
		else {
			res.sendFile(path.resolve('./views/fail.html'))
		}
	})
})

app.listen(port, function() {
	console.log("Server listening on port: " + port)
})
