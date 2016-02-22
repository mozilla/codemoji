(function (window, Cryptoloji, undefined) {
  'use strict'
  
  console.log(Cryptoloji)
  var captcha_url = "el.s.todo.to.it:3000"
  Cryptoloji.states.captcha = {
    enter: function () {
      // fix height
      $(".section_captcha").addClass("section-show")
      $('#captcha_form').on('submit', function(event) {
        event.preventDefault()
        var captcha_string = { 'captcha_string' : $('#g-recaptcha-response').val() }

        $.post(captcha_url + '/share', captcha_string)
        .done(function() {
          Cryptoloji.stateman.go('share')
        })
        .fail(function() {
          alert('Retry!')
        })
      })
    },
    leave: function () {
      $(".section_captcha").removeClass("section-show")
      $('#captcha_form').off('submit')
      grecaptcha.reset();
    }
  }



})(window, window.Cryptoloji); 
