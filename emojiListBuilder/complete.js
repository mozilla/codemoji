
var _ = require('lodash')
var regenerate = require('regenerate')
var punycode = require('punycode')
var fs = require('fs')

var probable_emojis = require('./probable-emojis.json')
var not_found_emojis = require('./not-found-emojis.json')


var emojis = _.filter(probable_emojis, function (e) {
  console.log(_.includes(not_found_emojis, e))
  return !_.includes(not_found_emojis, e)
})


console.log('probable emojis : ' + probable_emojis.length)
console.log('not found emojis: ' + not_found_emojis.length)
console.log('remaining       : ' + emojis.length)


var template = "(function (window, Cryptoloji, undefined) {\n  'use strict'\n  Cryptoloji.emojis = <%= emojis %>\n})(window, window.Cryptoloji)"
var content = _.template(template)({ emojis: JSON.stringify(emojis) })

fs.writeFile("../assets/js/libs/emojis.js", content, function(err) {
  if(err) return console.log(err)
  console.log("The file emojis.json was saved!")
})

var content = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>'
_.each(emojis, function (e) { content += '<span>' + String.fromCodePoint(e) + '</span>' })
content += '<script src="//twemoji.maxcdn.com/twemoji.min.js"></script><script>twemoji.parse(document.body);</script></body></html>'

fs.writeFile("/tmp/complete.html", content, function(err) {
  if(err) return console.log(err)
  console.log("The file was saved!")
})
