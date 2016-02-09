 $(document).ready(function(){

  toSection(".section_welcome")

  $("body").css("height",$(window).innerHeight())
  $(".main_content_top").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_key_modal").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_content_bottom").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_content_top_label").css("margin-top", $(".header").height())

  //
  // Crypt & decrypt
  //
  var emoji_list = ['😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂','😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂']
  _.each(emoji_list, function(d){
    $(".key_modal").before('<p class="key" key="'+d+'">'+twemoji.parse(d)+'</p>')
  })
  _.each(emoji_list, function(d){
    $(".main_key_modal_1").append('<p class="key" key="'+d+'">'+d+'</p>')
  })
  $('.main_content_top_input').bind('input propertychange', function() {
    encryptText()
  })
  $('.main_content_top_input').on("focus", function(){
    $('.header_share').fadeIn()
  })
  $('.key').click(function(){
    var key = $(this).attr('key')
    keySelect(key)
    encryptText()

    var elementWidth = $('.encryption .keyslider .key:nth-child(1)').outerWidth(true)
    var toElem = $('.encryption .keyslider .key').index(this)
    console.log($('.encryption .keyslider .key').length, emoji_list.length, toElem)
    keysliderGoto(toElem, elementWidth)
  })


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
})

function toSection(button){
  $(".section").hide()
  $(button).show()
}

//
// Encrypt / key select
//
function keySelect(key) {
  Encrypter.key = key
  console.log('Chosen key', key)
  $(".share_key_emoji-item").text(key)
}
function encryptText() {
  var text = $('.main_content_top_input').val()
  text = Encrypter.encrypt(text)
  text = twemoji.parse(text)
  $('.main_content_bottom_input').html(text)
  $(".share_message_item").html(text)
}

//
// Key Slider
//
function keysliderGoto(toElem, elementWidth) {
  // console.log(toElem, elementWidth)
  $('.encryption .keyslider').animate({scrollLeft: toElem*elementWidth}, 200)
  keySelect($('.encryption .keyslider .key:nth-child('+toElem+')').attr('key'))
  encryptText()
}
var debouncedKeysliderGoto = _.debounce(keysliderGoto, 200)
var lastPos = 0
$('.keyslider').scroll(function (event) {
  // debugger;
  var elementWidth = $('.encryption .keyslider .key:nth-child(1)').outerWidth(true)
  // console.log('elwidth', elementWidth)
  var currPos = $('.encryption .keyslider').scrollLeft()
  var direction = (currPos > lastPos) ? 'right' : 'left'
  // console.log('keyslider direction: ' + direction)
  // calculate proper slide to element    
  var toElem = (currPos / elementWidth)
  var rightThreshold = 0.5
  var leftThreshold = 0.75
  var decimal = (toElem % 1).toFixed(1)
  // console.log(toElem, decimal)
  if (direction === 'right' && decimal > rightThreshold)  
    toElem += 1
  if (direction === 'left' && decimal > 0 && decimal < leftThreshold)  
    toElem -= 1
  toElem = Math.ceil(toElem)
  // console.log('keyslider goTo', toElem)
  debouncedKeysliderGoto(toElem, elementWidth)
  lastPos = currPos
});
