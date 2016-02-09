(function (w) {
  'use strict'
  
  var Emojifier = {
    encode: encode,
    decode: decode
  }
  w.Emojifier = Emojifier

  var EMOJI_POINTS_RANGE = { lower: 128513, upper: 128591 }

  function encode (text, mod, unicodeStart) {
    var output = ''
    for (var i = text.length - 1; i >= 0; i--) { // reverse loop for speed
      var c = text[i]
      if (c.match(/[a-z]/i)) {
        // console.log(text[i])
        var code = text.charCodeAt(i)
        // console.log(code)
        code = ((code - unicodeStart) % mod)
        // console.log(code)
        code = EMOJI_POINTS_RANGE.lower + code
        // console.log(code)
        c = String.fromCodePoint(code)
      }
      output += c
    }
    return esrever.reverse(output) // array reverse
  }

  function decode (text, mod, unicodeStart) {
    function recursiveDecode(memo, text) {
      // console.log(text.length)
      // termination condition: when text is empty
      if (text.length == 0) {
        // console.log('end')
        return memo
      }
      // if first codePoint is in the Emoji UNICODE range
      // ATTENTION: text.codePointAt(0) != text[0].codePointAt()
      if (text.codePointAt(0) >= EMOJI_POINTS_RANGE.lower && 
          text.codePointAt(0) <= EMOJI_POINTS_RANGE.upper) {
        // console.log('down', text.codePointAt(0))
        // subtract to codePoint lower emoji value, mod 26 than add 97 (lowercase 'a')
        memo += String.fromCodePoint(unicodeStart + (text.codePointAt(0) - EMOJI_POINTS_RANGE.lower) % mod)
        // go down the rabbit hole without first 2 chars (because emoji are 2 char in UTF8)
        return recursiveDecode(memo, text.slice(2))
      }
      // if first char second codePoint is undefined, is a "normal" char    
      if (typeof text[0].codePointAt(1) === 'undefined') {
        // console.log('code', text[0].codePointAt())
        // convert to text
        memo += String.fromCodePoint(text.codePointAt(0))
        // go down the rabbit hole without first char
        return recursiveDecode(memo, text.slice(1))
      }
    }
    // return decoded text
    return recursiveDecode('', text)
  }

})(window); 
