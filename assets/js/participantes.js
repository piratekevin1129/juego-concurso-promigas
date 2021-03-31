function setParticipante(p,s){
	if(p==1){
		getE('participante-1').className = 'participante-on'
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
		getE('participante-2').className = 'participante-on'
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
		getE('participante-3').className = 'participante-on'
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