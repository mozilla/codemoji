var _ = require('lodash')
var jsesc = require('jsesc')
var punycode = require('punycode')

var chars = require('./libs/crypto-lib/char-list.js')
var emojis = require('./libs/crypto-lib/emoji-list.js')
// var chars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~£¥¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'
console.log('chars  ', chars)

var CryptoLib = require('./libs/crypto-lib.js')
// var encryptedText = CryptoLib.encrypt(chars, '🍘')
// console.log('encrypt', encryptedText)
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '🍘'))

// CryptoLib.generateEmojiSubsetFrom('🍘')
// var encryptedText = CryptoLib.encrypt('this is a text', '🍘')
// console.log('encrypt', encryptedText)
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '🍘'))

var clearText = 'this is a text bau bau!!! :) AHAHAHAHAH'

clearText = chars

// CryptoLib.generateEmojiSubsetFrom('🍎')
var encryptedText = CryptoLib.encrypt(clearText, '🍎')
console.log('clear text', clearText)
console.log('Cryptoloji with key 🍎    ', encryptedText)
var decryptedText = CryptoLib.decrypt(encryptedText, '🍎')
console.log('decrypt with key 🍎       ', decryptedText)
decryptedText = CryptoLib.decrypt(encryptedText, '🐢')
console.log('decrypt with key 🐢       ', decryptedText)

_.each(emojis, function (e, i) {
  console.log('try n.' + i + ' with key ' + e)
  // 127822 is 🍎
  var bruteforceDecrypt = CryptoLib.decrypt(encryptedText, e)
  if (bruteforceDecrypt === clearText) {
    console.log('FAIL!!! 😢 with key ', e, bruteforceDecrypt)
    if (e === 127822) console.log('BUT 127822 is actually the key  🍎   😜')
  }
})
console.log('Done')

// CryptoLib.generateEmojiSubsetFrom('🐝')
// var encryptedText = CryptoLib.encrypt(clearText, '🐝')
// console.log('Cryptoloji with key 🐝')
// console.log('encrypt', encryptedText)
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '🐝'))

// CryptoLib.generateEmojiSubsetFrom('💣')
// var encryptedText = CryptoLib.encrypt(clearText, '💣')
// console.log('Cryptoloji with key 💣')
// console.log('encrypt', encryptedText)
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '💣'))

// CryptoLib.generateEmojiSubsetFrom('🚝')
// var encryptedText = CryptoLib.encrypt(clearText, '🚝')
// console.log('Cryptoloji with key 🚝')
// console.log('encrypt', encryptedText)
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '🚝'))
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '💺'))

// CryptoLib.generateEmojiSubsetFrom('💺')
// var encryptedText = CryptoLib.encrypt(clearText, '💺')
// console.log('Cryptoloji with key 💺')
// console.log('encrypt', encryptedText)
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '💺'))
// console.log('decrypt', CryptoLib.decrypt(encryptedText, '🚝'))


// caesar cypher OK
// var CaesarShifter = require('./libs/crypto-lib/caesar-shifter.js')
// console.log('encrypt', CaesarShifter.encrypt(chars, 0))
// console.log('encrypt', CaesarShifter.encrypt(chars, 1))
// console.log('encrypt', CaesarShifter.encrypt(chars, 2))
// console.log('encrypt', CaesarShifter.encrypt(chars, 3))
// console.log('encrypt', CaesarShifter.encrypt(chars, 4))
// console.log('encrypt', CaesarShifter.encrypt(chars, 10))
// console.log('decrypt', CaesarShifter.decrypt(CaesarShifter.encrypt(chars, 1), 1))
// console.log('decrypt', CaesarShifter.decrypt(CaesarShifter.encrypt(chars, 10), 10))

// emojifier
// var Emojifier = require('./libs/crypto-lib/emojifier.js')

// // Emojifier.generateEmojiListFrom()
// // console.log('0 ', Emojifier.encode(chars))
// // console.log('0 ', punycode.ucs2.encode(Emojifier.encode(chars)).length)
// Emojifier.generateEmojiListFrom(10)
// // console.log('20', Emojifier.encode(chars))
// // console.log('20', punycode.ucs2.encode(Emojifier.encode(chars)).length)

// gimmestats(Emojifier.encode(chars), 'encode')
// gimmestats2(Emojifier.decode(Emojifier.encode(chars)), 'decode')

// function gimmestats (text, name) {
//   console.log(name, text, punycode.ucs2.decode(text).length)
// }
// function gimmestats2 (text, name) {
//   console.log(name, text, text.length)
// }
