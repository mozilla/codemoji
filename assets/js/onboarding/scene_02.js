;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_02 = {}

	var prep = '#s2 '

	var interval
	var index = 1

	function enter(clb){

		console.log('enter 1');

		[1,2,3].forEach(function(d){
			$(prep + '#b'+d+' > g').css('display', 'none')
		});

		[1,2,3,4,5].forEach(function(d){
			$(prep + 'tt'+d).css('display', 'none')
		})

		swap()
		interval = setInterval(swap, 1750);
		
		[1,2,3,4,5].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.from(e, 1.5, {delay:2.25 + d*.15, opacity:0, y:20, transformOrigin:'center center', ease:Elastic.easeInOut})
		});

		setTimeout(function(){
			clb()
		}, 5000)

	}

	function swap(){
		
		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0})
		})

		if(index == 3) index = 0
		index++;

		$(prep + '#b'+index+' > g').each(function(i, e){
			$(e).css({display: 'block', opacity:1})
			TweenLite.from($(e), .5, {delay:.5-i*.1, scale:1.35, opacity:0, transformOrigin:'center center', ease:Quart.easeInOut})
		})


	}

	function exit(clb){

		clearInterval(interval)
		interval=null

		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0})
		});

		[1,2,3,4,5].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:i*.1, opacity:0})
		});

		$(prep + '#a1 > g').each(function(i, e){
			TweenLite.to($(e), .5, {delay:.25 + .35-i*.07, opacity:0, y:-30, ease:Expo.easeInOut})
		})

		$(prep + '#a2 > *').each(function(i, e){
			TweenLite.to($(e), .5, {delay:i*.1, opacity:0, ease:Quart.easeInOut})
		})

		setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_02.enter = enter
	oo.scene_02.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
