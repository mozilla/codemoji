(function (window, Cryptoloji, $, undefined) {

  /*
    methods prefixed with _ are "private"
    to see exposed method goto bottom :)
  */

  function _createKeyElement (key) {
    return '<p class="key" key="' + key + '">' + Cryptoloji.twemoji(key) + '</p>'
  }

  //////////////////////////////////////////////////////////////////////////////
  //
  // public methods
  //

  function decryptText () {
    var text = $('#decryption_input').attr('text')
    console.debug('Chosen text:', text)
    text = Cryptoloji.decrypt(text)
    console.debug('Decrypted text:', text)
    $('#decryption_output').removeClass('placeholdit').text(text)
    Cryptoloji.stateman.emit('decrypt:show-reply')
  }
  
  function encryptText() {
    if (Cryptoloji.Encrypter.key) {
      var text = $('#encryption_input').val()
      if (text !== '' && !/^\s+$/.test(text)) {
        Cryptoloji.stateman.emit('encrypt:hide-output-placeholder')
        console.debug('Chosen text:', text)
        text = Cryptoloji.encrypt(text)
        console.debug('Encrypted text:', text)
        text = Cryptoloji.twemoji(text)
        $('#encryption_output').html(text)
        $('.share_message_item').html(text)
        Cryptoloji.stateman.emit('encrypt:show-share')
      }
    }
  }

  function fillKeymodal (emojiList) {
    var text = ''
    _.times(20, function () {
      _.each(emojiList, function(elem) {
        text += _createKeyElement(elem)
      })
    })
    $(".main_key_modal_emoji_container").append(text)
  }

  function handleHeader () {
    Cryptoloji.stateman.on('header:show', function () {
      $("#header").show()
    })
    Cryptoloji.stateman.on('header:hide', function () {
      $("#header").hide()
    })
  }

  function selectKey (key) {
    Cryptoloji.use_key(key)
    console.debug('Chosen key', key)
    $(".share_key_emoji-item").html(Cryptoloji.twemoji(key))
  }

  function showDecryptableText (text) {
    $('#decryption_input').html(Cryptoloji.twemoji(text))
                          .attr('text', text)
  }




  function buildSlider(content_selector){

    Cryptoloji.UI.onBoardingSlider = true

    var mapval = rebound.MathUtil.mapValueInRange;
    var springSystem = new rebound.SpringSystem();
    var spring = springSystem.createSpring(50, 10);

    var el = $(content_selector);
    var scenes = el.children();
    var num = scenes.length;
    var w = $(document).width();
    var svgw = w//400;
    var dots = $('.onboarding_pages').children()

    var mousedown=false;
    var currentX = 0;
    var lastX = 0;
    var currentPos = 0;
    var currentShift = 0;
    var step = 0
    var consolidated_step = 0
    var dir

    TweenLite.from('#onboarding_svg #text1', 1, {delay:1, opacity:0})
    TweenLite.set('#onboarding_svg #text2', {x:svgw})
    TweenLite.set('#onboarding_svg #text3', {x:svgw*2})

    var letter_icons = ['#single_c_1', '#single_i_1', '#single_i_1', '#single_i_1', '#single_o_1', '#single_o_2']
    var icon_icons = ['#icon_c_1', '#icon_i_1', '#icon_i_2', '#icon_i_3', '#icon_o_1', '#icon_o_2']
    var bigletters = ['#lttr_c', '#lttr_i', '#lttr_o']

    var arr = [].concat(icon_icons).concat(bigletters)

    arr.forEach(function(e){
      TweenLite.set('#onboarding_svg '+e, {opacity:0})
    })

    TweenLite.set('#onboarding_svg #watermelon', {x:0})
    TweenLite.set('#onboarding_svg #pole_1_', {x:svgw})
    TweenLite.set('#onboarding_svg #orange', {x:svgw*2})

    el.on('touchmousedown', function(e) {
      currentX = e.pageX;
      mousedown=true;
    });

    $('body').on('touchmousemove', function(e){
      if (!mousedown) return;

      var fakt = 1;
      if(step==0 && e.pageX > currentX){
        fakt = .29;
      }
      if(step==num && e.pageX < currentX){
        fakt = .29;
      }

      if(lastX < currentX){
        dir=1
      }else{
        dir=-1
      }

      currentShift = (e.pageX - currentX) * fakt;

      TweenLite.set(el[0], {x:currentPos+currentShift})
      
      var shiftNorm = mapval(currentPos+currentShift, 0, w*num, 0, 1)

      var svgval2 = mapval(shiftNorm, 0, 1, 0, (svgw*num));
      handlePosition(svgval2);
      
      spring.setCurrentValue(shiftNorm*-1);
      lastX = e.pageX;
    })


    $('body').on('touchmouseup', function(e){
      if (!mousedown) return;
      mousedown=false;
      currentPos += currentShift;

      previous = step

      var diff = Math.abs(e.pageX - currentX)
      if(lastX < currentX){
        dir=1
        if(diff>5) step++;
        if(step > num-1) step=num-1;
      }else{
        dir=-1
        if(diff>5) step--;
        if(step < 0) step=0;
      }

      dots.removeClass('current')

      var currentScene = $(scenes[step])
      $(dots[step]).addClass('current')

      if(step == 1){
        TweenLite.to('#onboarding_svg #lttr', 1, {delay:1, opacity:1})
      }

      if(step == num-1){
        $('.onboarding_pages').addClass('hide')
        destroy();
      }

      spring.setEndValue(step/num);
    })


    function destroy(){
      el.off('touchmousedown')
      $('body').on('touchmousemove')
      $('body').off('touchmouseup')
      
      setTimeout(function(){
        Cryptoloji.stateman.go('loading')
        spring.destroy()
      }, 1000)
    }

    spring.addListener({
      onSpringUpdate: function(spring) {
        var oval = spring.getCurrentValue();
        val = mapval(oval, 0, 1, 0, (w*num*-1));
        var svgval = mapval(oval, 0, 1, 0, (svgw*num*-1));
        if(!mousedown) {
          TweenLite.set(el[0], {x:val})

          if(val % w === 0) consolidated_step=step

          handlePosition(svgval);

          currentPos = val
        }
      }
    })

    var debouncer;
    var elmprev = []

    function handlePosition(x){
      console.log(step, consolidated_step, dir)

      clearInterval(debouncer)
      debouncer = setInterval(function(){

        if(consolidated_step <= 1){
          showHidelettersOne(true)
          showHidelettersTwo(true)
          showHidelettersThree(true)
        }
        if(consolidated_step == 2){
            showHidelettersTwo(true)
            showHidelettersThree(true)
            showHidelettersOne(false)
        }
        if(consolidated_step == 3){
            showHidelettersOne(true)
            showHidelettersThree(true)
            showHidelettersTwo(false)
        }
        if(consolidated_step == 4){
            showHidelettersThree(false)
            showHidelettersOne(true)
            showHidelettersTwo(true)
        }

        clearInterval(debouncer)

      }, 500)

      if(dir == 1){
        if(consolidated_step>=0 && consolidated_step<=1){
          TweenLite.set('#onboarding_svg #text1', {x:x})
          TweenLite.set('#onboarding_svg #text2', {x:svgw+x})
          TweenLite.set('#onboarding_svg #text3', {x:svgw*2+x})
        }
        if(consolidated_step>=2 && consolidated_step<=3){
          TweenLite.set('#onboarding_svg #watermelon', {x:svgw*2+x})
          TweenLite.set('#onboarding_svg #pole_1_', {x:svgw*3+x})
          TweenLite.set('#onboarding_svg #orange', {x:svgw*4+x})
        }

      }


      if(dir == -1){
        if(consolidated_step>=0 && consolidated_step<=2){
          TweenLite.set('#onboarding_svg #text1', {x:x})
          TweenLite.set('#onboarding_svg #text2', {x:w+x})
          TweenLite.set('#onboarding_svg #text3', {x:w*2+x})
        }
        if(consolidated_step>=3 && consolidated_step<=4){
          TweenLite.set('#onboarding_svg #watermelon', {x:w*2+x})
          TweenLite.set('#onboarding_svg #pole_1_', {x:w*3+x})
          TweenLite.set('#onboarding_svg #orange', {x:w*4+x})
        }
      }
      
    }


    function showHideElements(arr, hide){
      var o = (hide) ? 0 : 1;
      arr.forEach(function(e){
        TweenLite.to('#onboarding_svg '+e, .35, {opacity:o})
      })
    }

    function showHidelettersOne(invert){
      showHideElements(['#lttr_c','#icon_c_1'], invert)
      showHideElements(['#single_c_1'], !invert)
    }
    function showHidelettersTwo(invert){
      showHideElements(['#lttr_i','#icon_i_1','#icon_i_2','#icon_i_3'], invert)
      showHideElements(['#single_i_1', '#single_i_2', '#single_i_3'], !invert)
    }
    function showHidelettersThree(invert){
      showHideElements(['#lttr_o','#icon_o_1','#icon_o_2'], invert)
      showHideElements(['#single_o_1', '#single_o_2'], !invert)
    }


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

  //////////////////////////////////////////////////////////////////////////////

  Cryptoloji.UI = {
    decryptText: decryptText,
    encryptText: encryptText,
    fillKeymodal: fillKeymodal,
    handleHeader: handleHeader,
    handleSvgLoading: handleSvgLoading,
    selectKey: selectKey,
    showDecryptableText: showDecryptableText,
    buildSlider: buildSlider,
    onBoardingSlider: false
  }
  
})(window, window.Cryptoloji, window.jQuery);
