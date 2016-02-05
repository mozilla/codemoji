(function (w) {
  'use strict'
  
  var Criptoloji = {
    /* Enable uppercase support
     *
     * If false all strings are downcased
     */
    enableUppercase: true,
    /* Enable emoji as encode/decode key
     *
     * If disabled and an emoji is passed as key an exception is raised
     */
    emojiKey: true,

    encode: encode,
    decode: decode
  }
  w.Criptoloji = Criptoloji

  var _downcaseCodePointMod = 26
  var _upcaseCodePointMod = 58
  var _upcaseAlphabetUnicodeStart = 65
  var _downcaseAlphabetUnicodeStart = 97


  function encode (text, key) {
    if (_isEmoji(key) && !this.emojiKey) throw 'ArgumentError: Emoji as key but Criptoloji.emojiKey is false'
    // console.log('emoji key', key)
    key = this.emojiKey ? _emoji2key(key) : key
    // console.log('key', key)
    text = this.enableUppercase ? text : text.toLowerCase()
    var mod = this.enableUppercase ? _upcaseCodePointMod : _downcaseCodePointMod
    var unicodeStart = this.enableUppercase ? _upcaseAlphabetUnicodeStart : _downcaseAlphabetUnicodeStart
    // console.log(mod, unicodeStart)
    text = CaesarShifter.encode(text, key)
    // console.log('caesar encode', text)
    text = Emojifier.encode(text, mod, unicodeStart).replace(/\n/g, '<br>')
    // console.log('emoji encode', text)
    return text
  }

  function decode (text, key) {
    if (_isEmoji(key) && !this.emojiKey) throw 'ArgumentError: Emoji as key but Criptoloji.emojiKey is false'
    // console.log('emoji key', key)
    key = this.emojiKey ? _emoji2key(key) : key
    // console.log('key', key)
    var mod = this.enableUppercase ? _upcaseCodePointMod : _downcaseCodePointMod
    var unicodeStart = this.enableUppercase ? _upcaseAlphabetUnicodeStart : _downcaseAlphabetUnicodeStart
    // console.log(mod, unicodeStart)
    text = Emojifier.decode(text, mod, unicodeStart).replace(/\n/g, '<br>')
    // text = this.enableUppercase ? text : text.toLowerCase()
    // console.log('emoji decode', text)
    text = CaesarShifter.decode(text, key)
    // console.log('caesar decode', text)
    return text
  }

  function _emoji2key (key) {
    if (_isEmoji(key)) {
      var codePoint = key.codePointAt(0) // get emoji codepoint
      // console.log(codePoint)
      var number = codePoint + 48 // 48 is the code of the first number in UNICODE
      // console.log(number)
      key = number % 26 // mod 26 to get caesar cipher key
    }
    // console.log(key)
    return key
  }

  function _isEmoji (text) {
    // console.log(text)
    return isNaN(Number(text))
  }
  
 
})(window); 
