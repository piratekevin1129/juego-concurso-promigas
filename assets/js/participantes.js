function setParticipante(p,s,b){
	if(p==1){
		b = getE('participante-1').getAttribute('bot')
		getE('participante-1').className = 'participante-pos'+b+' participante-on'
		getE('p1-feliz').className = 'participante-off'
		getE('p1-piensa').className = 'participante-off'
		getE('p1-triste').className = 'participante-off'
		getE('p1-neutro').className = 'participante-off'
		getE('p1-quieto').className = 'participante-off'

		if(s=='feliz'){
			getE('p1-feliz').className = 'participante-on'
		}else if(s=='piensa'){
			getE('p1-piensa').className = 'participante-on'
		}else if(s=='triste'){
			getE('p1-triste').className = 'participante-on'
		}else if(s=='neutro'){
			getE('p1-neutro').className = 'participante-on'
		}else if(s=='quieto'){
			getE('p1-quieto').className = 'participante-on'
		}
	}else if(p==2){
		b = getE('participante-2').getAttribute('bot')
		getE('participante-2').className = 'participante-pos'+b+' participante-on'
		getE('p2-feliz').className = 'participante-off'
		getE('p2-piensa').className = 'participante-off'
		getE('p2-triste').className = 'participante-off'
		getE('p2-neutro').className = 'participante-off'
		getE('p2-quieto').className = 'participante-off'

		if(s=='feliz'){
			getE('p2-feliz').className = 'participante-on'
		}else if(s=='piensa'){
			getE('p2-piensa').className = 'participante-on'
		}else if(s=='triste'){
			getE('p2-triste').className = 'participante-on'
		}else if(s=='neutro'){
			getE('p2-neutro').className = 'participante-on'
		}else if(s=='quieto'){
			getE('p2-quieto').className = 'participante-on'
		}
	}else if(p==3){
		b = getE('participante-3').getAttribute('bot')
		getE('participante-3').className = 'participante-pos'+b+' participante-on'
		getE('p3-feliz').className = 'participante-off'
		getE('p3-piensa').className = 'participante-off'
		getE('p3-triste').className = 'participante-off'
		getE('p3-neutro').className = 'participante-off'
		getE('p3-quieto').className = 'participante-off'

		if(s=='feliz'){
			getE('p3-feliz').className = 'participante-on'
		}else if(s=='piensa'){
			getE('p3-piensa').className = 'participante-on'
		}else if(s=='triste'){
			getE('p3-triste').className = 'participante-on'
		}else if(s=='neutro'){
			getE('p3-neutro').className = 'participante-on'
		}else if(s=='quieto'){
			getE('p3-quieto').className = 'participante-on'
		}
	}
}

var animacion_participante = null

var animacion_participante_piensa = null
function participantePensar(p){
	spdPlayMovieclip({frame:1,stop:45,loop:false,end:function(){
		participantePensar2(p)
	}},p)
}
function participantePensar2(p){
	animacion_participante_piensa = setTimeout(function(){
		clearTimeout(animacion_participante_piensa)
		animacion_participante_piensa = null

		participantePensar(p)
	},2000)
}
function stopParticipantePensar(p){
	clearTimeout(animacion_participante_piensa)
	animacion_participante_piensa = null
	spdStopMovieclip(p)
}