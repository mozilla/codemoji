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

  function handleKeymodal () {
    $('body').click(function(event) { 
      if($('body').hasClass('main_key_modal-open') && !$(event.target.closest('.main_key_modal')).is('.main_key_modal')) {
        $('body').removeClass('main_key_modal-open')
      }        
    })

    function clickHandler (event) {
      event.stopPropagation()
      if ($('body').hasClass('main_key_modal-open')) {
        $('body').removeClass('main_key_modal-open')
      } else {
        if (Cryptoloji.stateman.current && Cryptoloji.stateman.current.name === 'encrypt') {
          $('.main_key_modal').css("height", $('.section_main.encryption .main_content_top').height())
        } else {
          $('.main_key_modal').css("height", $('.section_main.decryption .main_content_top').height())
        }
        $('body').addClass('main_key_modal-open')
      }
    }

    $('#encryption_key_modal_open').click(clickHandler)
    $('#decryption_key_modal_open').click(clickHandler)

    $('.main_key_modal_emoji_container').on('click', '.key', function (event) {
      // remove selected from keyslider
      $('.keyslider .key').removeClass('selected')
      var $self = $(event.target).closest('.key')
      var key = $self.attr('key')
      $self.addClass('selected')
      selectKey(key)
      if (Cryptoloji.stateman.current && Cryptoloji.stateman.current.name === 'encrypt') {
        encryptText()
      } else {
        Cryptoloji.stateman.emit('decrypt:key-chosen', key)
        decryptText()
      }

    })
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
    var mapval = rebound.MathUtil.mapValueInRange;
    var springSystem = new rebound.SpringSystem();
    var spring = springSystem.createSpring(50, 10);

    var el = $(content_selector);
    var scenes = el.children();
    var num = scenes.length;
    var w = $(document).width();
    var dots = $('.onboarding_pages').children()

    var mousedown=false;
    var currentX = 0;
    var lastX = 0;
    var currentPos = 0;
    var currentShift = 0;
    var step = 0;


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

      currentShift = (e.pageX - currentX) * fakt;
      TweenLite.set(el[0], {x:currentPos+currentShift, y:0})
      var shiftNorm = mapval(currentPos+currentShift, 0, w*num, 0, 1)
      spring.setCurrentValue(shiftNorm*-1);
      lastX = e.pageX;
    })


    $('body').on('touchmouseup', function(e){
      if (!mousedown) return;
      mousedown=false;
      currentPos += currentShift;

      if(lastX < currentX){
        step++;
        if(step > num-1) step=num-1;
      }else{
        step--;
        if(step < 0) step=0;
      }

      dots.removeClass('current')

      var currentScene = $(scenes[step])
      $(dots[step]).addClass('current')

      var childs = currentScene.children()

      TweenLite.from( $(childs[0]), 1, {delay:.25, opacity: 0, y:"-30px", ease:Expo.easeInOut});
      TweenLite.from( $(childs[1]), 1, {delay:.5, opacity: 0, y:"+30px", ease:Expo.easeInOut});


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
        var val = spring.getCurrentValue();
        val = mapval(val, 0, 1, 0, (w*num*-1));
        if(!mousedown) {
          TweenLite.set(el[0], {x:val, y:0})
          currentPos = val
        }
      }
    });
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
    handleKeymodal: handleKeymodal,
    handleHeader: handleHeader,
    handleSvgLoading: handleSvgLoading,
    selectKey: selectKey,
    showDecryptableText: showDecryptableText,
    buildSlider: buildSlider
  }
  
})(window, window.Cryptoloji, window.jQuery);
