(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.stateman.start({ html5: true, prefix: '!' })
  // go to welcome if no state is active
  if (Cryptoloji.stateman.current.name === '')
    Cryptoloji.stateman.go('welcome')

  $('[to-state]').on('click', function (e) {
    e.preventDefault()
    var goToState = $(event.target).attr('to-state')
    console.info('Change state detected:', goToState)
    if (goToState) Cryptoloji.stateman.go(goToState)
  })

})(window, window.Cryptoloji); 
