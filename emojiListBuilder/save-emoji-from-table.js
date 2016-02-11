/*

  Save emoji from unicode.org

  http://unicode.org/emoji/charts/full-emoji-list.html

  Use your browser, paste this snipper and wait :)
*/

function getData(row) {
  var name = ''
  if ($('.name', row).length > 1)
    name = $($('.name', row)[0]).text()
  else
    name = $('.name', row).text()
  
  var emoji = {
    rchars: $('.rchars', row).text(),
    code: $('.code', row).text(),
    name: name,
    age: $('.age', row).text(),
  }
  // console.log(emoji)
  
  return emoji
}
var data = {
  emojis: []
}
$('table tbody tr').each(function (idx, elem) {
  data.emojis.push(getData(elem))
})
console.log(JSON.stringify(data))


var elem = $('table tbody tr')[1]
console.log(getData(elem))
