(function (window, Cryptoloji, $, undefined) {
  'use strict'

  console.log(Cryptoloji)
  // var grecaptcha = window.grecaptcha || null
  var captcha_url = 'http://el.s.todo.to.it:3000'
  var captchaId = -1
  Cryptoloji.states.captcha = {
    canEnter: function () {
      // prevent user from entering a broken share without message and key
      // informations. Redirect to encrypt state
      if (!Cryptoloji.current.key) {
        Cryptoloji.stateman.go('encrypt')
        return false
      }
      return true
    },
    enter: function () {
      // fix height
      if (captchaId < 0) {
        captchaId = grecaptcha.render('g-recaptcha', {
          'sitekey': '6Lc0txgTAAAAAPSW9_GalyD8WjVaDHONcbgH0oYe',
          'callback': verifyCaptcha,
          'theme': 'dark'
        })
      } else {
        grecaptcha.reset()
      }
      $('.section_captcha').addClass('section-show')
    },
    leave: function () {
      $('.section_captcha').removeClass('section-show')
    }
  }

  function verifyCaptcha () {
    var captcha_string = {'captcha_string': $('#g-recaptcha-response').val()}
    $.post(captcha_url + '/share', captcha_string)
    .done(function () {
      Cryptoloji.stateman.go('share')
    })
    .fail(function () {
      alert('Retry!')
    })
  }

})(window, window.Cryptoloji, window.jQuery)
