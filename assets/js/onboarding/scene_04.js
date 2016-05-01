;(function (window, OnBoardingAnimations, $, undefined) {

	var oo = OnBoardingAnimations

	oo.scene_04 = {}

	var prep = '#s4 '

	var interval
	var timer
	var anims = []
	var isEnter=false

	var pos = [null, -95, 0, 95, 95]
	var ops = [null, 1,1,1,0]
	var indexing = 0
	var indexArr = [2, 1, 3, 0]
	var previndex = 0

	function enter(clb){

		isEnter=true
		clearInterval(interval)
		clearTimeout(timer)

		indexing = 0;
		previndex = 0;
		
		[1,2,3].forEach(function(d){
			$(prep + '#tt'+d).css('display', 'none')
			$(prep + '#g'+d).css('display', 'none')

			TweenLite.set($(prep + '#f'+d), {opacity:1, scale:1, transformOrigin:'center center'})
			anims.push( TweenLite.from($(prep + '#f'+d), .8, {delay:d*.15, opacity:0, scale:1.3, transformOrigin:'center center', ease:Expo.easeInOut}) )
		})

		TweenLite.set($(prep + '#sel'), {opacity:0, scale:1})
		TweenLite.set($(prep + '#g0 > g'), {opacity:1});

		[1,2,3].forEach(function(d){
			var e = $(prep + '#tt'+d).css({display:'block'})
			TweenLite.set(e, {opacity:1, y:0})
			anims.push( TweenLite.from(e, 1, {delay:1 + d*.1, opacity:0, y:40, transformOrigin:'center center', ease:Expo.easeInOut}) )
		});

		anims.push( TweenLite.to($(prep), .5, {onComplete:function(){
			interval = setInterval(swap, 1600)
		}}) )

		

		timer = setTimeout(function(){
			clb()
		}, 3500)

	}



	function swap(){

		var index = indexArr[indexing]
		indexing++
		if(indexing>=indexArr.length){
			indexing = 0
		}

		anims.push( TweenLite.from($(prep + '#f'+index), .5, {scale:1.2, transformOrigin:'center center', ease:Quart.easeInOut}) )
		anims.push( TweenLite.to($(prep + '#sel'), .6, {opacity:ops[index], x:pos[index], ease:Expo.easeInOut}) )
		
		$(prep + '#g'+previndex+' > g').each(function(i, e){
			anims.push( TweenLite.to($(e), .35, {delay:Math.random()*.5, opacity:0, ease:Quart.easeInOut}) )
		})

		$(prep + '#g'+index).css('display', 'block')
		$(prep + '#g'+index+' > g').each(function(i, e){
			TweenLite.set($(e), {opacity:0})
			anims.push( TweenLite.to($(e), .5, {delay:Math.random()*.25, opacity:1, ease:Quart.easeInOut}) )
		})

		previndex=index
	}

	function exit(clb){

		if(!isEnter){
			clb()
			return
		}
		isEnter=false

		clearInterval(interval);
		clearTimeout(timer);

		anims.forEach(function(d, i){
			if(d) d.kill()
		})
		anims=[]

		if(previndex!=3){
			$(prep + '#g3').css('display', 'block')
			$(prep + '#g'+previndex+' > g').each(function(i, e){
				TweenLite.to($(e), .35, {delay:Math.random()*.25, opacity:0, ease:Quart.easeInOut, overwrite:true})
			})
			$(prep + '#g3 > g').each(function(i, e){
				TweenLite.to($(e), .35, {delay:Math.random()*.25, opacity:1, ease:Quart.easeInOut, overwrite:true})
			})
		};

		[1,2,3].forEach(function(d, i){
			var e = $(prep + '#tt'+d)
			TweenLite.to(e, .5, {delay:.3 + i*.1, opacity:0})
			TweenLite.to($(prep + '#f'+d), .5, {delay:i*.15, opacity:0, scale:1.3, transformOrigin:'center center', ease:Expo.easeInOut})
		});

		TweenLite.to($(prep + '#sel'), .5, {opacity:0, scale:1.2, transformOrigin:'center center', ease:Expo.easeInOut})

		timer = setTimeout(function(){
			clb()
		}, 1000)
	}

	oo.scene_04.enter = enter
	oo.scene_04.exit = exit

})(window, window.OnBoardingAnimations, window.jQuery); 
