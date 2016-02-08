(function (w) {
  'use strict'

  var CaesarShifter = {
    crypt: crypt,
    decrypt: decrypt
  }
  w.CaesarShifter = CaesarShifter

  function crypt (text, key) {
    return _caesarShift(text, key)
  }

  function decrypt (text, key) {
    return _caesarShift(text, -key)
  }

  function _caesarShift(text, shift) {
    // if shift is 0 or undefined return string
    if (typeof shift === 'undefined' || shift == 0)
      return text
    // if shift is lower that 0 
    if (shift < 0)
      shift = shift + 26
    // shift mod 26
    shift = shift % 26

    var output = []
    for (var i = text.length-1; i >= 0; i--) {
      // Get the character we'll be appending
      var c = text[i]
      // If it's a letter...
      if (c.match(/[a-z]/i)) {
        // Get its code
        var code = text.charCodeAt(i)
        // Uppercase letters
        if ((code >= 65) && (code <= 90))
          // retrict to A-Z sequence
          c = String.fromCharCode(((code - 65 + shift) % 26) + 65)
        // Lowercase letters
        else if ((code >= 97) && (code <= 122))
          // retrict to a-z sequence
          c = String.fromCharCode(((code - 97 + shift) % 26) + 97)
      }
      // Append
      output.push(c)
    }
    return output.reverse().join('')
  }  
  
})(window); 
