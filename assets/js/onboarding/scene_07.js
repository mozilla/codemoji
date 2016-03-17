;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_07 = {}

	var prep = '#s7 '


	function enter(clb){

		[1,2,3,4].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
		});


		[1,2,3,4].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.from(e, 1.5, {delay:d*.15, opacity:0, y:20, transformOrigin:'center center', ease:Elastic.easeInOut})
		});

		[1,2,3].forEach(function(d){
			var e = $(prep + '#bb'+d).css({display:'block'})
			TweenLite.from(e, 1.5, {delay:1.25 + d*.15, opacity:0, y:20, transformOrigin:'center center', ease:Elastic.easeInOut})
		});

		setTimeout(function(){
			clb()
		}, 3200)

	}




	function exit(clb){

		[1,2,3,4].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
		});

		[1,2,3].forEach(function(d, i){
			var e = $(prep + '#bb'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
		});

		setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_07.enter = enter
	oo.scene_07.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
