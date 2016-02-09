(function (window, Cryptoloji, undefined) {
  'use strict'

  Cryptoloji.stateman.start({ html5: true, prefix: '!' })
  // go to welcome if no state is active
  if (Cryptoloji.stateman.current.name === '')
    Cryptoloji.stateman.go('welcome')

})(window, window.Cryptoloji); 
