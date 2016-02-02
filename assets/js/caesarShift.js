/*
 * JavaScript implementation of the Caesar Cipher
 * https://en.wikipedia.org/wiki/Caesar_cipher
 */

var caesarShift = function caesarShift(str, shift) {
  // if shift is 0 return string
  if (shift == 0)
    return str
  // if shift is lower that 0 
  if (shift < 0)
    shift = shift + 26
  // shift mod 26
  shift = shift % 26

  var output = []
  for (var i = str.length-1; i >= 0; i--) {
    // Get the character we'll be appending
    var c = str[i]
    // If it's a letter...
    if (c.match(/[a-z]/i)) {
      // Get its code
      var code = str.charCodeAt(i)
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

var caesarEncode = function caesarEncode(string, shift) {
  return caesarShift(string, shift)
}
var caesarDecode = function caesarDecode(string, shift) {
  return caesarShift(string, -shift)
}