(function (window, Cryptoloji, undefined) {
  'use strict'
  
  console.log(Cryptoloji)

  Cryptoloji.states.welcome = {
    enter: function () {
      console.log('welcome')
    },
    leave: function () {}
  }

})(window, window.Cryptoloji); 
