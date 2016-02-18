(function (window, Cryptoloji, undefined) {
  'use strict'

  // Stateman routing
  
  var stateman = Cryptoloji.stateman = new StateMan()

  stateman
    .state('welcome', Cryptoloji.states.welcome)
    .state('encrypt', Cryptoloji.states.encrypt)
    .state('decrypt/:id', Cryptoloji.states.decrypt)
    .state('share',   Cryptoloji.states.share)
    .state('onboarding', Cryptoloji.states.onboarding)
    .state('loading', Cryptoloji.states.loading)
    .state('more', Cryptoloji.states.more)

  $('body').on('click', '[to-state]', function (event) {
    event.preventDefault()
    var goToState = $(event.target).closest('[to-state]').attr('to-state')
    console.info('Change state detected:', goToState)
    if (goToState) Cryptoloji.stateman.go(goToState)
  })

})(window, window.Cryptoloji); 
