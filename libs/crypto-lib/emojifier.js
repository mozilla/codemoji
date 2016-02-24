/*
 * UMD definition
 */

(function (root, factory){
  if (typeof define === 'function' && define.amd) {
    define(['lodash', 'punycode', './emoji-list.js', './char-list.js'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('lodash'), require('punycode'), require('./emoji-list.js'), require('./char-list.js'))
  } else {
    root.Emojifier = factory(root._, root.punycode, root.EmojiList, root.CharList)
  }
}(this, function (_, punycode, EmojiList, CharList) {
 
  // make chars unicode codepoints
  var chars = _.flatten(_.map(CharList, function (c) { return punycode.ucs2.decode(c) }))
  var emojis = EmojiList.slice(0, CharList.length)

  function encode (text) {
    console.log(chars)
    // convert text into unicode points ( from ucs2 )
    var points = punycode.ucs2.decode(text)
    console.log(text, EmojiList, points, chars)
    // map points with emoji indexes
    points = _.map(points, function (point) {
      // if point is not a valid symbol return it
      if (!_.includes(chars, point)) return point
      // get index of point in CharList array
      var index = _.findIndex(chars, function (c) { return c == point })
      console.log(index)
      // return emoji char at index position
      return emojis[index]
    })
    // encode in ucs2
    return punycode.ucs2.encode(points)
  }

  function decode (text) {
    var decodeAlphaBet = CharList.slice(0)
    var i = 0
    while (decodeAlphaBet.length < emojis.length && i < 10) {
      var temp = CharList.slice(0)
      temp = _.shuffle(temp).join('')
      decodeAlphaBet += temp
      i++
    }
    // convert text into unicode points ( from ucs2 )
    var points = punycode.ucs2.decode(text)
    console.log(text, EmojiList, points)
    // map points with emojis index
    points = _.map(points, function (point) {
      // find index of point in emojis ( or -1 )
      var index = _.findIndex(emojis, function (el) { return el === point })
      console.log(index)
      // if point is found return it
      if (index >= 0) return decodeAlphaBet[(index)]
      // else convert point to char and return it
      return String.fromCodePoint(point)
    })
    // join points to create a string
    return points.join('')
  }

  function generateEmojiListFrom (key) {
    emojis = EmojiList.slice(0)
    var temp = emojis.splice(0, key)
    emojis = emojis.concat(temp)
    console.log(EmojiList, emojis)
  }

  function toKey (emoji) {
    emoji = toNumber(emoji)
    emoji = emoji  % CharList.length
    return emoji
  }

  function toNumber (emoji) {
    emoji = _.toString(emoji)
    if (_.isEmpty(emoji)) throw 'Emojifier.generateEmojiSubset needs a non-empty string'
    return _.head(punycode.ucs2.decode(emoji))
  }

  return {
    encode: encode,
    decode: decode,
    generateEmojiListFrom: generateEmojiListFrom,
    toNumber: toNumber,
    toKey: toKey,
  }
}));
