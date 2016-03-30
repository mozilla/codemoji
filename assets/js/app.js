;(function (window, Cryptoloji, $, undefined) {
  'use strict'

  Cryptoloji.visitor.countVisit()

  //
  // jQuery document ready bootstrap
  //
  $(document).ready(function () {

    FastClick.attach(document.body);

    // remove main loader
    TweenLite.to($('#mainLoader'), .8, {opacity: 0})
    TweenLite.to($('#mainLoader'), 0, {display: "none", delay: .8})

    if ('ontouchstart' in window) {
      $('body').addClass('touch')
    }else{
      $('body').addClass('mouse')
    }

    //
    // Storage initialization
    //
    Cryptoloji.storage.init()

    // 
    // fix height
    // 
    //Cryptoloji.UI.fixHeight() // this is required for android keyboard behaviour
    
    // 
    // on rotation/resize
    //
    Cryptoloji.UI.handleOrientationChanges()
    // hard refresh when orientation changes
    Cryptoloji.stateman.on('orientationchange', function () {
      // only in desktop-like view refresh objects init
      if (Cryptoloji.mq.matches) {
        window.location.reload()
      }
    })





    
    //
    // behavior help button
    //
    Cryptoloji.UI.loadLogicHelpButton('encryption')
    Cryptoloji.UI.loadLogicHelpButton('decryption')

    //
    // Key modal setup
    //    

    // this delay postpone a bit the emoji download flow 
    // this way the browser think the webpage has been loaded (hiding its spinner)
    setTimeout(function(){
      if (!Cryptoloji.mq.matches) {
        Cryptoloji.UI.KeyModal('#key-modal')
          .fill(EmojiList)
          .addClickHandler('#encryption_key_modal_open')
          .addClickHandler('#decryption_key_modal_open')
      } else {
        Cryptoloji.UI.KeyPanel('#encryption_keypanel')
          .fill(EmojiList)
        Cryptoloji.UI.KeyPanel('#decryption_keypanel')
          .fill(EmojiList)
      }
    }, 2000)

    //
    // handle header show/hide
    //
    Cryptoloji.UI.handleHeader()
    Cryptoloji.UI.handleFooter()

    //
    // StateMan bootstrap
    //
    Cryptoloji.stateman.start()
    // go to welcome if no state is active
    if (Cryptoloji.stateman.current.name === ''){
      Cryptoloji.stateman.go('welcome')
    }
      
    //Cryptoloji.stateman.on('begin', function (event) { console.log('begin ', event) })
    //Cryptoloji.stateman.on('end', function (phase) { console.log('end ', phase) })
    Cryptoloji.stateman.on('notfound', function () {
      Cryptoloji.stateman.go('404')
    })

    //
    // track any stage change in gAnalytics
    //
    Cryptoloji.stateman.on('begin', function (e) {
      ga('send', 'pageview', e.path);
    })

    $('[track]').on('click', function(){
      var t = $(this).attr('track')
      var parts = t.split('__')
      ga('send', 'event', parts[0], parts[1]);
    })


    //
    // handle first visit element display/hide
    //
    if (Cryptoloji.visitor.isFirstVisit()) {
      $('[hide-on-first-visit-only]').hide()
    } else {
      $('[show-on-first-visit-only]').hide()
    }
  })

})(window, window.Cryptoloji, jQuery); 
