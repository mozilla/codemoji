(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.landing = {
    canEnter: function () {
      console.log(Cryptoloji.storage.get('message'))
      // verify a message is present in the storage
      if (_.isUndefined(Cryptoloji.storage.get('message')) || _.isEmpty(Cryptoloji.storage.get('message'))) {
        // if not redirect to not found state
        Cryptoloji.stateman.go('404')
      }
    },
    enter: function () {

      fillMessage()

      $(".section_landing").addClass("section-show")
      Cryptoloji.stateman.emit('footer:show') 

      var time = .3
      var delay = .4
      TweenLite.set($("[landing-state]"), {display: "none"})
      TweenLite.set($("[landing-state='1']"), {display: "block", opacity: 0})
      // text
      TweenLite.to($("#landing_state_1_text"), time, {opacity: 1, delay: delay})
      // svg
      TweenLite.to($("#landing_state_1_encrypted_message"), time, {opacity: 1, delay: delay * 2})
      // button
      TweenLite.to($("#landing_state_1_button"), time, {opacity: 1, delay: delay * 3})


      $("#landing_state_1_button").on("click", function(){
        TweenLite.set($("[landing-state]"), {display: "none"})
        TweenLite.set($("[landing-state='2']"), {display: "block", opacity: 0})
        TweenLite.set($("#landing_state_2_question_mark"), {opacity: 0})
        // text
        TweenLite.to($("#landing_state_2_text"), time, {opacity: 1, delay: delay})
        // svg
        TweenLite.to($("#landing_state_2_svg"), time, {opacity: 1, delay: delay * 2})
        TweenLite.to($("#landing_state_2_emoji"), time, {opacity: .3, delay: delay * 3})
        TweenLite.to($("#landing_state_2_question_mark"), time, {opacity: 1, delay: delay * 3})
        // button
        TweenLite.to($("#landing_state_2_button"), time, {opacity: 1, delay: delay * 3})
      })

    },
    leave: function () {
      $(".section_landing").removeClass("section-show")
      Cryptoloji.stateman.emit('footer:hide') 
    }
  }

  function fillMessage () {
    var message = Cryptoloji.storage.get('message')
    $('#landing_state_1_encrypted_message').html(Cryptoloji.UI.toTwemoji(message))
    var emojiSize = $('body').height() / 480 * 100
    var emojiLength = 120
    if (message) {
      emojiLength = message.length
    }
    var molt = 1/2
    if (emojiLength == 1) {
      emojiSize = emojiSize * molt * 12 
    } else if (emojiLength >= 2 && emojiLength < 13) {
      emojiSize = emojiSize * molt * 4 
    } else if (emojiLength >= 13 && emojiLength < 20) {
      emojiSize = emojiSize * molt * 3 
    } else if (emojiLength >= 20 && emojiLength < 36) {
      emojiSize = emojiSize * molt * 2 
    } else if (emojiLength >= 36 && emojiLength < 60) {
      emojiSize = emojiSize * molt * 1.7 
    } else if (emojiLength >= 60 && emojiLength < 80) {
      emojiSize = emojiSize * molt * 1.5 
    } else if (emojiLength >= 80 && emojiLength < 100) {
      emojiSize = emojiSize * molt * 1.2 
    } else {
      emojiSize = emojiSize * molt * 1 
    }
    $('#landing_state_1_encrypted_message').css('font-size', emojiSize + '%')
  }

})(window, window.Cryptoloji); 







