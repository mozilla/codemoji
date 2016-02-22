var https = require('https');
//reCAPTCHA secret key
var SECRET = "6Lc0txgTAAAAALR9ODwqH3rruWd2OcMGTx6UHCHd";

exports.verifyRecaptcha = function(key, callback) {
		https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data += chunk.toString()
		})
		res.on('end', function() {
			try {
				var jsonData = JSON.parse(data);
				callback(jsonData.success)
			}
			catch (e) {
				callback(false)
			}
		})
	})
}