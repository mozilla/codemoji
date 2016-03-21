/*
 * UMD definition
 */

(function (root, factory) {
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
    // convert text into unicode points ( from ucs2 )
    var points = punycode.ucs2.decode(text)
    // map points with emoji indexes
    points = _.map(points, function (point) {
      // if point is not a valid symbol return it
      if (!_.includes(chars, point)) return point
      // get index of point in CharList array
      var index = _.findIndex(chars, function (c) { return c === point })
      // return emoji char at index position
      return emojis[index]
    })
    // encode in ucs2
    return punycode.ucs2.encode(points)
  }
  /**
  * Shuffles string in place.
  */
  function _shuffle (a) {
    a = a.split('')
    var n = a.length

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var tmp = a[i]
      a[i] = a[j]
      a[j] = tmp
    }
    return a.join('')
  }

  function decode (text) {
    var decodeAlfaBet = CharList.slice(0)
    // security check to avoid infinite loop
    var i = 0
    // add shuffle padding to the decoding alfabet to make it length like emoji set
    while (decodeAlfaBet.length < emojis.length && i < 10) {
      var temp = CharList.slice(0)
      temp = _shuffle(temp)
      decodeAlfaBet += temp
      i++
    }
    // convert text into unicode points ( from ucs2 )
    var points = punycode.ucs2.decode(text)
    // map points with emojis index
    points = _.map(points, function (point) {
      // find index of point in emojis ( or -1 )
      var index = _.findIndex(emojis, function (el) { return el === point })
      // if point is found return it
      if (index >= 0) return decodeAlfaBet[(index)]
      // else convert point to char and return it
      return String.fromCodePoint ? String.fromCodePoint(point) : ' '
    })
    // join points to create a string
    return points.join('')
  }

  function generateEmojiListFrom (key) {
    // like in cesar chyper shift the moji set of key value
    emojis = EmojiList.slice(0)
    var temp = emojis.splice(0, key)
    emojis = emojis.concat(temp)
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
    toNumber: toNumber
  }
}))
