 $(document).ready(function(){
  $("body").height($(window).innerHeight())

  $('.main_content_top_input').bind('input propertychange', function() {
    var text = $('.main_content_top_input').val()
      $('.main_content_bottom_input').text(Criptoloji.encode(text))
  })

  $('.key').click(function(){
    console.log($(this).attr('key'))
  })

})





