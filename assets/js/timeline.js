var _duration = 0

function setTimeline(){	
	getE('timeline').className = 'timeline-on'
	_duration = getE('video-comercial').duration
	//animacion_timeline = setInterval(animacionTimeline,100)

    continueVideo()
}

var animacion_timeline = null
var time_prev = 0
var time_new = 0
function animacionTimeline(){
	var current = getE('video-comercial').currentTime
	var percent = (current*100)/_duration
	time_new = current
	time_prev = current

	getE('tl-playbar-status').style.width = percent+'%'
	getE('tl-duration').innerHTML = String(formatSecs(parseInt(current))+'/'+formatSecs(parseInt(_duration)))
}


function clickTimeline(event){
	//mirar si esta bloqueado
	
    var x = event.pageX
    var rect = getE('tl-playbar').getBoundingClientRect()

    var distance = x-rect.left
    var percent = (distance*100)/rect.width
    var time = (percent*_duration)/100
    getE('tl-playbar-status').style.width = percent+'%'

    getE('video-comercial').currentTime = time
}


var handle_video = 'on'
function handleVideo(){
	var clas = getE('tl-play-btn').className
	if(clas=='tl-play-paused'){
		continueVideo()
	}else if('tl-play-playing'){
		pauseVideo()
	}else if('tl-play-repeat'){
		startVideo()
	}
}
function pauseVideo(){
	getE('tl-play-btn').className = 'tl-play-paused'
	getE('video-comercial').pause()
	clearInterval(animacion_timeline)
	handle_video = 'off'
}
function continueVideo(){
	getE('tl-play-btn').className = 'tl-play-playing'
	getE('video-comercial').play()
	animacion_timeline = setInterval(animacionTimeline,100)
	handle_video = 'on'
}
function startVideo(){
	getE('tl-play-btn').className = 'tl-play-playing'
	getE('video-comercial').currentTime = 0
	getE('video-comercial').play()
	animacion_timeline = setInterval(animacionTimeline,100)
	handle_video = 'on'
}


var handle_sound = 'on'
function handleSound(){
	var btn = getE('tl-sound-btn')
	var clas = btn.className
	if(clas=='tl-sound-on'){
		btn.className = 'tl-sound-off'
		handle_sound = 'off'
		getE('video-comercial').volume = 0
	}else{
		btn.className = 'tl-sound-on'
		handle_sound = 'on'
		getE('video-comercial').volume = 1
	}
}


function formatSecs(secs){
	var minutos = parseInt(secs/60)
	var segundos = secs-(minutos*60)

	var m = ''
	var s = ''
	if(minutos>=0&&minutos<10){
		m = '0'+minutos
	}else{
		m = minutos
	}
	if(segundos>0&&segundos<10){
		s = '0'+segundos
	}else{
		s = segundos
	}

	return m+':'+s
}

function unsetTimeline(){
	clearInterval(animacion_timeline)
	animacion_timeline = null

	_duration = 0
	getE('tl-playbar-status').style.width = '0%'
	getE('timeline').className = 'timeline-off'
		
	cc_data = null
}