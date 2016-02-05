 $(document).ready(function(){
  $("body").height($(window).innerHeight())

  $('.main_content_top_input').bind('input propertychange', function() {
    var text = $('.main_content_top_input').val()
      $('.main_content_bottom_input').text(Criptoloji.encode(text))
  })



  var emoji_list = ['a','b','c','d','e','f','g','a','b','c','d','e','f','g']

  _.each(emoji_list, function(d){
    $(".keyslider_content").append('<p class="key" key="'+d+'">'+d+'</p>')
  })
  $('.key').click(function(){
    console.log($(this).attr('key'))
    $('.main_content_bottom_input').text($(this).attr('key'))
  })

})





