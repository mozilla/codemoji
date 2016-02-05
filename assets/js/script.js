 $(document).ready(function(){
  $("body").height($(window).innerHeight())

  $('.main_content_top_input').bind('input propertychange', function() {
    var text = $('.main_content_top_input').val()
      $('.main_content_bottom_input').text(Criptoloji.encode(text, key))
  })

<<<<<<< 66ec02e98c79e08c651c60d7378efd05ed3303bc
  var emoji_list = ['😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂']
=======
  var emoji_list = ['a','b','c','d','e','f','g','a','b','c','d','e','f','g']
>>>>>>> .

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
