 $(document).ready(function(){

  toSection(".section_welcome")

  $("body").css("height",$(window).innerHeight())
  $(".main_content_top").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_content_bottom").css("height",$(window).innerHeight()/2-$(".main_keyslider").height()/2)
  $(".main_content_top_label").css("margin-top", $(".header").height())

  //
  // Crypt & decrypt
  //
  var emoji_list = ['😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂','😹','😤','😐','😖','😀','😻','😕','🙍','😠','😨','😘','😇','😄','😂']
  _.each(emoji_list, function(d){
    $(".keyslider_content").append('<p class="key" key="'+d+'">'+d+'</p>')
  })
  $('.main_content_top_input').bind('input propertychange', function() {
    encryptText()
  })
  $('.key').click(function(){
    var key = $(this).attr('key')
    keySelect(key)
    encryptText()
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
  Criptoloji.key = key
  console.log('Chosen key', key)
}
function encryptText() {
  var text = $('.main_content_top_input').val()
  $('.main_content_bottom_input').text(Criptoloji.encrypt(text))
}

//
// Key Slider
//
function keysliderGoto(toElem, elementWidth) {
  $('.keyslider').animate({scrollLeft: toElem*elementWidth}, 200)
}
var debouncedKeysliderGoto = _.debounce(keysliderGoto, 200)
var lastPos = 0
var $wrapper = $('.keyslider')
$('.keyslider').scroll(function (event) {
  // debugger;
  var elementWidth = $('.key:nth-child(1)', $wrapper).outerWidth(true)
  console.log('elwidth', elementWidth)
  var currPos = $wrapper.scrollLeft()
  var direction = (currPos > lastPos) ? 'right' : 'left'
  console.log('keyslider direction: ' + direction)
  // calculate proper slide to element    
  var toElem = (currPos / elementWidth)
  var rightThreshold = 0.5
  var leftThreshold = 0.75
  var decimal = (toElem % 1).toFixed(1)
  console.log(toElem, decimal)
  if (direction === 'right' && decimal > rightThreshold)  
    toElem += 1
  if (direction === 'left' && decimal > 0 && decimal < leftThreshold)  
    toElem -= 1
  toElem = Math.ceil(toElem)
  console.log('keyslider goTo', toElem)
  debouncedKeysliderGoto(toElem, elementWidth)
  lastPos = currPos
});
