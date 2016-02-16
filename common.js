var _ = require('lodash')
var jsesc = require('jsesc')
var punycode = require('punycode')


var chars = require('./libs/crypto-lib/char-list.js')
// var chars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~£¥¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'
console.log('chars  ', chars)

var CryptoLib = require('./libs/crypto-lib.js')
var encryptedText = CryptoLib.encrypt(chars, '🍘')
console.log('encrypt', encryptedText)
console.log('decrypt', CryptoLib.decrypt(encryptedText, '🍘'))


CryptoLib.generateEmojiSubsetFrom('🍘')
var encryptedText = CryptoLib.encrypt('this is a text', '🍘')
console.log('encrypt', encryptedText)
console.log('decrypt', CryptoLib.decrypt(encryptedText, '🍘'))

CryptoLib.generateEmojiSubsetFrom('🍎')
var encryptedText = CryptoLib.encrypt('this is a text', '🍎')
console.log('encrypt', encryptedText)
console.log('decrypt', CryptoLib.decrypt(encryptedText, '🍎'))

CryptoLib.generateEmojiSubsetFrom('🐝')
var encryptedText = CryptoLib.encrypt('this is a text', '🐝')
console.log('encrypt', encryptedText)
console.log('decrypt', CryptoLib.decrypt(encryptedText, '🐝'))


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
