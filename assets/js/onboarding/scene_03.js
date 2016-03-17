;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_03 = {}

	var prep = '#s3 '

	var index = 1

	function enter(clb){

		TweenLite.set($(prep + '#bubble'), {y:90});
		TweenLite.set($(prep + '#txt'), {y:90});


		[1,2,3].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
		})

		$(prep + '#txt > g').css('display', 'none')

		TweenLite.from($(prep + '#bubble'), 1, {delay:.1, opacity:0, y:0, ease:Elastic.easeInOut})
		
		$(prep + '#txt > g').each(function(i, e){
			var e = $(e).css('display', 'block')
			TweenLite.from($(e), .65, {delay:.5 + i*.1, opacity:0, scale:1.5, transformOrigin:'center center', ease:Elastic.easeInOut})
		});

		[1,2,3].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.from(e, 1.5, {delay:1.5 + d*.15, opacity:0, y:20, transformOrigin:'center center', ease:Elastic.easeInOut})
		});


		setTimeout(function(){
			clb()
		}, 3500)

	}

	function swap(){
		
		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0})
		})

		if(index == 3) index = 0
		index++;

		$(prep + '#b'+index+' > g').each(function(i, e){
			$(e).css({display: 'block', opacity:1})
			TweenLite.from($(e), .5, {delay:.5-i*.1, scale:1.3, opacity:0, transformOrigin:'center center', ease:Quart.easeInOut})
		})


	}

	function exit(clb){

		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .4, {delay:.5-i*.1, opacity:0})
		});

		[1,2,3,4,5].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:i*.1, opacity:0})
		});

		TweenLite.to($(prep + '#bubble'), .5, {y:0, ease:Quart.easeInOut});
		TweenLite.to($(prep + '#txt'), .5, {y:0, ease:Quart.easeInOut});

		setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_03.enter = enter
	oo.scene_03.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
