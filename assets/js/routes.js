(function (window, Cryptoloji, undefined) {
  'use strict'

  // Stateman routing
  
  var stateman = Cryptoloji.stateman = new StateMan()

  stateman
    .state('welcome', Cryptoloji.states.welcome)
    .state('home',    Cryptoloji.states.home)
    .state('encrypt', Cryptoloji.states.encrypt)
    .state('decrypt', Cryptoloji.states.decrypt)
    .state('share',   Cryptoloji.states.share)
    .state('onboarding', Cryptoloji.states.onboarding.root)
    .state('onboarding.watermelon', Cryptoloji.states.onboarding.watermelon)
    .state('onboarding.apple', Cryptoloji.states.onboarding.apple)

  $('[to-state]').on('click', function (event) {
    event.preventDefault()
    var goToState = $(event.target).closest('[to-state]').attr('to-state')
    console.info('Change state detected:', goToState)
    if (goToState) Cryptoloji.stateman.go(goToState)
  })

})(window, window.Cryptoloji); 
