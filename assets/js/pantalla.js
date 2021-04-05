var animacion_pantalla_turn = null

function turnTvOn(callBack){
    tvturnon_mp3.play()
    getE('pantalla').className = 'pantalla-on'
    getE('pantalla-brillo-1').className = 'pantalla-brillo-1-on'
    getE('pantalla-brillo-2').className = 'pantalla-brillo-2-on'
    getE('pantalla-brillo-3').className = 'pantalla-brillo-3-on'

    getE('pantalla-1').className = 'pantalla-1-on'
    getE('pantalla-2').className = 'pantalla-1-on'
    
    animacion_pantalla_turn = setTimeout(function(){
        clearTimeout(animacion_pantalla_turn)
        animacion_pantalla_turn = null

        getE('pantalla').className = 'pantalla-off'
        getE('pantalla-brillo-1').className = 'pantalla-brillo-1-init'
        getE('pantalla-brillo-2').className = 'pantalla-brillo-2-init'
        getE('pantalla-brillo-3').className = 'pantalla-brillo-3-init'
        callBack()
    },1250)
}

function turnTvOff(callBack){
    tvturnoff_mp3.play()
    getE('pantalla').className = 'pantalla-on'
    getE('pantalla-brillo-1').className = 'pantalla-brillo-1-off'
    getE('pantalla-brillo-2').className = 'pantalla-brillo-2-off'
    getE('pantalla-brillo-3').className = 'pantalla-brillo-3-off'

    getE('pantalla-1').className = 'pantalla-1-off'
    getE('pantalla-2').className = 'pantalla-1-off'

    animacion_pantalla_turn = setTimeout(function(){
        clearTimeout(animacion_pantalla_turn)
        animacion_pantalla_turn = null

        /*getE('pantalla').className = 'pantalla-off'
        getE('pantalla-brillo-1').className = 'pantalla-brillo-1-init'
        getE('pantalla-brillo-2').className = 'pantalla-brillo-2-init'
        getE('pantalla-brillo-3').className = 'pantalla-brillo-3-init'*/
        callBack()
    },1250)
}