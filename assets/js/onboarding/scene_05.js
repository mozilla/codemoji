;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_05 = {}

	var prep = '#s5 '


	function enter(clb){
		
		[1,2,3,4].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
			var e = $(prep + '#tt'+d)
			TweenLite.set(e, {opacity:0})
		});

		TweenLite.from($(prep+'#bubble_trig'), .5, {delay:.25, opacity:0, ease:Quart.easeInOut});
		TweenLite.from($(prep+'#deli'), 1.5, {delay:.25, opacity:0, y:20, transformOrigin:'center center', ease:Expo.easeInOut});

		TweenLite.from($(prep+'#d1'), 1.5, {delay:1.5, opacity:0, y:10, ease:Expo.easeInOut});

		TweenLite.to($(prep+'#d1'), 1.5, {delay:3, opacity:0, y:-10, ease:Expo.easeInOut});
		TweenLite.from($(prep+'#d2'), 1.5, {delay:3, opacity:0, y:10, ease:Expo.easeInOut});

		[1,2,3,4].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.set(e, {opacity:1, y:0})
			TweenLite.from(e, 1, {delay:4. + d*.2, opacity:0, y:40, transformOrigin:'center center', ease:Expo.easeInOut})
		});


		setTimeout(function(){
			clb()
		}, 6200)

	}




	function exit(clb){

		[1,2,3,4].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
		});


		setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_05.enter = enter
	oo.scene_05.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
