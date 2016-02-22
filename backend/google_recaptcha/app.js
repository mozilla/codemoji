var express = require('express');
var path = require('path')
var bodyParser = require('body-parser');
var google_recaptcha = require('./google_recaptcha.js');
var app = express();
var port = 3000;
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	res.header("Access-Control-Allow-Methods", "*")
	next();
})


app.use(bodyParser.urlencoded({ extended: false }));
app.post('/share', function(req, res) {
	console.log(req.body['captcha_string'])
	google_recaptcha.verifyRecaptcha(req.body['captcha_string'], function(success) {

		if (success) {
			res.sendStatus(200)
		}
		else {
			res.sendStatus(400)
		}
	})
})

app.listen(port, function() {
	console.log("Server listening on port: " + port)
})
