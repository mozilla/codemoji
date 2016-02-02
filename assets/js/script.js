 $(document).ready(function(){
	$("#input_field").on('input',function(e){
		// console.log($("#input_field").val())
		$(".traslation").text($("#input_field").val())
		// $(".traslation").text('&#101;')
	})
})