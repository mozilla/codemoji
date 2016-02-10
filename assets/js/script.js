 $(document).ready(function(){

  // temporaly removed
  // $("body").css("height",$(window).innerHeight())
  // $(".main_content_top").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_key_modal").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  // $(".main_content_bottom").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  // $(".main_content_top_label").css("margin-top", $(".header").height())

  var emoji_list = ['😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂','😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂']
  
  //
  // Keyslider filler
  //
  _.each(emoji_list, function(d){
    $(".key_modal").before('<p class="key" key="'+d+'">'+Cryptoloji.twemoji(d)+'</p>')
  })
  //
  // Keymodal filler
  //
  _.each(emoji_list, function(d){
    $(".main_key_modal_1").append('<p class="key" key="'+d+'">'+Cryptoloji.twemoji(d)+'</p>')
  })

  //
  // <encryption> encrypt text
  //
  $('.encryption .main_content_top_input').bind('input propertychange', function() {
    encryptText()
  })

  // show share button on <encryption> input focis
  $('.encryption .main_content_top_input').on("focus", function(){
    $('.header_share').fadeIn()
  })

  //
  // Keyslider key select handler
  //
  $('.encryption .key').on('click', encryptionKeySelect)

  // modal
  $("body").click(function(event) { 
    if($('body').hasClass('key-modal-open')  && !$(event.target.closest('.main_key_modal')).is('.main_key_modal')) {
      $(".main_key_modal").hide()
      $('body').removeClass('key-modal-open')
    }        
  })

  $('.key_modal').click(function(event){
    event.stopPropagation()
      $(".main_key_modal").show()
      $('body').addClass('key-modal-open')
  })
  // $('#main_key_modal_close').click(function(event){
  //   event.stopPropagation()
  //     $(".main_key_modal").hide()
  //     $('body').removeClass('key-modal-open')
  // })
})

//
// Encrypt / key select
//
function keySelect(key) {
  Cryptoloji.use_key(key)
  console.debug('Chosen key', key)
  $(".share_key_emoji-item").html(Cryptoloji.twemoji(key))
}
function encryptText() {
  if (Cryptoloji.Encrypter.key) {
    var text = $('.encryption .main_content_top_input').val()
    if (text == '') {
      $('.encryption .main_content_bottom_input').html('')
      $('.share_message_item').html('')
    } else {
      console.debug('Chosen text:', text)
      text = Cryptoloji.encrypt(text)
      console.debug('Encrypted text:', text)
      text = Cryptoloji.twemoji(text)
      $('.encryption .main_content_bottom_input').html(text)
      $('.share_message_item').html(text)
    }
  }
}
function encryptionKeySelect(event) {
  $('.encryption .key').removeClass('selected')
  event.stopPropagation()
  var $self = $(event.target).closest('.key')
  var key = $self.attr('key')
  $self.addClass('selected')
  keySelect(key)
  encryptText()
}
