;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_03 = {}

	var prep = '#s3 '

	var index = 1

	var interv
	var timer
	var anims = []
	var isEnter=false

	function enter(clb){

		isEnter=true
		clearTimeout(timer)

		TweenLite.set($(prep + '#bubble'), {y:90});
		TweenLite.set($(prep + '#txt'), {y:90});
		TweenLite.set($(prep + '#cur'), {y:90});


		[1,2,3].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
		})

		$(prep + '#txt > g').css('display', 'none')
		$(prep + '#cur').css('display', 'none')

		anims.push( TweenLite.from($(prep + '#bubble'), 1, {delay:.1, opacity:0, y:0, ease:Elastic.easeInOut, onComplete:function(){

			$(prep + '#cur').css('display', 'block')
			var st = 0
			interv = setInterval(function(){
				st = (st==0) ? 1 : 0
				TweenLite.set($(prep + '#cur'), {opacity:st})	
			}, 350)

			setTimeout(function(){
				clearInterval(interv)
				$(prep + '#cur').css('display', 'none')
			}, 1500)

		}}) )

		
		
		$(prep + '#txt > g').each(function(i, e){
			var e = $(e).css('display', 'block')
			TweenLite.set(e, {opacity:1, scale:1, transformOrigin:'center center'})
			anims.push( TweenLite.from($(e), .25, {delay:2.5 + .7 + i*.06, opacity:0, ease:Expo.easeInOut}) )
		});

		[1,2,3].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.set(e, {opacity:1, y:0, transformOrigin:'center center'})
			anims.push( TweenLite.from(e, 1, {delay:4 + d*.1, opacity:0, y:40, transformOrigin:'center center', ease:Expo.easeInOut}) )
		});


		timer = setTimeout(function(){
			clb()
		}, 4000)

	}

	function swap(){
		
		$(prep + '#b'+index+' > g').each(function(i, e){
			anims.push( TweenLite.to($(e), .5, {delay:.5-i*.1, opacity:0}) )
		})

		if(index == 3) index = 0
		index++;

		$(prep + '#b'+index+' > g').each(function(i, e){
			$(e).css({display: 'block', opacity:1})
			anims.push( TweenLite.from($(e), .5, {delay:.5-i*.1, scale:1.3, opacity:0, transformOrigin:'center center', ease:Quart.easeInOut}) )
		})


	}

	function exit(clb){

		if(!isEnter){
			clb()
			return
		}
		isEnter=false

		clearInterval(interv)
		clearTimeout(timer)
		
		anims.forEach(function(d, i){
			if(d) d.kill()
		})
		anims=[]

		$(prep + '#b'+index+' > g').each(function(i, e){
			TweenLite.to($(e), .4, {delay:.5-i*.1, opacity:0})
		});

		[1,2,3,4,5].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:i*.1, opacity:0})
		});

		TweenLite.to($(prep + '#bubble'), 1, {y:0, ease:Elastic.easeInOut});
		TweenLite.to($(prep + '#txt'), 1, {y:0, ease:Elastic.easeInOut});

		timer = setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_03.enter = enter
	oo.scene_03.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
