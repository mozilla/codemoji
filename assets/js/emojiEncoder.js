function findSurrogatePair(point) {
  // assumes point > 0xffff
  var offset = point - 0x10000,
      lead = 0xd800 + (offset >> 10),
      trail = 0xdc00 + (offset & 0x3ff);
  return [lead.toString(16), trail.toString(16)];
}

/*
 * WE NEED to import esrever library
 */

var EMOJI_POINTS_RANGE = { lower: 128513, upper: 128591 }
var lowercase_mod = 26
var uppercase_mod = 58
var uppercase_enabled = true
var mod = uppercase_enabled ? uppercase_mod : lowercase_mod

function emojiEncode(string) {
  var output = ''
  for (var i = string.length - 1; i >= 0; i--) {
    var c = string[i]
    if (c.match(/[a-z]/i)) {
      var code = string.charCodeAt(i)
      // console.log(code)
      code = ((code - 65) % mod)
      code = EMOJI_POINTS_RANGE.lower + code
      // console.log(code)
      c = String.fromCodePoint(code)
    }
    output += c
  }
  return esrever.reverse(output)
}

function emojiDecode(string) {
  function emojiDecodeRecursion(memo, string) {
    // console.log(string.length)
    // termination condition: when string is empty
    if (string.length == 0) {
      // console.log('end')
      // we used recursion, so memo is in inverse order
      return memo
    }
    // if first codePoint is in the Emoji UNICODE range
    // ATTENTION: string.codePointAt(0) != string[0].codePointAt()
    if (string.codePointAt(0) >= EMOJI_POINTS_RANGE.lower && 
        string.codePointAt(0) <= EMOJI_POINTS_RANGE.upper) {
      // console.log('down', string.codePointAt(0))
      // subtract to codePoint lower emoji value, mod 26 than add 97 (lowercase 'a')
      memo += String.fromCodePoint(65 + (string.codePointAt(0) - EMOJI_POINTS_RANGE.lower) % mod)
      // go down the rabbit hole without first 2 chars (because emoji are 2 char in UTF8)
      return emojiDecodeRecursion(memo, string.slice(2))
    }
    // if first char second codePoint is undefined, is a "normal" char    
    if (typeof string[0].codePointAt(1) === 'undefined') {
      // console.log('code', string[0].codePointAt())
      // convert to string
      memo += String.fromCodePoint(string.codePointAt(0))
      // go down the rabbit hole without first char
      return emojiDecodeRecursion(memo, string.slice(1))
    }
  }
  // return decoded string
  return emojiDecodeRecursion('', string)
}


// function testEncode(string) {
//   string = string.toLowerCase()
//   // console.log(string.length) // 14
//   var encoded = emojiEncode(string)
//   // console.log(encoded.length) // 25. TAKE THAT!
//   console.log(encoded)
//   var decoded = emojiDecode(encoded)
//   console.log("'" + decoded + "'")
// }

// testEncode('this is a text')
// testEncode('Edoardo Tenani')
// testEncode("If you specify a different number of elements to insert than the number you're removing, the array will have a different length at the end of the call.")
// testEncode("The slice() method returns a shallow copy of a portion of an array into a new array object.")
