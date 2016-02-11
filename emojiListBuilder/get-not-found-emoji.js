
var notFound = []
$("span:not(:has(*))").each(function (i, e) { 
  notFound.push(($(e).text().codePointAt()))
})
console.log(JSON.stringify(notFound))
