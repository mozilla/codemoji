var _ = require('lodash')
var regenerate = require('regenerate')
var punycode = require('punycode')

var emojis = require('./raw-emojis.json').emojis

var set = regenerate()

// set.addRange(1, 92)

_(emojis)
  .map(function (e) {
    return e.code
  })
  .each(function (e) {
    // console.log(e)
    var codepoints = e.replace(/U\+/g, '0x').split(' ')
    codepoints = _.map(codepoints, function (e) {  return parseInt(e, 16) })
    // console.log(codepoints)
    set.add(codepoints)
  })

console.log(set.toString())
console.log(set.toArray())
console.log(emojis.length)
console.log(set.toArray().length)
console.log(set.contains("👨‍❤️‍👨"))

var content = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>'
_.each(set.toArray(), function (e) { content += '<span>' + String.fromCodePoint(e) + '</span>' })
content += '<script src="//twemoji.maxcdn.com/twemoji.min.js"></script><script>twemoji.parse(document.body);</script></body></html>'

var fs = require('fs');
fs.writeFile("/tmp/twemoji.html", content, function(err) {
    if(err) return console.log(err)
    console.log("The file was saved!");
}); 
