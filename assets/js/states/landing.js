(function (window, Cryptoloji, undefined) {
  'use strict'
  
  Cryptoloji.states.landing = {
    canEnter: function () {
      console.log(Cryptoloji.storage.get('message'))
      // verify a message is present in the storage
      if (_.isUndefined(Cryptoloji.storage.get('message')) || _.isEmpty(Cryptoloji.storage.get('message'))) {
        // if not redirect to not found state
        Cryptoloji.stateman.go('404')
        return false
      }
      return true
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
        TweenLite.set($("#landing_state_2_svg>svg>g"), {"opacity": 0, scale: .8, transformOrigin:'center center'})
        $("#landing_state_2_svg>svg>g").each(function(i){
          var self = this
          var tim = .4
          TweenLite.to($(this), .4, {opacity: 1, scale: 1, delay: i*tim+1})
          if(i < $("#landing_state_2_svg>svg>g").length - 1){
            TweenLite.to($(this), .4, {opacity: 0, scale: .8, delay: i*tim+(tim*3)/5+1})
          }
        })


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
    Cryptoloji.utils.resizeEmojis(message, .5, '#landing_state_1_encrypted_message')
  }

})(window, window.Cryptoloji); 







