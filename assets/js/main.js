var audio_general_mp3 = null
var animacion_entradas = null

function clickComenzar(){
    getE('welcome-page').className = 'welcome-page-off'

    turnTvOn(function(){
        //getE('inicio').className = 'video-on'
        //getE('video-inicio').play()
        //getE('video-inicio').onended = function(){
            setTransition({title:'Vamos a comenzar'},
                function(){
                    //prepare
                    getE('inicio').innerHTML = ''
                    getE('inicio').style.display = 'none'

                    getE('intro').className = 'video-on intro-out'

                    showPresentadora('habla')
                    getE('presentadora').classList.add('presentadora-intro')
                    getE('concursantes').className = 'concursantes-intro'
                    setParticipante(1,'quieto')
                    setParticipante(2,'quieto')
                    setParticipante(3,'quieto')

                    getE('tablero').className = 'tablero-on'
                },
                function(){
                    //set
                    getE('video-intro').play()
                    getE('luces').className = 'luces-on'
                    getE('intro').className = 'video-on intro-in'
                    
                    spdPlayMovieclip({frame:1,stop:0,loop:true},7)
                    spdPlayMovieclip({frame:1,stop:0,loop:true},11)
                    spdPlayMovieclip({frame:1,stop:0,loop:true},15)

                    intro_mp3.play()
                    intro_aplausos_mp3.play()
                    /*intro_mp3.onended = function(){
                        intro_mp3.currentTime = 0
                        intro_mp3.play()
                        intro_aplausos_mp3.currentTime = 0
                        intro_aplausos_mp3.play()
                    }*/

                    getE('video-intro').onended = function(){
                        getE('video-intro').currentTime = 0
                        getE('video-intro').play()
                    }
                    
                    //showPresentadora('habla')
                    //getE('presentadora').classList.add('presentadora-intro')
                    spdPlayMovieclip({frame:1,stop:0,loop:true},3)
                    
                    introduccion_mp3.currentTime = 0
                    introduccion_mp3.play()
                    introduccion_mp3.onended = function(){

                        intro_mp3.onended = null
                        intro_mp3.pause()
                        intro_aplausos_mp3.pause()

                        //parar presentadora hablando
                        spdStopMovieclip(3)
                        //parar en el fotograma 1
                        spdSetMovieclip({id:3,f:1})

                        //parar concursantes parpadeando
                        spdStopMovieclip(7)
                        spdStopMovieclip(11)
                        spdStopMovieclip(15)

                        //se va
                        getE('intro').className = 'video-on intro-out'
                        animacion_entradas = setTimeout(function(){
                            clearTimeout(animacion_entradas)
                            animacion_entradas = null

                            setTransition({title:'¡Prepárate!'},
                                function(){
                                    showPresentadora('prepara')
                                    //getE('concursantes').className = 'concursantes-big'
                                    //getE('presentadora').classList.add('presentadora-big')
                                    getE('concursantes').className = 'concursantes-big'
                                    getE('presentadora').classList.add('presentadora-big')

                                    getE('video-intro').currentTime = 0
                                    getE('video-intro').pause()
                                    getE('video-intro').onended = null
                                    getE('video-intro').className = 'video-intro-off'
                                    getE('trofeo').className = 'trofeo-big'

                                    getE('intro').className = 'video-on intro-center'
                                    getE('fondo-intro').className = 'fondo-intro-on'
                                    getE('tablero').className = 'tablero-off'
                                    getE('tablero-brillo').className = ''
                                },
                                function(){
                                    spdPlayMovieclip({frame:1,stop:0,loop:true},7)
                                    spdPlayMovieclip({frame:1,stop:0,loop:true},11)
                                    spdPlayMovieclip({frame:1,stop:0,loop:true},15)

                                    //Empezar preguntas
                                    empezarPreguntas()
                                }
                            )
                        },1000)
                    }
                    
                }
            )
        //}
    })
}

var actual_pregunta = 0
var actual_pregunta_data = null

function empezarPreguntas(){
    actual_pregunta_data = data_preguntas[actual_pregunta]
    //alert("empezar preguntas")

    audio_general_mp3 = new Audio()
    audio_general_mp3.src = 'assets/media/juego/'+(actual_pregunta+1)+'/'+actual_pregunta_data.preguntaaudio+'.mp3'
    audio_general_mp3.load()
    audio_general_mp3.onloadedmetadata = function(){

        spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
            audio_general_mp3.currentTime = 0
            audio_general_mp3.play()
    
            showPresentadora('habla')
            getE('presentadora').classList.add('presentadora-big')
            spdPlayMovieclip({frame:1,stop:0,loop:true},3)
        }},1)
        
    }
    audio_general_mp3.onended = function(){
        audio_general_mp3.onloadedmetadata = null
        audio_general_mp3.onended = null

        spdStopMovieclip(3)
        spdSetMovieclip({id:3,f:1})
        showPresentadora('desprepara')
        getE('presentadora').classList.add('presentadora-big')
        
        spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){

            getE('presentadora').classList.add('presentadora-big')
            //getE('trofeo').className = 'trofeo-off'
            animarPresentadoraQuieta()
            
            suspenso_mp3.currentTime = 0
            suspenso_mp3.play()
            suspenso_mp3.onended = function(){
                suspenso_mp3.play()
            }

            //animacion_entradas = setTimeout(function(){
                //clearTimeout(animacion_entradas)
                //animacion_entradas = null

                getE('reloj').className = 'reloj-on'
                setTimer({t:30,timeout:function(){
                    timeUp()
                }})

                if(actual_pregunta_data.tipo=='verdaderofalso'){
                    getE('pregunta-1-enunciado').innerHTML = actual_pregunta_data.pregunta
                    getE('pregunta-cont-1').className = 'pregunta-cont-1-in'

                    var zonas = getE('pregunta-cont-1').getElementsByTagName('pregunta-1-zona')
                    for(i = 0;i<zonas.length;i++){
                        zonas[i].setAttribute('onclick','clickOpcion(this)')
                        zonas[i].setAttribute('onmouseover','overOpcion()')
                        zonas[i].setAttribute('onmouseout','overOpcion()')
                    }

                    setParticipante(1,'piensa')
                    setParticipante(2,'piensa')
                    setParticipante(3,'piensa')

                    participantePensar(5)
                }
            //},1000)
        }},2)
    }
}

function overOpcion(){
    var over_audio = new Audio('assets/media/over.mp3')
    over_audio.play()
}

function outOpcion(){

}

function clickOpcion(zona){
    var o = zona.getAttribute('ind')
    clickResponde()
    
    if(o==actual_pregunta_data.correcta){  
        ganarPregunta()
    }else{
        perderPregunta(true)
    }
}

var respuesta_bot = 0

function clickResponde(){
    var zonas = getE('pregunta-cont-1').getElementsByTagName('pregunta-1-zona')
    for(i = 0;i<zonas.length;i++){
        zonas[i].removeAttribute('onclick')
        zonas[i].removeAttribute('onmouseover')
        zonas[i].removeAttribute('onmouseout')
    }
        
    getE('pregunta-cont-1').className = 'pregunta-cont-1-out'

    suspenso_mp3.pause()
    suspenso_mp3.onended = null
    dateprisa_mp3.pause()

    click_mp3.play()
    //parar pensar
    stopParticipantePensar(5)
    //spdStopMovieclip(9)
    //spdStopMovieclip(13)
    //parar presentadora parpadea
    stopPresentadoraQuieta()
}

function ganarPregunta(){
    bien_mp3.play()
    setParticipante(1,'feliz')
    //setParticipante(2,'neutro')
    //setParticipante(3,'neutro')
    showPresentadora('feliz')
    getE('presentadora').className = 'presentadora-big'

    spdPlayMovieclip({frame:1,stop:0,loop:false,end:function(){
        //nada
    }},0)
    spdPlayMovieclip({frame:1,stop:0,loop:false,end:function(){
        //nada
    }},4)

    setCortina({title:'¡Correcto!'},
        function(){
            //prepare
            //quitar img de fondo y poner video
            getE('video-intro').className = 'video-on'
            getE('fondo-intro').className = 'fondo-intro-off'
            getE('video-intro').play()
            getE('video-intro').onended = function(){
                getE('video-intro').currentTime = 0
                getE('video-intro').play()
            }
            aplausos_mp3.play()

            getE('trofeo').className = 'trofeo-intro'
            getE('tablero').className = 'tablero-on'
            getE('reloj').className = 'reloj-off'

            //dependiendo del tiempo que se demoró en contestar es el puntaje
            //0segs - 5segs = 5
            //5segs en adelante = 10
            var score = getTimer()
            if(score>=0&&score<5){
                score = 5
            }else{
                score = 10
            }
            sumarPuntosTablero([{p:1,s:score}])

            getE('concursantes').className = 'concursantes-intro'
            showPresentadora('prepara')
            getE('presentadora').classList.add('presentadora-intro')
            
            spdStopMovieclip(4)
            spdSetMovieclip({id:4,f:1})
            setParticipante(2,'triste')
            setParticipante(3,'triste')
        },
        function(){
            //callback

            spdPlayMovieclip({frame:1,stop:0,loop:true},4)
            
            animacion_participante = setTimeout(function(){
                clearTimeout(animacion_participante)
                animacion_participante = null

                spdPlayMovieclip({frame:1,stop:0,loop:true},10)
                animacion_participante = setTimeout(function(){
                    clearTimeout(animacion_participante)
                    animacion_participante = null
                    
                    spdPlayMovieclip({frame:1,stop:0,loop:true},14)
                },500)
            },500)

            //if(actual_pregunta_data.audiocorrect!=null){
                audio_general_mp3 = new Audio()
                audio_general_mp3.src = 'assets/media/juego/'+(actual_pregunta+1)+'/'+actual_pregunta_data.audiocorrect+'.mp3'
                audio_general_mp3.load()
                audio_general_mp3.onloadedmetadata = function(){
                    spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                        audio_general_mp3.currentTime = 0
                        audio_general_mp3.play()
                
                        showPresentadora('habla')
                        getE('presentadora').classList.add('presentadora-intro')
                        spdPlayMovieclip({frame:1,stop:0,loop:true},3)
                    }},1)

                }
                audio_general_mp3.onended = function(){
                    audio_general_mp3.onloadedmetadata = null
                    audio_general_mp3.onended = null

                    spdStopMovieclip(3)
                    spdSetMovieclip({id:3,f:1})
                    showPresentadora('desprepara')
                    getE('presentadora').classList.add('presentadora-intro')
                    
                    spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                        alert("siguiente")
                        //getE('presentadora').classList.add('presentadora-gone')
                        //puff_mp3.play()
                    }},2)
                }
            /*}else{
                alert("No audio")
            }*/

        }
    )
}

function perderPregunta(answer){
    mal_mp3.play()
    setParticipante(1,'triste')
    //setParticipante(2,'neutro')
    //setParticipante(3,'neutro')
    
    spdPlayMovieclip({frame:1,stop:0,loop:false,end:function(){
        //nada
    }},6)

    var title_cortina = ''
    if(answer){
        title_cortina = '!Incorrecto¡'
    }else{
        title_cortina = '¡Tiempo!'
    }

    //detectar cual bot respondió bien
    var respuesta_bot = getRand(1,2)

    setCortina({title:title_cortina},
        function(){
            //prepare
            //quitar img de fondo y poner video
            getE('video-intro').className = 'video-on'
            getE('fondo-intro').className = 'fondo-intro-off'
            getE('video-intro').play()
            getE('video-intro').onended = function(){
                getE('video-intro').currentTime = 0
                getE('video-intro').play()
            }
            booh_mp3.play()

            getE('trofeo').className = 'trofeo-intro'
            getE('tablero').className = 'tablero-on'
            getE('reloj').className = 'reloj-off'

            var array_puntajes = []
            //mirar cual bot es el ganador
            if(respuesta_bot==1){
                array_puntajes.push({p:2,s:getRand(5,10)})
            }else if(respuesta_bot==2){
                array_puntajes.push({p:3,s:getRand(5,10)})
            }
            sumarPuntosTablero(array_puntajes)

            getE('concursantes').className = 'concursantes-intro'
            showPresentadora('prepara')
            getE('presentadora').classList.add('presentadora-intro')
            
            spdStopMovieclip(6)
            spdSetMovieclip({id:6,f:1})

            if(respuesta_bot==1){
                setParticipante(2,'feliz')
                setParticipante(3,'triste')
            }else if(respuesta_bot==2){
                setParticipante(2,'triste')
                setParticipante(3,'feliz')
            }
        },
        function(){
            //callback
            spdPlayMovieclip({frame:1,stop:0,loop:true},6)
            if(respuesta_bot==1){
                spdPlayMovieclip({frame:1,stop:0,loop:true},8)
                spdPlayMovieclip({frame:1,stop:0,loop:true},14)
                p_bien_mp3 = p2_bien_mp3
            }else if(respuesta_bot==2){
                spdPlayMovieclip({frame:1,stop:0,loop:true},10)
                spdPlayMovieclip({frame:1,stop:0,loop:true},12)
                p_bien_mp3 = p3_bien_mp3
            }

            //audio de julanito contestó correctamente
            spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                p_bien_mp3.currentTime = 0
                p_bien_mp3.play()
        
                showPresentadora('habla')
                getE('presentadora').classList.add('presentadora-intro')
                spdPlayMovieclip({frame:1,stop:0,loop:true},3)

                p_bien_mp3.onended = function(){
                    p_bien_mp3.onended = null
                    p_bien_mp3 = null
                    spdStopMovieclip(3)

                    //if(actual_pregunta_data.audioincorrect!=null){
                        audio_general_mp3 = new Audio()
                        if(answer){
                            audio_general_mp3.src = 'assets/media/juego/'+(actual_pregunta+1)+'/'+actual_pregunta_data.audioincorrect+'.mp3'
                        }else{
                            audio_general_mp3.src = 'assets/media/juego/'+(actual_pregunta+1)+'/'+actual_pregunta_data.audiotiempo+'.mp3'
                        }
                        
                        audio_general_mp3.load()
                        audio_general_mp3.onloadedmetadata = function(){
                            audio_general_mp3.currentTime = 0
                            audio_general_mp3.play()
                    
                            showPresentadora('habla')
                            getE('presentadora').classList.add('presentadora-intro')
                            spdPlayMovieclip({frame:1,stop:0,loop:true},3)
                        }
                        audio_general_mp3.onended = function(){
                            audio_general_mp3.onloadedmetadata = null
                            audio_general_mp3.onended = null
        
                            spdStopMovieclip(3)
                            spdSetMovieclip({id:3,f:1})
                            showPresentadora('desprepara')
                            getE('presentadora').classList.add('presentadora-intro')
                            
                            spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                                alert("siguiente")
                                //getE('presentadora').classList.add('presentadora-gone')
                                //puff_mp3.play()
                            }},2)
                        }
                    /*}else{
                        alert("No audio")
                    }*/
                }
            }},1)

            //getE('presentadora').classList.remove('presentadora-out')
            //getE('presentadora').classList.add('presentadora-in')
            //puff_mp3.play()

            //animacion_entrada_presentadora = setTimeout(function(){
                //clearTimeout(animacion_entrada_presentadora)
                //animacion_entrada_presentadora = null


            //},1000)
        }
    )
}

function timeUp(){
    clickResponde()
    perderPregunta(false)
}

var animacion_tablero_puntos = null

var puntajes = [0,0,0]

function sumarPuntosTablero(datos){
    var scores = []
    console.log(puntajes)
    for(i = 0;i<datos.length;i++){
        
        puntajes[datos[i].p-1] = puntajes[datos[i].p-1]+datos.s
        console.log(puntajes[datos[i].p-1])

        var col = getE('tablero-score-'+datos[i].p)
        var score_txt = col.getElementsByTagName('h6')[0]
        score_txt.innerHTML = puntajes[datos[i].p-1]
        score_txt.classList.add('tablero-score-active')
        scores.push(score_txt)
    }

    getE('tablero-brillo').className = 'tablero-brillo-on'
    animacion_tablero_puntos = setTimeout(function(){
        clearTimeout(animacion_tablero_puntos)
        animacion_tablero_puntos = null

        for(i = 0;i<scores.length;i++){
            scores[i].classList.remove('tablero-score-active')
        }
    },1000)
}

/*audio_general_mp3 = new Audio()
audio_general_mp3.onloadedmetadata = null
audio_general_mp3.src = 'assets/media/juego/introduccion.mp3'
audio_general_mp3.load()
audio_general_mp3.onloadedmetadata = function(){
    audio_general_mp3.onloadedmetadata = null
    audio_general_mp3.currentTime = 0
    audio_general_mp3.play()
}*/
