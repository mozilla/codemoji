(function (window, Cryptoloji, $, undefined) {
  'use strict'

  Cryptoloji.states.captcha = {
    canEnter: function () {
      // prevent user from entering a broken captcha without message and key
      // informations. Redirect to encrypt state
      if (!Cryptoloji.current.key) {
        Cryptoloji.stateman.go('encrypt')
        return false
      }
      return true
    },
    enter: function () {
      renderCaptcha()

      $('.section_captcha').addClass('section-show')
    },
    leave: function () {
      $('.section_captcha').removeClass('section-show')
    }
  }

  function renderCaptcha () {
    // if a captcha has already been initialized
    var captcha = false
    
    // init captcha if not already initialized or reset
    function _initOrResetCaptcha () {
      if (captcha) {
        window.grecaptcha.reset()
      } else {
        window.grecaptcha.render('g-recaptcha', {
          'sitekey': Cryptoloji.settings.captcha.sitekey,
          'callback': verifyCaptcha,
          'theme': 'light'
        })
        captcha = true
      }
    }
    // check if captcha library has loaded completely
    function _verifyLibraryLoaded () {
      if (window.grecaptcha) {
        // clean interval ( if any )
        clearInterval(grecaptchaInterval)
        _initOrResetCaptcha()
        // hide loading feedback
        $('#captcha_loading').hide()
      } else {
        console.warn('grecaptcha undefined')
      }
    }
    _verifyLibraryLoaded()
    var grecaptchaInterval = setInterval(_verifyLibraryLoaded, 500)
  }

  function verifyCaptcha () {
    var captcha_string = {'captcha_string': $('#g-recaptcha-response').val()}
    $.post(Cryptoloji.settings.captcha.url + '/share', captcha_string)
      .done(function () {
        Cryptoloji.stateman.go('share')
      })
      .fail(function () {
        alert('Retry!')
      })
  }

})(window, window.Cryptoloji, window.jQuery)
