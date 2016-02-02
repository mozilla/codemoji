 $(document).ready(function(){
  $("#input_field").on('input',function(e){
    // console.log($("#input_field").val())
    // $(".traslation").text($("#input_field").val())
    // $(".traslation").text('&#101;')
    
    var cleartext = $("#input_field").val()
    var ciphred = caesarShift(cleartext, 3)
    var emojied = emojiEncode(ciphred)
    $(".traslation").html(emojied.replace(/\n/g,"<br>"))
    $(".backfromtheemoji").html(emojiDecode(emojied).replace(/\n/g,"<br>"))
    $(".backfromthepast").html(caesarShift(emojiDecode(emojied), -3).replace(/\n/g,"<br>"))
  })
})
