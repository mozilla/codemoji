
var CryptoLib = require('./libs/crypto-lib.js')

// console.log(CryptoLib.encrypt('Questo è un messaggio', '⚓'))
// console.log(CryptoLib.decrypt(CryptoLib.encrypt('Questo è un messaggio', '⚓'), '⚓'))


var text = 'Questo è un messaggio'
var key = '⚓'
// var key = '⛄'

console.log(require('punycode').ucs2.decode(key))

CryptoLib.generateEmojiSubsetFrom(key)
var encrypted = CryptoLib.encrypt(text, key)

console.log(encrypted)

CryptoLib.generateEmojiSubsetFrom(key)
var decrypted = CryptoLib.decrypt(encrypted, key)
console.log(decrypted)
