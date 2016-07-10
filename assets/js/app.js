;(function (window, Cryptoloji, $, undefined) {
  'use strict'

  
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
    Cryptoloji.UI.fixHeight() // this is required for android keyboard behaviour
    
    // 
    // on rotation/resize
    //
    Cryptoloji.UI.handleOrientationChanges()
    
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
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
    // according to this reference we need to set a page first then we can send the pageview
    // events tracking don't consider pageview 
    if(Cryptoloji.stateman.current){
      var v = Cryptoloji.stateman.current.name
      ga('set', 'page', v);
      ga('send', 'pageview', v);
    }
    Cryptoloji.stateman.on('begin', function (e) {
      var v = e.path
      ga('set', 'page', v);
      ga('send', 'pageview', v);
    })


    var trackLabels = {
      'header__home': 'go to home from header',
      'landing__decipherit': 'click decipher cta',
      'decrypt__learnmore': 'click learn more cta from decrypt',
      'decrypt__newmsg': 'click new message cta from decrypt',
      'decrypt__help': 'click on help btn in decrypt',
      'onboarding__next': 'click on next cta in onboarding',
      'onboarding__gotit': 'click on go it link to skip onboarding',
      'encrypt__help': 'click on help btn in encrypt',
      'encrypt__clean': 'click on x to clear text input',
      'encrypt__moremoji': 'click on plus to show more emoji panel',
      'encrypt__share': 'click on share cta to open share panel',
      'share__learnmore': 'click learn more cta from share',
      'share__close': 'click on x to close the share panel',
      'share__fb': 'click on facebook btn',
      'share__tw': 'click on twitter btn',
      'share__ma': 'click on email btn',
      'share__sms': 'click on sms btn',
      'share__link': 'click on link',
      'share__copy': 'click on copy btn',
      'share__emoji': 'click on emoji key',
      'notfound__home': 'click on go to home from 404'
    }



    $('[track]').on('click', function(){
      var t = $(this).attr('track')
      var label = trackLabels[t]
      var parts = t.split('__')
      ga('send', 'event', parts[0], parts[1], label);
    })

    Cryptoloji.stateman.on('decrypt:wrong-key', function(){
      ga('send', 'event', 'decrypt', 'wrong-key', 'click on wrong key');
    })
    Cryptoloji.stateman.on('decrypt:right-key', function(){
      ga('send', 'event', 'decrypt', 'right-key', 'click on right key');
    })
    Cryptoloji.stateman.on('encrypt:key', function(key){
      if(key){
        ga('send', 'event', 'encrypt', 'key', 'click on a key');
      }else{
        ga('send', 'event', 'encrypt', 'key_first', 'click on the first choosen key');
      }
    })
    Cryptoloji.stateman.on('encrypt:key_soon', function(){
      ga('send', 'event', 'encrypt', 'key_soon', 'click on a key without text input');
    })

  })

})(window, window.Cryptoloji, jQuery); 
