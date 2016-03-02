(function (window, Cryptoloji, $, undefined) {
  'use strict'

  // if a captcha has already been initialized
  var _captcha = false

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

      // $('.encryption').addClass('section-show')
      $('.section_captcha').addClass('section-show')
      TweenLite.set($('.section_captcha'), {y: window.innerHeight})
      TweenLite.to($('.section_captcha'), 1, {y: 0, onComplete: function(){
        $('.encryption').removeClass('section-show')
      }})

    },
    leave: function () {

      TweenLite.to($('.section_captcha'), 1, {y: -window.innerHeight, onComplete: function(){
        $('.section_captcha').removeClass('section-show')
      }})
    }
  }

  function renderCaptcha () {
    
    // init captcha if not already initialized or reset
    function _initOrResetCaptcha () {
      if (_captcha) {
        window.grecaptcha.reset()
      } else {
        _captcha = true
        window.grecaptcha.render('g-recaptcha', {
          'sitekey': Cryptoloji.settings.captcha.sitekey,
          'callback': verifyCaptcha,
          'theme': 'light'
        })
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
        setTimeout(function () {
          Cryptoloji.stateman.go('share')
        }, 800)
      })
      .fail(function () {
        window.alert('Retry!')
      })
  }

})(window, window.Cryptoloji, window.jQuery)
