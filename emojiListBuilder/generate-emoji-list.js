
var _ = require('lodash')
var regenerate = require('regenerate')
var punycode = require('punycode')
var fs = require('fs')

var emojis = require('./raw-emojis.json').emojis
var emojineeded = []

for (var i = 1; i <= 92; i++) { emojineeded.push(i) }
for (var i = 466; i <= 834; i++) { emojineeded.push(i) }
for (var i = 862; i <= 1105; i++) { emojineeded.push(i) }
for (var i = 110; i <= 163; i += 6) { emojineeded.push(i) }
for (var i = 165; i <= 266; i += 6) { emojineeded.push(i) }
emojineeded = emojineeded.concat([ 270, 276, 282 ])
for (var i = 322; i <= 460; i += 6) { emojineeded.push(i) }
emojineeded = emojineeded.concat([ 98, 283, 290, 294, 296, 297, 314, 315, 316 ])

console.log(emojineeded.length + ' to be found')

var emojifound = _.filter(emojis, function (e) {
  // console.log(_.includes(emojineeded, e.rchars))
  return _.includes(emojineeded, parseInt(e.rchars))
  // return e.rchars == 98
})

console.log(emojifound.length + ' found')

var set = regenerate()

// set.addRange(1, 92)

_(emojifound)
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

// remove zero width joiner
// http://unicode.org/reports/tr51/#Emoji_ZWJ_Sequences
set.remove(0x200D)

console.log(set.toString())
console.log(set.toArray())
console.log(set.toArray().length)
console.log(set.contains("👨‍❤️‍👨"))

fs.writeFile("probable-emojis.json", JSON.stringify(set.toArray()), function(err) {
  if(err) return console.log(err)
  console.log("The file was saved!")
})


var content = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body>'
_.each(set.toArray(), function (e) { content += '<span>' + String.fromCodePoint(e) + '</span>' })
content += '<script src="//twemoji.maxcdn.com/twemoji.min.js"></script><script>twemoji.parse(document.body);</script></body></html>'


fs.writeFile("/tmp/test.html", content, function(err) {
  if(err) return console.log(err)
  console.log("The file was saved!")
})


// var s = regenerate()
//   .add([0x1F468, 0x200D, 0x2764, 0xFE0F, 0x200D, 0x1F468])
// console.log(s)
// console.log(s.toString())
// console.log(s.toArray())
// console.log(s.contains("👨‍❤️‍👨"))

// // _.each(emojifound, function (e) { console.log(String.fromCodePoint(e.code)) })
