 $(document).ready(function(){

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
