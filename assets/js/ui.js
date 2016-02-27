(function (window, Cryptoloji, $, twemoji, undefined) {

  /*
    methods prefixed with _ are "private"
    to see exposed method goto bottom :)
  */

  //////////////////////////////////////////////////////////////////////////////
  // private var to store the emoji letter-set used to encyption animation
  var _emojiLetterSet = {'a': '🇦', 'b': '🇧', 'c': '🇨', 'd': '🇩', 'e': '🇪', 'f': '🇫', 'g': '🇬', 'h': '🇭', 'i': '🇮', 'j': '🇯', 'k': '🇰', 'l': '🇱', 'm': '🇲', 'n': '🇳', 'o': '🇴', 'p': '🇵', 'q': '🇶', 'r': '🇷', 's': '🇸', 't': '🇹', 'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽', 'y': '🇾', 'z': '🇿',
                         '0': '0⃣', '1': '1⃣', '2': '2⃣', '3': '3⃣', '4': '4⃣', '5': '5⃣', '6': '6⃣', '7': '7⃣', '8': '8⃣', '9': '9⃣',
                         'symbol': '🔣'}
  //
  // public methods
  //

  function decryptText () {
    console.debug('Chosen text:', Cryptoloji.current.input)
    text = CryptoLib.decrypt(Cryptoloji.current.input, Cryptoloji.current.key)
    console.debug('Decrypted text:', text)
    Cryptoloji.current.output = text
    $('#decryption_output').removeClass('placeholdit').text(text)
    Cryptoloji.stateman.emit('decrypt:show-reply')
  }

  function encryptText () {
    if (Cryptoloji.current.key) {
      var text = $('#encryption_input').val()
      if (text !== '' && !/^\s+$/.test(text)) {
        CryptoLib.generateEmojiSubsetFrom(Cryptoloji.current.key)
        Cryptoloji.current.input = text
        Cryptoloji.stateman.emit('encrypt:hide-output-placeholder')
        console.debug('Chosen text:', text)
        text = CryptoLib.encrypt(Cryptoloji.current.input, Cryptoloji.current.key)
        console.debug('Encrypted text:', text)
        Cryptoloji.current.output = text
        encryptTextAnimation(Cryptoloji.current.input, text)
        // text = toTwemoji(text)
        // $('#encryption_output').html(text)
        // $('.share_message_item').html(text)
        // Cryptoloji.stateman.emit('encrypt:show-share')
      }
    }
  }

  function encryptTextAnimation (text, emojiText) {
    console.log(text, emojiText)

    function _mapToBlueBox (text) {
      text = text.toLowerCase()
      var letterEmoji = _.map(text, function (c) {
        // escape space or newline
        if (c === '\n' || c === ' ') return c

        // remap 'strange' characters
        var pointC = punycode.ucs2.decode(c)[0]
        // a <- à 0ca 224 á 1ca 225 â 2ca 226 ã 3ca 227 ä 4ca 228 å 5ca 229 æ 6ca 230
        if (pointC >= 224 && pointC <= 230) c = 'a'
        // c <- ç 7ca 231
        else if (pointC === 231) c = 'c'
        // d <- ð hda 240 þ vda 254
        else if (pointC === 240 || pointC === 254) c = 'd'
        // e <- è 8ca 232 é 9ca 233 ê bda 234 ë cda 235
        else if (pointC >= 232 && pointC <= 235) c = 'e'
        // i <- ì dda 236 í eda 237 î fda 238 ï gda 239
        else if (pointC >= 236 && pointC <= 239) c = 'i'
        // n <- ñ ida 241
        else if (pointC === 241) c = 'n'
        // o <- ò jda 242 ó kda 243 ô lda 244 õ mda 245 ö nda 246 ø pda 248
        else if (pointC >= 242 && pointC <= 246 || pointC === 248) c = 'o'
        // u <- ù qda 249 ú rda 250 û sda 251 ü tda 252
        else if (pointC >= 249 && pointC <= 252) c = 'u'
        // y <- ý uda 253 ÿ wda 255
        else if (pointC === 253 || pointC === 255) c = 'y'
        
        // custom class attached to containing span element
        var spanClass = null
        // is a symbol
        if (pointC < 48 || (pointC > 57 && pointC < 65) || (pointC > 90 && pointC < 97) || pointC > 122 ) {
          spanClass = 'bb_symbol'
        } else {
          spanClass = 'bb_' + c
        }

        // find the emoji letter corresponding to the current char
        var current = _emojiLetterSet[c]
        // return the image of emoji letter wrapped in span
        var openspan = '<span class="' + spanClass + '">'
        var closespan = '</span>'
        var currentTwemoji = current ? toTwemoji(current) : toTwemoji(_emojiLetterSet['symbol'])
        return openspan + currentTwemoji + closespan
        // return currentTwemoji
      })
      letterEmoji = letterEmoji.join('')
      return letterEmoji
    }

    function _generateEmojiHtml (blueBoxText, emojiText) {
      emojiText = toTwemoji(emojiText)
      $('.share_message_item').html(emojiText)

      emojiText = emojiText.replace(/>/g, '>,').split(',')
      var emojiOut = _.map(blueBoxText, function (bb, idx) {
        var openspan = '<span class="' + $(bb).attr('class') + '">'
        var closespan = '</span>'
        return openspan + emojiText[idx] + closespan
      })
      $('#encryption_output > .emojis_output').html(emojiOut)
    }

    function _blueBoxAnimation (blueElem, emojiElem) {

      blueElem.css('opacity', 0)
      emojiElem.css('opacity', 0)

      var fragtime = (blueElem.length<15) ? .02 : .01
      var totaltime = blueElem.length * fragtime

      blueElem.each(function(i, e){
        TweenLite.to(e, .3, {opacity:1, delay:fragtime*i, ease:Expo.easeInOut})
      })

      var _uniqueClasses = []
      blueElem.each(function(i, e){
        var _classname = $(e).attr('class')
        if(_uniqueClasses.indexOf(_classname) == -1) _uniqueClasses.push(_classname)
      })

      _.each(_uniqueClasses, function(d, i){
        $('#encryption_output > .bluebox_output .'+d).each(function(j, e){
          TweenLite.to(e, .5, {opacity:0, delay:totaltime + i*.25, ease:Expo.easeInOut})
        })
        $('#encryption_output > .emojis_output .'+d).each(function(j, e){
          TweenLite.to(e, .5, {opacity:1, delay:totaltime + i*.25, ease:Expo.easeInOut})
        })
      })

      setTimeout(function () {
        Cryptoloji.stateman.emit('encrypt:show-share')
      }, 2500)
    }

    var blueBoxOut = _mapToBlueBox(text)
    $('#encryption_output > .bluebox_output').html(blueBoxOut)

    var blueBoxElements = $('#encryption_output > .bluebox_output').children()
    var emojiOut = _generateEmojiHtml(blueBoxElements, emojiText)
    var emojiElements = $('#encryption_output > .emojis_output').children()
    _blueBoxAnimation(blueBoxElements, emojiElements)
  }

  function handleHeader () {
    Cryptoloji.stateman.on('header:show', function () {
      $("#header").show()
    })
    Cryptoloji.stateman.on('header:hide', function () {
      $("#header").hide()
    })
  }


  function loadLogicHelpButton () {
    function toggleCoachmark() {
      if($('body').hasClass('coachmarks-open')){
        $('.coachmark').each(function(i){
          var self = this
          TweenLite.to($(self), 2, {
              delay: i * .2 + .3,
              top: 0 - $('.coachmark').innerHeight()
          })
          TweenLite.to($(self).children(), .3, {
              delay: i * .2,
              opacity: 0
          })
        })
      } else {
        var t = $(".section_main_wrapper .header").innerHeight()
        $('.coachmark').each(function(i){
          var self = this
          TweenLite.to($(self), .8, {
              delay: i * .2,
              top: t + $('.coachmark').innerHeight()
          })
          TweenLite.to($(self).children(), .5, {
              delay: i * .2 + .7,
              opacity: 1
          })
        })
      }
      $('body').toggleClass('coachmarks-open')
    }
    if (Cryptoloji.mq.matches) {
      $("#encryption_help_button").hover(function(){
        var self = this
        var t = .2
        $('.help_button_point').each(function(i){
          var it = this
          TweenLite.to($(it), t/2, {delay: 0+i*.1, transform: "translateY(-25px)"})
          TweenLite.to($(it), t, {delay: t+i*.1, transform: "translateY(0px)"})
        })
      },function () {})
      $("#encryption_help_button").on("click", function () {
        var color1 = $('.help_button_point').attr("fill")
        var color2 = $('.help_button_balon').attr("fill")
        $('.help_button_point').attr("fill", color2)
        $('.help_button_balon').attr("fill", color1)
        toggleCoachmark()
      })
    }
  }

  function handleFooter () {
    if (Cryptoloji.mq.matches) {
      Cryptoloji.stateman.on('footer:show', function () {
        $("#footer").show()
        var h = $("#footer").innerHeight()
        $("[footer-padding-bottom-correction]").css("padding-bottom", h)
      })
      Cryptoloji.stateman.on('footer:hide', function () {
        $("#footer").hide()
      })
    }
  }
  function selectKey (key) {
    Cryptoloji.current.key = key
    console.debug('Chosen key', key)
    $(".share_key_emoji-item").html(toTwemoji(key))
    TweenLite.from($('#encryption_selected_key'), 1.25, {scale:1.25, ease:Expo.easeOut})
  }

  function showDecryptableText (text) {
    $('#decryption_input').html(toTwemoji(text))
                          .attr('text', text)
  }




  function handleSvgLoading () {
    function loadSvg (element, path) {
      $.get(path)
       .done(function (result) {
          // console.log(result)
          $(element).append(result.documentElement)
          Cryptoloji.stateman.emit('svg:loaded', path)
        })
       .fail(function () {
          console.error(this)
        })
    }
    $("div[data-svg*='assets/svg']").each(function () {
      var self = this
      var path = $(self).attr('data-svg')
      // console.log(self, path)
      loadSvg(self, path)
    })

  }

  function toTwemoji (text) {
    return twemoji.parse(text, {
      folder: 'svg',
      ext:    '.svg'
    })
  }

  function handleOrientationChanges () {
    function _writeOrientationAttr () {
      // if orientation is 0 or 180 we are in portrait mode
      if (window.orientation == 0 || window.orientation == 180) {
        console.info('changed orientation to portrait')
        $('html').attr('orientation', 'portrait')
      } else {
        console.info('changed orientation to landscape')
        $('html').attr('orientation', 'landscape')
      }
    }

    // window.orientation is undefined on desktop
    if (!_.isUndefined(window.orientation)) {
      _writeOrientationAttr()
      // support both onorientationchange and resize event
      var supportsOrientationChange = 'onorientationchange' in window
      var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize'
      $(window).on(orientationEvent, function (event) {
        _writeOrientationAttr()
      })
    }
  }

  function fixHeight () {
    $('body').css('height', $(window).innerHeight())
    var supportsOrientationChange = 'onorientationchange' in window
    var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize'
    $(window).on(orientationEvent, function (event) {
      // recalculate height on orientation change
      $('body').css('height', $(window).innerHeight())
    })
  }

  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.UI = {
    decryptText: decryptText,
    encryptText: encryptText,
    fixHeight: fixHeight,
    handleFooter: handleFooter,
    handleHeader: handleHeader,
    handleOrientationChanges: handleOrientationChanges,
    handleOrientationChanges: handleOrientationChanges,
    handleSvgLoading: handleSvgLoading,
    loadLogicHelpButton: loadLogicHelpButton,
    selectKey: selectKey,
    showDecryptableText: showDecryptableText,
    toTwemoji: toTwemoji,
  }
  
})(window, window.Cryptoloji, window.jQuery, window.twemoji);
