
var env = require('jsdom').env
var html = 'http://emojipedia.org/apple/'
var _ = require('lodash')
var Q = require('q')
var fs = require('fs')

function getEmojiFromPage($, url) {
  return Q.Promise(function (resolve, reject) {
    url = 'http://emojipedia.org'+url
    console.log(url)
    $.ajax({
      url: url,
      success: function (data) {
        var emoji = $('.emoji-copy', data).val();
        resolve({ emoji: emoji, codePoint: emoji.codePointAt() });
      },
      dataType: 'html'
    })
  })
}

function getLink ($, elem) {
  var link = $(elem).parent('a').attr('href');
  return link
}

var emojis = []
var promises = []

// first argument can be html string, filename, or url
env(html, function (errors, window) {
  console.log(errors);

  var $ = require('jquery')(window);

  var elements = $('.emoji-grid img')
  // elements = elements.splice(0, 50)
  console.log(elements.length)

  _.each(elements, function (el,index) {
    var link = getLink($, el)
    console.log(index, link)
    var pro = getEmojiFromPage($, link)
      .then(function (result) {
        console.log(index)
        //console.log(result)
        emojis.push({ number: index, emoji: result.emoji, codePoint: result.codePoint, url: link })
      })
      .catch(function (reason) { emojis.push({ number: index, emoji: null, codePoint: null, url: link }) })
    promises.push(pro)
  })

  Q.allSettled(promises)
    .then(function (results) {
      // console.log(JSON.stringify(emojis))
      fs.writeFile("./whatsapp-sorted-list.json", JSON.stringify(_.sortBy(emojis, 'number')), function(err) {
        if(err) return console.log(err)
        console.log("The file sorted-list.json was saved!")
      })
    })
});
