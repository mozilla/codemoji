 $(document).ready(function(){

  toSection(".section_welcome")

  $("body").css("height",$(window).innerHeight())
  $(".main_content_top").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_content_bottom").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_content_top_label").css("margin-top", $(".header").height())

  $(".keyslider_content").hide()
  $('.main_content_top_input').focus(function() {
      $(".keyslider_content").fadeIn()
  })

  //
  // Crypt & decrypt
  //
  var emoji_list = ['😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂']
  _.each(emoji_list, function(d){
    $(".keyslider_content").append('<p class="key" key="'+d+'">'+d+'</p>')
  })
  $('.main_content_top_input').bind('input propertychange', function() {
    var text = $('.main_content_top_input').val()
    $('.main_content_bottom_input').text(Criptoloji.encrypt(text))
  })
  $('.key').click(function(){
    var text = $('.main_content_top_input').val()
    var key = $(this).attr('key')
    Criptoloji.key = key
    console.log('Chosen key', key)
    $('.main_content_bottom_input').text(Criptoloji.encrypt(text))
  })

  //
  // Key Slider
  //

})

function toSection(button){
  $(".section").hide()
  $(button).show()
}
