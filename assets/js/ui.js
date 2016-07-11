;(function (window, Cryptoloji, $, twemoji, undefined) {

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
  //Array containing the path of the loaded svg. If the path is present inside the array, the corresponding svg is loaded.
  var svg_loaded = []
  $('[data-svg]').each(function(i, e){
    var svg = $(e).find('svg')
    var attr = $(e).attr('data-svg')
    if(svg.length>0) svg_loaded.push(attr)
  })

  if(window.gHandleSvgLoading) window.gHandleSvgLoading(svg_loaded)

  function decryptText () {
    var text = $('#decryption_input').attr('text')
    Cryptoloji.current.input = text

    $('#decryption_output').removeClass('placeholdit')
    // .text(text)
    text = CryptoLib.decrypt(Cryptoloji.current.input, Cryptoloji.current.key)
    Cryptoloji.current.output = text
    decryptTextAnimation(text, Cryptoloji.current.input)
    // Cryptoloji.stateman.emit('decrypt:show-reply', Cryptoloji.current.key)
  }

  function encryptText () {
    if (Cryptoloji.current.key) {
      var text = $('#encryption_input').val()
      if (text !== '' && !/^\s+$/.test(text)) {
        CryptoLib.generateEmojiSubsetFrom(Cryptoloji.current.key)
        Cryptoloji.current.input = text
        Cryptoloji.stateman.emit('encrypt:hide-output-placeholder')
        text = CryptoLib.encrypt(Cryptoloji.current.input, Cryptoloji.current.key)
        Cryptoloji.current.output = text
        encryptTextAnimation(Cryptoloji.current.input, text)
        // text = toTwemoji(text)
        // $('#encryption_output').html(text)
        // $('.share_message_item').html(text)
        // Cryptoloji.stateman.emit('encrypt:show-share')
      }
    }
  }

  function decryptTextAnimation (text, emojiText) {
    var emojiContainer = $('#decryption_output > .emojis_output')
    var letterContainer = $('#decryption_output > .letters_output')

    var blueBoxOut = _generateBlueBox(text)
    var blueBoxElements = $(blueBoxOut.replace(/> /g, '>'))
    
    var emojiOut = _generateEmojFromBlueBox(blueBoxElements, emojiText)
    emojiContainer.html(emojiOut)
    var emojiElements = emojiContainer.children()
    
    var letterOut = _generateLetterFromBlueBox(emojiElements, text)
    letterContainer.html(letterOut)
    var letterElements = letterContainer.children()

    _letterAnimation(emojiElements, letterElements, emojiContainer, letterContainer, .2, function() {
      Cryptoloji.stateman.emit('decrypt:show-reply', Cryptoloji.current.key)
    })

    Cryptoloji.stateman.on('decrypt:right-key', function() {
      letterContainer.text(text)
    })
  }

  function encryptTextAnimation (text, emojiText) {
    var blueBoxContainer = $('#encryption_output > .bluebox_output')
    var emojiContainer = $('#encryption_output > .emojis_output')

    var blueBoxOut = _generateBlueBox(text)
    blueBoxContainer.html(blueBoxOut)
    var blueBoxElements = blueBoxContainer.children()

    var emojiOut = _generateEmojFromBlueBox(blueBoxElements, emojiText)
    emojiContainer.html(emojiOut)
    var emojiElements = emojiContainer.children()

    _letterAnimation(blueBoxElements, emojiElements, blueBoxContainer, emojiContainer, .25, function () {
      Cryptoloji.stateman.emit('encrypt:show-share')
    })
  }

  function _generateBlueBox (text) {
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
      var openspan = '<span unselectable class="' + spanClass + '">'
      var closespan = '</span>'
      var currentTwemoji = current ? toTwemoji(current) : toTwemoji(_emojiLetterSet['symbol'])
      return openspan + currentTwemoji + closespan
      // return currentTwemoji
    })
    letterEmoji = letterEmoji.join('')
    return letterEmoji
  }

  function _getEmojiTextElements (twemojifiedText) {
    // get list of independent elements from twemojified string

    var emojiElems = []

    // Use jQuery.parseHTML to detect independent HTML elements
    // in the twemojified text
    $.parseHTML(twemojifiedText).forEach(function (elem) {
      // if element is a tag just put its string representation 
      // into array of elements
      if (elem.nodeType === Node.ELEMENT_NODE) {
        emojiElems.push(elem.outerHTML)
      } else {
        // In this case we deal with unprocessed characters.
        // Add every character to array of elements
        Array.prototype.push.apply(emojiElems, elem.nodeValue.split(''))
      }
    })

    return emojiElems
  }

  function _generateEmojFromBlueBox (blueBoxText, emojiText) {
    emojiText = toTwemoji(emojiText)
    // load emoji text to share
    $('.share_message_item').html(emojiText)
    var emojiElems = _getEmojiTextElements(emojiText)

    var emojiOut = _.map(blueBoxText, function (bb, idx) {
      var openspan = '<span class="' + $(bb).attr('class') + '">'
      var closespan = '</span>'
      return openspan + emojiElems[idx] + closespan
    })
    return emojiOut
  }

  function _generateLetterFromBlueBox (blueBoxText, text) {
    var letterOut = text.replace(/\s/g, '').split('')
    var idx = 0
    letterOut = _.map(letterOut, function (letter) {
      var openspan = '<span class="' + $(blueBoxText[idx]).attr('class') + '">'
      var closespan = '</span>'
      return $(openspan + letter + closespan).width($(blueBoxText[idx ++]).innerWidth())
    })
    return letterOut
  }

  var _animationTimeout = null
  function _letterAnimation (blueElem, letterElem, blueContainer, letterContainer, elemDelay, callback) {
    blueElem.css('opacity', 0)
    letterElem.css('opacity', 0)

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
      blueContainer.find('.'+d).each(function(j, e){
        TweenLite.to(e, .5, {opacity:0, delay:totaltime + i*elemDelay, ease:Expo.easeInOut})
      })
      letterContainer.find('.'+d).each(function(j, e){
        TweenLite.to(e, .5, {opacity:1, delay:totaltime + i*elemDelay, ease:Expo.easeInOut})
      })
    })

    if (_animationTimeout) {
      clearTimeout(_animationTimeout)
    }
    var timeout = _uniqueClasses.length * (elemDelay * 1000 + 50)
    _animationTimeout = setTimeout(function () {
      callback()
    }, timeout)
  }


  function handleHeader () {
    Cryptoloji.stateman.on('header:show', function () {
      $("#header").show()
    })
    Cryptoloji.stateman.on('header:hide', function () {
      $("#header").hide()
    })
  }


  function loadLogicHelpButton (section) {

    function _openCoachmarks () {
      var t = $("."+section+" .header").innerHeight() + 58
        $('.'+section+' .coachmark').each(function(i){
          var self = this
          TweenLite.to($(self), 1, {
              delay: i * .2,
              y: t,
              ease:Bounce.easeInOut
          })
          TweenLite.to($(self).children(), .5, {
              delay: i * .2 + .7,
              opacity: 1
          })
        })
    }

    function _closeCoachmarks () {
      $('.'+section+' .coachmark').each(function(i){
          var self = this
          TweenLite.to($(self), .8, {
              delay: i * .15 + .2,
              y: 0 - $('.'+section+' .coachmark').innerHeight(),
              ease:Expo.easeInOut
          })
          TweenLite.to($(self).children(), .3, {
              delay: i * .2,
              opacity: 0
          })
        })
    }

    function toggleCoachmark() {
      if($('body').hasClass('coachmarks-open')){
        _closeCoachmarks()
        $('.section_main_wrapper').off()
      } else {
        _openCoachmarks()
        setTimeout(function() {
          handleCloseCoachmarks()
        }, 500)
      }
      $('body').toggleClass('coachmarks-open')
    }

    function handleCloseCoachmarks () {
      $('.section_main_wrapper').on("click", function () {
        toggleHelpButtonColor()
        toggleCoachmark()
        toggleX()
      })
    }
    
    function toggleHelpButtonColor () {
      var color1 = $('.'+section+' .help_button_point').attr("fill")
      var color2 = $('.'+section+' .help_button_balon').attr("fill")
      $('.'+section+' .help_button_point').attr("fill", color2)
      $('.'+section+' .help_button_x').attr("fill", color2)
      $('.'+section+' .help_button_balon').attr("fill", color1)
    }

    function bounceDots() {
      var elem = section + "_help_button"
      $('#'+elem).hover(function(){
        var self = this
        var t = .2
        $('.'+elem+' .help_button_point').each(function(i){
          var it = this
          TweenLite.to($(it), t/2, {delay: 0+i*.1, transform: "translateY(-25px)"})
          TweenLite.to($(it), t, {delay: t+i*.1, transform: "translateY(0px)"})
        })
      },function () {})
    } 

    function toggleX () {
      var elem = section + "_help_button"
      var a = $('.' + elem +  ' .help_button_x').css('opacity')
      var b = $('.' + elem +  ' .help_button_point').css('opacity')
      TweenLite.to($('.' + elem +  ' .help_button_x'), .5, {opacity: b})
      TweenLite.to($('.' + elem +  ' .help_button_point'), .5, {opacity: a})
    }
    
    if (Cryptoloji.mq.matches) {
      bounceDots()
      TweenLite.set($('.'+section+' .coachmark'), { y: 0 - $('.'+section+' .coachmark').innerHeight()})
      $("#" + section + "_help_button").on("click", function(){
        toggleHelpButtonColor()
        toggleCoachmark()
        toggleX()
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
    // load emoji key to share
    $(".share_key_emoji-item").html(toTwemoji(key))
    $(".share_key_emoji-item").attr('value', key)

    TweenLite.set($('#encryption_selected_key'), {scale:1.4})
    TweenLite.set($('#decryption_selected_key'), {scale:1.4})
    TweenLite.to($('#encryption_selected_key'), 1.25, {scale:1, ease:Expo.easeInOut})
    TweenLite.to($('#decryption_selected_key'), 1.25, {scale:1, ease:Expo.easeInOut})

    setTimeout(function(){
      TweenLite.set($('.main_share #share_wrapper_js'), {scale:1.3, overwrite:true})
      TweenLite.to($('.main_share #share_wrapper_js'), 1, {scale:1, ease:Quad.easeOut, overwrite:true})
    }, 750)
    
  }

  function showDecryptableText (text) {
    $('#decryption_input').html(toTwemoji(text))
                          .attr('text', text)
  }

  

  function toTwemoji (text) {
      return twemoji.parse(text, {
        folder: 'svg',
        ext:    '.svg'
      })
  }

  function handleOrientationChanges () {
    function _getOrientation () {
      // if orientation is 0 or 180 we are in portrait mode
      if (_.isUndefined(window.orientation)) {
        // window.orientation is undefined on desktop so check on media query
        if (!Cryptoloji.mq.matches) {
          return 'portrait'
        } else {
          return 'landscape'
        }
      }
      else if (window.orientation == 0 || window.orientation == 180) {
        return 'portrait'
      } else {
        return 'landscape'
      }
    }
    function _writeOrientationAttr (orientation) {
      $('html').attr('orientation', orientation)
    }

    function _needReload (orientation) {
      return orientation === 'landscape' && Cryptoloji.mq.matches
    }

    // get the current orientation
    var orientation = _getOrientation()
    _writeOrientationAttr(orientation)

    var reloadCheck = _needReload(orientation)
    // support both onorientationchange and resize event
    var supportsOrientationChange = 'onorientationchange' in window
    var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize'
    // hard refresh when orientation changes
    $(window).on(orientationEvent, function (event) {
      var temp = _getOrientation()
      if (temp !== orientation) {
        orientation = temp
        _writeOrientationAttr(orientation)
        Cryptoloji.stateman.emit('orientationchange')
        // only in desktop-like view refresh objects init
        if (reloadCheck || _needReload(orientation)) {
          $('#mainLoader').css({opacity: 1, display: 'flex'})
          // add timeout to fix reload issue on firefox
          setTimeout(function() {
            window.location.reload()
          }, 10);
        }
      }
    })
  }

  function fixHeight () {
    $('body').css('height', $(window).innerHeight())
    resizeOnboardingSvg()
    var supportsOrientationChange = 'onorientationchange' in window
    var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize'
    $(window).on(orientationEvent, function (event) {
      // recalculate height on orientation change
      $('body').css('height', $(window).innerHeight())

      resizeOnboardingSvg()
    })
  }

  function resizeOnboardingSvg () {
    var h = $(window).innerHeight() - $('#header').height() - Cryptoloji.utils.remToPx(8)
    if(h>0) $('.svg_wrapper_onboarding > svg').css('height', h)
  }

  function encryptionEnteringTransition (state) {
    if(Cryptoloji.mq.matches){
      TweenLite.set($('.'+state+' .main_keyslider'), {delay: 0, width: "0%"})
      TweenLite.set($('.'+state+' .main_keyslider .main_key_panel_emoji_wrapper'), {opacity: "0"})
      TweenLite.set($('.'+state+' .main_keyslider .main_keyslider_bottom_label'), {opacity: "0"})
      TweenLite.set($('.'+state+' .main_content_bottom_input.placeholdit'), {opacity: "0"})
      TweenLite.set($('.'+state+' .main_content_top_input'), {opacity: "0"})
      // TweenLite.set($('.'+state+' .encryption_help_button > svg'), {opacity: 0, scale:1.3})
      TweenLite.set($('.'+state+'_help_button'), {opacity: 0})


      // keyslider width
      TweenLite.to($('.'+state+' .main_keyslider'), 0.5, {delay: 0, width: "35%", onComplete: function () {
        // needed to reset element width for viewport changes
        $('.'+state+' .main_keyslider').css('width', '')
      }})
      // TweenLite.to($('.'+state+' .encryption_help_button > svg'), 1.25, {delay: 2.5, opacity: 1, scale: 1, ease:Elastic.easeInOut})
      TweenLite.to($('.'+state+'_help_button'), 1.25, {delay: 2.5, opacity: 1, ease:Elastic.easeInOut})
      // emoji in keyslider
      // then load nano scroller
      TweenLite.to($('.'+state+' .main_keyslider .main_key_panel_emoji_wrapper'), .5, {delay: 1, opacity: "1", onComplete: function(){
        $(".nano").nanoScroller()
      }})
      // lable keyslider
      TweenLite.to($('.'+state+' .main_keyslider .main_keyslider_bottom_label'), .5, {delay: 1.5, opacity: ".5"})
      //placeholder left
      if (state === 'decryption') {
        TweenLite.to($('.'+state+' .main_content_top_input'), .5, {delay: 1.5, opacity: 1})
      } else {
        TweenLite.to($('.'+state+' .main_content_top_input'), .5, {delay: 1.5, onComplete: function() {
          $('.'+state+' .main_content_top_input').css('opacity', '1')
          Cryptoloji.stateman.emit('encrypt:animate-input-placeholder')
          setTimeout(function () {
            $('#encryption_input').focus()
          }, 1500)
        }})
      }
      // placeholder rigtht
      TweenLite.to($('.'+state+' .main_content_bottom_input.placeholdit'), .5, {delay: 2.5, opacity: 1})
      TweenLite.set($('.coachmark'), {delay: 2.5, display: "block"})

    }
  }

  var tooltipPosition = {}
      tooltipPosition.top = 0
      tooltipPosition.left = 0

  function slideLeft (el, duration) {
    function removeSlide () {
      el.removeClass("section-show")
    }
    TweenLite.set(el, {x: "0%"})
    TweenLite.to(el, duration, {x: "-100%", onComplete: removeSlide})
  }

  function slideLeftNext (el, duration) {
    function dispaySlide () {
      el.addClass("section-show")
    }
    TweenLite.to(el, 0, {x: "100%", onComplete: dispaySlide})
    TweenLite.to(el, duration, {x: "0%"})
  }

  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.UI = {
    decryptText: decryptText,
    encryptText: encryptText,
    fixHeight: fixHeight,
    handleFooter: handleFooter,
    handleHeader: handleHeader,
    handleOrientationChanges: handleOrientationChanges,
    loadLogicHelpButton: loadLogicHelpButton,
    selectKey: selectKey,
    showDecryptableText: showDecryptableText,
    toTwemoji: toTwemoji,
    encryptionEnteringTransition: encryptionEnteringTransition,
    svg_loaded: svg_loaded,
    tooltipPosition: tooltipPosition,
    slideLeft: slideLeft,
    slideLeftNext: slideLeftNext
  }
  
})(window, window.Cryptoloji, window.jQuery, window.twemoji);
