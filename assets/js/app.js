(function (window, Cryptoloji, $, undefined) {
  'use strict'

  Cryptoloji.settings = {
    inputMaxSize: 120
  }

  Cryptoloji.visitor.countVisit()

  //
  // jQuery document ready bootstrap
  //
  $(document).ready(function () {

    FastClick.attach(document.body);

    // 
    // fix height
    // 
    $("body").css("height",$(window).innerHeight())

    // fix header spacer
    var supportsOrientationChange = 'onorientationchange' in window
    var orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize'
    $(window).on(orientationEvent, function (event) {
      // console.log(event)
      // recalculate height on onrientation change
      $('body').css('height', $(window).innerHeight())
    })

    //
    // load svg
    //
    Cryptoloji.UI.handleSvgLoading()

    //
    // Key modal setup
    //    
    if (!Cryptoloji.mq.matches) {
      Cryptoloji.UI.KeyModal('#key-modal')
        .fill(EmojiList)
        .addClickHandler('#encryption_key_modal_open')
        .addClickHandler('#decryption_key_modal_open')
    } else {
      Cryptoloji.UI.KeyPanel('#encryption_keypanel')
        .fill(EmojiList)
    }

    //
    // handle header show/hide
    //
    Cryptoloji.UI.handleHeader()

    //
    // StateMan bootstrap
    //
    Cryptoloji.stateman.start()
    // go to welcome if no state is active
    if (Cryptoloji.stateman.current.name === '')
      Cryptoloji.stateman.go('welcome')

    Cryptoloji.stateman.on('begin', function (event) { console.log('begin ', event) })
    Cryptoloji.stateman.on('end', function (phase) { console.log('end ', phase) })
    Cryptoloji.stateman.on('notfound', function () { console.log('notfound') })
  })

})(window, window.Cryptoloji, jQuery); 
