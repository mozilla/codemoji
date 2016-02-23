/*
 * UMD definition
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash', './crypto-lib/caesar-shifter.js', './crypto-lib/emojifier.js'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('lodash'), require('./crypto-lib/emojifier.js'), require('./crypto-lib/emoji-list.js'));
  } else {
    root.CryptoLib = factory(root._, root.Emojifier, root.EmojiList);
  }
}(this, function (_, Emojifier, EmojiList) {

  function encrypt (input, key) {
    var output = input
    key = Emojifier.toNumber(key)
    key = EmojiList.indexOf(key)
    console.log(input, key, EmojiList)
    // cesar chyper
    generateEmojiSubsetFrom(key)
    output = Emojifier.encode(output)
    return output
  }

  function decrypt (input, key) {
    var output = input
    key = Emojifier.toNumber(key)
    key = EmojiList.indexOf(key)
    console.log(input, key, EmojiList)
    generateEmojiSubsetFrom(key)
    output = Emojifier.decode(output)
    return output
  }

  function generateEmojiSubsetFrom (key) {
    Emojifier.generateEmojiListFrom(key)
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt,
    generateEmojiSubsetFrom: generateEmojiSubsetFrom,
  }

  function _emoji2key (key) {
    if (_isEmoji(key)) {
      key = Emojifier.toKey(key)
    }
    return key
  }

  function _isEmoji (text) {
    return isNaN(Number(text))
  }
}));
