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

  //Onboarding animation timeline
  var timeline = null

  function decryptText () {
    var text = $('#decryption_input').attr('text')
    Cryptoloji.current.input = text

    console.debug('Chosen text:', Cryptoloji.current.input)
    text = CryptoLib.decrypt(Cryptoloji.current.input, Cryptoloji.current.key)
    console.debug('Decrypted text:', text)
    Cryptoloji.current.output = text
    $('#decryption_output').removeClass('placeholdit').text(text)
    Cryptoloji.stateman.emit('decrypt:show-reply', Cryptoloji.current.key)
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

  var _animationTimeout = null
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
        var openspan = '<span unselectable class="' + spanClass + '">'
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
      // temporarly removed
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

      if (_animationTimeout) {
        clearTimeout(_animationTimeout)
      }
      _animationTimeout = setTimeout(function () {
        Cryptoloji.stateman.emit('encrypt:show-share')
      }, _uniqueClasses.length * 300)
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


  function loadLogicHelpButton (section) {

    function toggleCoachmark() {
      if($('body').hasClass('coachmarks-open')){
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
      } else {
        var t = $("."+section+" .header").innerHeight()
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
      $('body').toggleClass('coachmarks-open')
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
      console.log(a, b)
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
    console.debug('Chosen key', key)
    // temporarly removed
    $(".share_key_emoji-item").html(toTwemoji(key))
    $(".share_key_emoji-item").attr('value', key)
    TweenLite.from($('#encryption_selected_key'), 1.25, {scale:1.25, ease:Expo.easeOut})
    TweenLite.from($('#decryption_selected_key'), 1.25, {scale:1.25, ease:Expo.easeOut})
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
      TweenLite.to($('.'+state+' .main_keyslider'), 0.5, {delay: 0, width: "35%"})
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
    }
  }

  var tooltipPosition = {}
      tooltipPosition.top = 0
      tooltipPosition.left = 0




  function paginationLogic (slide) {
     var num = $('[slide-num='+slide+'] [pagination-step]').attr('pagination-step')
     TweenLite.set($('.pagination_emoji>g'), {opacity: "0"})
     TweenLite.set($('[slide-num='+slide+'] .pagination_emoji_'+num), {opacity: "1"})
  }

  //Onboarding cryptoloji animation
  function animate_onboarding(elements) {
    //Prevent istanciating multiple timelines
    if (!timeline) {
      timeline = new TimelineLite({onComplete: function() {
        //loop the animation
        this.restart()
      }});
    }

    //Clear the timeline in case we are creating the animation for a different slide
    timeline.clear()

    //Duration of a single letter transition
    var animation_duration = 0.2
    var animation_delay = 0.8
    var y_transform = 20
    
    //First svg group containing encrypted letter
    var first_group = $($(elements[0]))
    //Second svg group containing encrypted letter
    var second_group = $($(elements[1]))
    //Third svg group containing encrypted letter
    var third_group = $($(elements[2]))
    //Fourth svg group containing encrypted letter (the same as the third one to get a perfect loop)
    var fourth_group = $($(elements[3]))

    //Set initial state
    timeline.set(first_group, {y: -60, opacity: 0.0})
    //Second encryption letters
    .set(second_group, {y: -60, opacity: 0.0})
    //Third encryption letters
    .set(third_group, {y: 0, opacity: 1.0})
    //Third encryption letters bis
    .set(fourth_group, {y: -60, opacity: 0.0})


    //First encrypted word animation
    .to(third_group[4], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[4], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[3], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[3], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[2], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[2], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[1], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[1], animation_duration, {y: 0, opacity: 1.0})
    .to(third_group[0], animation_duration, {y: y_transform, opacity: 0.0})
    .to(first_group[0], animation_duration, {y: 0, opacity: 1.0})
    
    // //Second encrypted word animation
    .to(first_group[4], animation_duration, {delay: animation_delay, y: y_transform, opacity: 0.0})
    .to(second_group[4], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[3], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[3], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[2], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[2], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[1], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[1], animation_duration, {y: 0, opacity: 1.0})
    .to(first_group[0], animation_duration, {y: y_transform, opacity: 0.0})
    .to(second_group[0], animation_duration, {y: 0, opacity: 1.0})
    
    // //Third encrypted word animation
    .to(second_group[4], animation_duration, {delay: animation_delay, y: y_transform, opacity: 0.0})
    .to(fourth_group[4], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[3], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[3], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[2], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[2], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[1], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[1], animation_duration, {y: 0, opacity: 1.0})
    .to(second_group[0], animation_duration, {y: y_transform, opacity: 0.0})
    .to(fourth_group[0], animation_duration, {y: 0, opacity: 1.0})
    
    //Set a delay before looping
    .to(fourth_group, 0.0, {delay: animation_delay, y: y_transform, opacity: 0.0})

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
    loadLogicHelpButton: loadLogicHelpButton,
    selectKey: selectKey,
    showDecryptableText: showDecryptableText,
    toTwemoji: toTwemoji,
    encryptionEnteringTransition: encryptionEnteringTransition,
    svg_loaded: svg_loaded,
    animate_onboarding: animate_onboarding,
    paginationLogic: paginationLogic,
    tooltipPosition: tooltipPosition
  }
  
})(window, window.Cryptoloji, window.jQuery, window.twemoji);
