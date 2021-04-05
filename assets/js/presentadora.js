var animacion_entrada_presentadora = null

function showPresentadora(status){
    getE('presentadora').className = 'presentadora-on'
    getE('presentadora-feliz').className = 'presentadora-off'
    getE('presentadora-prepara').className = 'presentadora-off'
    getE('presentadora-desprepara').className = 'presentadora-off'
    getE('presentadora-habla').className = 'presentadora-off'
    getE('presentadora-quieta').className = 'presentadora-off'
    
    var ind_p = -1
    if(status=='feliz'){
        p = 0
        getE('presentadora-feliz').className = 'presentadora-on'
    }else if(status=='prepara'){
        p = 1
        getE('presentadora-prepara').className = 'presentadora-on'
    }else if(status=='desprepara'){
        p = 2
        getE('presentadora-desprepara').className = 'presentadora-on'
    }else if(status=='habla'){
        p = 3
        getE('presentadora-habla').className = 'presentadora-on'
    }else if(status=='quieta'){
        p = 4
        getE('presentadora-quieta').className = 'presentadora-on'
    }

    //spdPlayMovieclip({frame:1,stop:0,loop:true},p)
}

function resetPresentadora(){
    //presentadora
	spdStopMovieclip(0)
	spdSetMovieclip({id:0,f:1})
	spdStopMovieclip(1)
	spdSetMovieclip({id:1,f:1})
	spdStopMovieclip(2)
	spdSetMovieclip({id:2,f:1})
	spdStopMovieclip(3)
	spdSetMovieclip({id:3,f:1})
    spdStopMovieclip(16)
	spdSetMovieclip({id:16,f:1})

	showPresentadora('quieta')
}

function hidePresentadora(){
    getE('presentadora').className = 'presentadora-off'
    getE('presentadora-feliz').className = 'presentadora-off'
    getE('presentadora-prepara').className = 'presentadora-off'
    getE('presentadora-desprepara').className = 'presentadora-off'
    getE('presentadora-habla').className = 'presentadora-off'   
    getE('presentadora-quieta').className = 'presentadora-off'
}

var animacion_presentadora_quieta = null
function animarPresentadoraQuieta(){
    spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
        animarPresentadoraQuieta2()
    }},16)
}
function animarPresentadoraQuieta2(){
    animacion_presentadora_quieta = setTimeout(function(){
        clearTimeout(animacion_presentadora_quieta)
        animacion_presentadora_quieta = null

        animarPresentadoraQuieta()
    },200)
}
function stopPresentadoraQuieta(){
    clearTimeout(animacion_presentadora_quieta)
    animacion_presentadora_quieta = null
    spdStopMovieclip(16)
}