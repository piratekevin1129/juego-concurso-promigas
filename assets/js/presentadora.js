var animacion_entrada_presentadora = null

function showPresentadora(status){
    getE('presentadora').className = 'presentadora-on'
    getE('presentadora-feliz').className = 'presentadora-off'
    getE('presentadora-prepara').className = 'presentadora-off'
    getE('presentadora-desprepara').className = 'presentadora-off'
    getE('presentadora-habla').className = 'presentadora-off'
    
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
    }

    //spdPlayMovieclip({frame:1,stop:0,loop:true},p)
}

function hidePresentadora(){
    getE('presentadora').className = 'presentadora-off'
    getE('presentadora-feliz').className = 'presentadora-off'
    getE('presentadora-prepara').className = 'presentadora-off'
    getE('presentadora-desprepara').className = 'presentadora-off'
    getE('presentadora-habla').className = 'presentadora-off'   
}