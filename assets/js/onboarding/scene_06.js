;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_06 = {}

	var prep = '#s6 '

	var clp = ['#bubble_g', '#msg', '#thekey', '#deli_2', '#panno', '#deli_3', '#good']

	var timer
	var anims = []
	var isEnter=false

	function enter(clb){

		isEnter=true
		clearTimeout(timer);

		[1,2,3,4,5].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
		});

		clp.forEach(function(d, i){
			var e = $(prep+d)
			var o = (d!='#deli_2' && d!='#deli_3') ? 1 : .5
			TweenLite.set(e, {y:0, opacity:o})
		})

		anims.push( TweenLite.from($(prep+'#thekey'), 1, {delay:.25, opacity:0, y:10, transformOrigin:'center center', ease:Expo.easeInOut}) )
		anims.push( TweenLite.from($(prep+'#deli_2'), 1.5, {delay:.35, opacity:0, y:10, transformOrigin:'center center', ease:Elastic.easeInOut}) )

		anims.push( TweenLite.from($(prep+'#good'), 1, {delay:1.5, opacity:0, y:10, ease:Expo.easeInOut}) )

		clp.forEach(function(d, i){
			var e = $(prep+d)
			anims.push( TweenLite.to(e, 1.25, {delay:3.5 + i*.05, y:-240, ease:Expo.easeInOut}) )
		});

		[1,2,3,4,5].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.set(e, {opacity:1, y:0})
			anims.push( TweenLite.from(e, 1, {delay:4 + d*.1, opacity:0, y:40, transformOrigin:'center center', ease:Expo.easeInOut}) )
		});

		timer = setTimeout(function(){
			clb()
		}, 5200)

	}




	function exit(clb){

		if(!isEnter){
			clb()
			return
		}
		isEnter=false

		clearTimeout(timer);

		anims.forEach(function(d, i){
			if(d) d.kill()
		})
		anims=[];


		[1,2,3,4,5].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
		});

		clp.forEach(function(d, i){
			var e = $(prep+d)
			TweenLite.to(e, .65, {delay:i*.05, y:-270, opacity:0, ease:Expo.easeInOut});
		});

		timer = setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_06.enter = enter
	oo.scene_06.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
