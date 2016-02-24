/*
 * UMD definition
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash', './crypto-lib/emojifier.js', './crypto-lib/emoji-list.js'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('lodash'), require('./crypto-lib/emojifier.js'), require('./crypto-lib/emoji-list.js'))
  } else {
    root.CryptoLib = factory(root._, root.Emojifier, root.EmojiList)
  }
}(this, function (_, Emojifier, EmojiList) {

  function encrypt (input, key) {
    var output = input
    key = Emojifier.toNumber(key)
    key = EmojiList.indexOf(key)
    // cesar chyper
    generateEmojiSubsetFrom(key)
    // encoding
    output = Emojifier.encode(output)
    return output
  }

  function decrypt (input, key) {
    var output = input
    if (!_.isNumber(key)) {
      key = Emojifier.toNumber(key)
    }
    key = EmojiList.indexOf(key)
    // cesar chyper
    generateEmojiSubsetFrom(key)
    // decoding
    output = Emojifier.decode(output)
    return output
  }

  function generateEmojiSubsetFrom (key) {
    Emojifier.generateEmojiListFrom(key)
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt,
    generateEmojiSubsetFrom: generateEmojiSubsetFrom
  }

}))
