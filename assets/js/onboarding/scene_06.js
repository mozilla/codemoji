;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_06 = {}

	var prep = '#s6 '

	var clp = ['#bubble', '#msg', '#pann', '#good']

	function enter(clb){
		
		[1,2,3,4].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
		});


		TweenLite.from($(prep+'#pann'), 1, {delay:.25, opacity:0, y:10, transformOrigin:'center center', ease:Elastic.easeInOut})
		TweenLite.from($(prep+'#deli'), 1.5, {delay:.35, opacity:0, y:20, transformOrigin:'center center', ease:Elastic.easeInOut});
		TweenLite.to($(prep+'#deli'), 1.5, {delay:3, opacity:0});

		TweenLite.from($(prep+'#good'), 1.5, {delay:2, opacity:0, y:10, ease:Expo.easeInOut});

		clp.forEach(function(d, i){
			var e = $(prep+d)
			TweenLite.to(e, 1.25, {delay:4 + i*.05, y:-150, ease:Expo.easeInOut});
		});

		[1,2,3,4].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.from(e, 1.5, {delay:4 + d*.15, opacity:0, y:20, transformOrigin:'center center', ease:Elastic.easeInOut})
		});

		setTimeout(function(){
			clb()
		}, 6500)

	}




	function exit(clb){

		[1,2,3,4].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
		});

		clp.forEach(function(d, i){
			var e = $(prep+d)
			TweenLite.to(e, .65, {delay:i*.05, y:-180, opacity:0, ease:Expo.easeInOut});
		});

		setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_06.enter = enter
	oo.scene_06.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
