var fs = require('fs')
var Converter = require("csvtojson").Converter
var converter = new Converter({})
 
var myData = {}

var outputFilename = 'assets/text/text.json'

//end_parsed will be emitted once parsing finished 
converter.on("end_parsed", function (jsonArray) {
	build_languages_json(jsonArray)
})
 
//read from file 
fs.createReadStream("csv/text.csv").pipe(converter)


function build_languages_json(jsonArray) {
	// var languages = {
	// 	en: {},
	// 	ar: {}
	// }

	// console.log(jsonArray)
	
	// jsonArray.forEach(function(d, i){
	// 	languages.en[d.id] = d.en
	// 	languages.ar[d.id] = d.ar

	//  })
		
	// console.log(languages)
	fs.writeFile(outputFilename, "var slides = " + JSON.stringify(jsonArray, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + outputFilename);
	    }
	})
}


