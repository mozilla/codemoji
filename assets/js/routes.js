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

})(window, window.Cryptoloji); 
