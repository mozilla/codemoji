(function (window, Cryptoloji, undefined) {
  'use strict'

  // Stateman routing
  
  var stateman = Cryptoloji.stateman = new StateMan()

  stateman
    .state('welcome', Cryptoloji.states.welcome)
    .state('encrypt', Cryptoloji.states.encrypt)
    .state('share',   Cryptoloji.states.share)
    .state('onboarding', Cryptoloji.states.onboarding.root)
    // use nested states
      .state('onboarding.step1', Cryptoloji.states.onboarding.step1)
      .state('onboarding.step2', Cryptoloji.states.onboarding.step2)
      .state('onboarding.step3', Cryptoloji.states.onboarding.step3)
      .state('onboarding.step4', Cryptoloji.states.onboarding.step4)
      .state('onboarding.step5', Cryptoloji.states.onboarding.step5)
      .state('onboarding.step6', Cryptoloji.states.onboarding.step6)
      .state('onboarding.step7', Cryptoloji.states.onboarding.step7)
      .state('onboarding.step8', Cryptoloji.states.onboarding.step8)
    .state('loading', Cryptoloji.states.loading)
    .state('more', Cryptoloji.states.more)
    .state('captcha', Cryptoloji.states.captcha)

  $('body').on('click', '[to-state]', function (event) {
    event.preventDefault()
    var goToState = $(event.target).closest('[to-state]').attr('to-state')
    console.info('Change state detected:', goToState)
    if (goToState) Cryptoloji.stateman.go(goToState)
  })

})(window, window.Cryptoloji); 
