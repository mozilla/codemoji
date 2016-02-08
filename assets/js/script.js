 $(document).ready(function(){
  $("body").height($(window).innerHeight())
  $(".main_content_top").height($(window).innerHeight()/2-120)
  $(".main_content_bottom").height($(window).innerHeight()/2-120)
  console.log($(window).innerHeight()/2-120/2)


  $('.main_content_top_input').bind('input propertychange', function() {
    var text = $('.main_content_top_input').val()
      $('.main_content_bottom_input').text(Criptoloji.encode(text, key))
  })

  var emoji_list = ['😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂']

  _.each(emoji_list, function(d){
    $(".keyslider_content").append('<p class="key" key="'+d+'">'+d+'</p>')
  })
  $('.key').click(function(){
    var text = $('.main_content_top_input').val()
    var key = $(this).attr('key')
    console.log(key)
    $('.main_content_bottom_input').text(Criptoloji.encode(text, key))
  })

})
