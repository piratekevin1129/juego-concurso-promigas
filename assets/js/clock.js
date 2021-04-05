var _timer = (3*60)

var _timer_1 = 0
var _timer_2 = 0
var _timer_3 = 0
var _timer_4 = 0
var _timeout = null
var _timer_reset = ''

function setTimer(data){
    if(_timer_reset!=''){
        getE('reloj').innerHTML = _timer_reset
    }else{
        _timer_reset = getE('reloj').innerHTML
    }
    
    _timer = data.t
    _timeout = data.timeout
    formatTimer()
    
    getE('reloj-1-1-p').innerHTML = (check0(_timer_1-1))
    getE('reloj-1-2-p').innerHTML = (check0(_timer_1))
    getE('reloj-1-3-p').innerHTML = (check0(_timer_1))

    getE('reloj-2-1-p').innerHTML = (check00(_timer_2-1))
    getE('reloj-2-2-p').innerHTML = (check00(_timer_2))
    getE('reloj-2-3-p').innerHTML = (check00(_timer_2))

    getE('reloj-3-1-p').innerHTML = (check0(_timer_3-1))
    getE('reloj-3-2-p').innerHTML = (check0(_timer_3))
    getE('reloj-3-3-p').innerHTML = (check0(_timer_3))

    getE('reloj-4-1-p').innerHTML = (check00(_timer_4-1))
    getE('reloj-4-2-p').innerHTML = (check00(_timer_4))
    getE('reloj-4-3-p').innerHTML = (check00(_timer_4))
    animacionReloj()
}

function getTimer(){
    return _timer
}

function stopTimer(){
    clearTimeout(animacion_reloj)
    animacion_reloj = null
    clearTimeout(animacion_reloj1)
    animacion_reloj1 = null
    clearTimeout(animacion_reloj2)
    animacion_reloj2 = null
    clearTimeout(animacion_reloj3)
    animacion_reloj3 = null
    clearTimeout(animacion_reloj4)
    animacion_reloj4 = null
}

function formatTimer(){
    var minutos = 0
    var segundos = 0
    if(_timer>=60){
        minutos = parseInt(_timer/60)
        segundos = _timer-(minutos*60)
    }else{
        segundos = _timer
    }

    if(minutos>=0&&minutos<10){
        _timer_1 = 0
        _timer_2 = minutos
    }else{
        var min_split = String(minutos).split("")
        _timer_1 = min_split[0]
        _timer_2 = min_split[1]
    }

    if(segundos>=0&&segundos<10){
        _timer_3 = 0
        _timer_4 = segundos
    }else{
        var seg_split = String(segundos).split("")
        _timer_3 = seg_split[0]
        _timer_4 = seg_split[1]
    }
}

function check0(valor){
    var val = valor
    if(valor==6){
        val = 0
    }
    return val
}
function check00(valor){
    var val = valor
    if(valor==10){
        val = 0
    }
    return val
}

var animacion_reloj = null
var animacion_reloj1 = null
var animacion_reloj2 = null
var animacion_reloj3 = null
var animacion_reloj4 = null

function animacionReloj(){
    animacion_reloj = setInterval(function(){
        var _timer_1_prev = _timer_1
        var _timer_2_prev = _timer_2
        var _timer_3_prev = _timer_3
        var _timer_4_prev = _timer_4
        _timer--
        formatTimer()

        if(_timer>=0){
            if(_timer==10){
                setDatePrisaAnim()
            }
            if(_timer_1!=_timer_1_prev){
                relojBajar1()
            }
            if(_timer_2!=_timer_2_prev){
                relojBajar2()
            }
            if(_timer_3!=_timer_3_prev){
                relojBajar3()
            }
            if(_timer_4!=_timer_4_prev){
                relojBajar4()
            }
        }else{
            clearTimeout(animacion_reloj)
            animacion_reloj = null

            _timeout()
        }
    },1000)
    
}

function relojBajar1(){
    getE('reloj-1-1-p').innerHTML = check0(_timer_1)
    getE('reloj-1-2-p').innerHTML = check0(parseInt(_timer_1)+1)
    getE('reloj-1-3-p').innerHTML = check0(parseInt(_timer_1)+1)

    getE('reloj-1-2').className = 'reloj-solapa-2 solapa-arriba'
    animacion_reloj1 = setTimeout(function(){
        clearTimeout(animacion_reloj1)
        animacion_reloj1 = null
        getE('reloj-1-2').className = 'reloj-solapa-2'
        getE('reloj-1-2-p').innerHTML = check0(_timer_1)
        getE('reloj-1-1-p').innerHTML = check0(parseInt(_timer_1)+1)

        getE('reloj-1-3-p').innerHTML = check0(_timer_1)
        getE('reloj-1-3').className = 'reloj-solapa-3 solapa-abajo'
        animacion_reloj1 = setTimeout(function(){
            clearTimeout(animacion_reloj1)
            animacion_reloj1 = null

            getE('reloj-1-3').className = 'reloj-solapa-3'
            getE('reloj-1-2').className = 'reloj-solapa-2'
            getE('reloj-1-2-p').innerHTML = check0(_timer_1)
            getE('reloj-1-3-p').innerHTML = check0(_timer_1)
            getE('reloj-1-1-p').innerHTML = check0(parseInt(_timer_1)-1)
            reloj_mp3.currentTime = 0
            reloj_mp3.play()
        },250)
    },250)
}

function relojBajar2(){
    getE('reloj-2-1-p').innerHTML = check00(_timer_2)
    getE('reloj-2-2-p').innerHTML = check00(parseInt(_timer_2)+1)
    getE('reloj-2-3-p').innerHTML = check00(parseInt(_timer_2)+1)

    getE('reloj-2-2').className = 'reloj-solapa-2 solapa-arriba'
    animacion_reloj2 = setTimeout(function(){
        clearTimeout(animacion_reloj2)
        animacion_reloj2 = null
        getE('reloj-2-2').className = 'reloj-solapa-2'
        getE('reloj-2-2-p').innerHTML = check00(_timer_2)
        getE('reloj-2-1-p').innerHTML = check00(parseInt(_timer_2)+1)

        getE('reloj-2-3-p').innerHTML = check00(_timer_2)
        getE('reloj-2-3').className = 'reloj-solapa-3 solapa-abajo'
        animacion_reloj2 = setTimeout(function(){
            clearTimeout(animacion_reloj2)
            animacion_reloj2 = null

            getE('reloj-2-3').className = 'reloj-solapa-3'
            getE('reloj-2-2').className = 'reloj-solapa-2'
            getE('reloj-2-2-p').innerHTML = check00(_timer_2)
            getE('reloj-2-3-p').innerHTML = check00(_timer_2)
            getE('reloj-2-1-p').innerHTML = check00(parseInt(_timer_2)-1)
            reloj_mp3.currentTime = 0
            reloj_mp3.play()
        },250)
    },250)
}

function relojBajar3(){
    getE('reloj-3-1-p').innerHTML = check0(_timer_3)
    getE('reloj-3-2-p').innerHTML = check0(parseInt(_timer_3)+1)
    getE('reloj-3-3-p').innerHTML = check0(parseInt(_timer_3)+1)

    getE('reloj-3-2').className = 'reloj-solapa-2 solapa-arriba'
    animacion_reloj3 = setTimeout(function(){
        clearTimeout(animacion_reloj3)
        animacion_reloj3 = null
        getE('reloj-3-2').className = 'reloj-solapa-2'
        getE('reloj-3-2-p').innerHTML = check0(_timer_3)
        getE('reloj-3-1-p').innerHTML = check0(parseInt(_timer_3)+1)

        getE('reloj-3-3-p').innerHTML = check0(_timer_3)
        getE('reloj-3-3').className = 'reloj-solapa-3 solapa-abajo'
        animacion_reloj3 = setTimeout(function(){
            clearTimeout(animacion_reloj3)
            animacion_reloj3 = null

            getE('reloj-3-3').className = 'reloj-solapa-3'
            getE('reloj-3-2').className = 'reloj-solapa-2'
            getE('reloj-3-2-p').innerHTML = check0(_timer_3)
            getE('reloj-3-3-p').innerHTML = check0(_timer_3)
            getE('reloj-3-1-p').innerHTML = check0(parseInt(_timer_3)-1)
            reloj_mp3.currentTime = 0
            reloj_mp3.play()
        },250)
    },250)
}

function relojBajar4(){
    getE('reloj-4-1-p').innerHTML = check00(_timer_4)
    getE('reloj-4-2-p').innerHTML = check00(parseInt(_timer_4)+1)
    getE('reloj-4-3-p').innerHTML = check00(parseInt(_timer_4)+1)

    getE('reloj-4-2').className = 'reloj-solapa-2 solapa-arriba'
    animacion_reloj4 = setTimeout(function(){
        clearTimeout(animacion_reloj4)
        animacion_reloj4 = null
        getE('reloj-4-2').className = 'reloj-solapa-2'
        getE('reloj-4-2-p').innerHTML = check00(_timer_4)
        getE('reloj-4-1-p').innerHTML = check00(parseInt(_timer_4)+1)

        getE('reloj-4-3-p').innerHTML = check00(_timer_4)
        getE('reloj-4-3').className = 'reloj-solapa-3 solapa-abajo'
        animacion_reloj4 = setTimeout(function(){
            clearTimeout(animacion_reloj4)
            animacion_reloj4 = null

            getE('reloj-4-3').className = 'reloj-solapa-3'
            getE('reloj-4-2').className = 'reloj-solapa-2'
            getE('reloj-4-2-p').innerHTML = check00(_timer_4)
            getE('reloj-4-3-p').innerHTML = check00(_timer_4)
            getE('reloj-4-1-p').innerHTML = check00(parseInt(_timer_4-1))
            reloj_mp3.currentTime = 0
            reloj_mp3.play()
        },250)
    },250)
}