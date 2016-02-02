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

function emojiEncode(string) {
  // var output = []
  // string.split('').forEach(function (c) {
  //   // console.log(c)
  //   if (c.match(/[a-z]/i)) {
  //     var code = c.charCodeAt()
  //     // console.log(code)
  //     code = ((code - 97) % 26)
  //     // console.log(code)
  //     // console.log(String.fromCodePoint(EMOJI_POINTS_RANGE.lower + code))
  //     code = EMOJI_POINTS_RANGE.lower + code
  //     console.log(code)
  //     c = String.fromCodePoint(code)
  //   }
  //   output.push(c)
  // })
  // return output.join('')
  var output = ''
  for (var i = string.length - 1; i >= 0; i--) {
    var c = string[i]
    if (c.match(/[a-z]/i)) {
      var code = string.charCodeAt(i)
      // console.log(code)
      code = ((code - 97) % 26)
      code = EMOJI_POINTS_RANGE.lower + code
      // console.log(code)
      c = String.fromCodePoint(code)
    }
    output += c
  }
  return esrever.reverse(output)
}

// V1 - does not work, emoji are 2 char long
// function emojiDecode(string) {
//   var output = []
//   string.split('').forEach(function (c, index) {
//     // console.log(c)
//     // console.log(findSurrogatePair(c))
//     var code = string.codePointAt(index)
//     console.log(code)
//     code = (EMOJI_POINTS_RANGE.lower - code) + 97
//     console.log(code)
//     c = String.fromCodePoint(code)
//     console.log(c)

//     output.push(c)
//   })
//   return output.join('')
// }
// 
// V2 - recursion with globals
// var decodedOutput = ''
// function emojiDecode(string) {
//   console.log(string.length)
//   if (string.codePointAt(0) >= EMOJI_POINTS_RANGE.lower && 
//       string.codePointAt(0) <= EMOJI_POINTS_RANGE.upper) {
//     // console.log('down', string)
//     console.log('down', string.codePointAt(0))
//     // console.log('code', string.codePointAt(0) - EMOJI_POINTS_RANGE.lower)
//     decodedOutput += String.fromCodePoint(97 + string.codePointAt(0) - EMOJI_POINTS_RANGE.lower)
//     return emojiDecode(string.slice(2))
//   }
//   if (string == '') {
//     console.log('end')
//     return decodedOutput.split('').reverse().join('')
//   }
//   if (typeof string[0].codePointAt(1) === 'undefined') {
//     console.log('code', string[0].codePointAt())
//     decodedOutput += String.fromCodePoint(string.codePointAt(0))
//     return emojiDecode(string.slice(1))
//   }
// }

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
      memo += String.fromCodePoint(97 + ((string.codePointAt(0) - EMOJI_POINTS_RANGE.lower) % 26))
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
