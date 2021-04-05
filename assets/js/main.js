var audio_general_mp3 = null
var animacion_entradas = null

function clickComenzar2(){
    getE('welcome-page').className = 'welcome-page-off'
    turnTvOn(function(){
    })
}

function clickComenzar(){
    //getE('welcome-page').className = 'welcome-page-off'

    turnTvOn(function(){
        getE('inicio').className = 'video-on'
        getE('video-inicio').play()
        getE('video-inicio').onended = function(){
            setTransition({title:'Vamos a comenzar'},
                function(){
                    //prepare
                    //tumbar video para que no estorbe
                    var source = getE('video-inicio')
                    source.src = ''

                    getE('inicio').innerHTML = ''
                    getE('inicio').className = 'video-off'

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

                        preparePregunta('¡Prepárate!')
                    }
                }
            )
        }
    })
}

function preparePregunta(title){
    //se va
    getE('intro').className = 'video-on intro-out'
    animacion_entradas = setTimeout(function(){
        clearTimeout(animacion_entradas)
        animacion_entradas = null

        continuePregunta(title)
    },1000)
}

function continuePregunta(title){
    setTransition({title:title},
        function(){
            //resetear animaciones de concursantes tristes y felices
            resetParticipantes()
            resetPresentadora()

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
            getE('tablero-score-1').className = ''
            getE('tablero-score-2').className = ''
            getE('tablero-score-3').className = ''

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
}

var actual_pregunta = 0
var actual_pregunta_data = null
var animacion_pregunta = null

function empezarPreguntas(){
    actual_pregunta_data = data_preguntas[actual_pregunta]
    //alert("empezar preguntas")

    audio_general_mp3 = new Audio()
    audio_general_mp3.src = 'assets/media/juego/'+actual_pregunta_data.id+'/'+actual_pregunta_data.preguntaaudio+'.mp3'
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

                var zonas = []
                if(actual_pregunta_data.tipo=='verdaderofalso'){
                    getE('pregunta-1-enunciado').innerHTML = actual_pregunta_data.pregunta
                    getE('pregunta-1-opcion0').getElementsByClassName('pregunta-1-opcion-txt')[0].innerHTML = '<p>'+actual_pregunta_data.opciones[0]+'</p>'
                    getE('pregunta-1-opcion1').getElementsByClassName('pregunta-1-opcion-txt')[0].innerHTML = '<p>'+actual_pregunta_data.opciones[1]+'</p>'

                    getE('pregunta-cont-1').className = 'pregunta-cont-1-in'
                    zonas = getE('pregunta-cont-1').getElementsByClassName('pregunta-1-zona')
                    for(i = 0;i<zonas.length;i++){
                        zonas[i].setAttribute('onclick','clickOpcion('+(i+1)+')')
                        zonas[i].setAttribute('onmouseover','overOpcion()')
                        zonas[i].setAttribute('onmouseout','outOpcion()')
                    }

                    setParticipante(1,'piensa')
                    setParticipante(2,'piensa')
                    setParticipante(3,'piensa')

                    participantePensar(5)

                    animacion_pregunta = setTimeout(function(){
                        clearTimeout(animacion_pregunta)
                        animacion_pregunta = null

                        getE('pregunta-1-opciones').className = 'preguntas-1-opciones-front'
                    },1000)

                }
                else if(actual_pregunta_data.tipo=='seleccionmultiple'){
                    getE('pregunta-2-enunciado').innerHTML = actual_pregunta_data.pregunta
                    getE('pregunta-2-opcion0').getElementsByClassName('pregunta-2-opcion-txt')[0].innerHTML = actual_pregunta_data.opciones[0]
                    getE('pregunta-2-opcion1').getElementsByClassName('pregunta-2-opcion-txt')[0].innerHTML = actual_pregunta_data.opciones[1]
                    getE('pregunta-2-opcion2').getElementsByClassName('pregunta-2-opcion-txt')[0].innerHTML = actual_pregunta_data.opciones[2]
                    getE('pregunta-2-opcion3').getElementsByClassName('pregunta-2-opcion-txt')[0].innerHTML = actual_pregunta_data.opciones[3]
                    
                    getE('pregunta-cont-2').className = 'pregunta-cont-2-in'
                    zonas = getE('pregunta-cont-2').getElementsByClassName('pregunta-2-zona')
                    for(i = 0;i<zonas.length;i++){
                        zonas[i].setAttribute('onclick','clickOpcion('+(i+1)+')')
                        zonas[i].setAttribute('onmouseover','overOpcion()')
                        zonas[i].setAttribute('onmouseout','outOpcion()')
                    }

                    getE('participante-alterno').className = 'participante-on'
                    participantePensar(17)

                    animacion_pregunta = setTimeout(function(){
                        clearTimeout(animacion_pregunta)
                        animacion_pregunta = null

                        getE('pregunta-cont-2').className = 'pregunta-cont-2-on'
                        getE('pregunta-2-opciones').className = 'preguntas-2-opciones-front'
                    },500)
                    
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
    var o = zona

    unsetDatePrisaAnim()
    clickResponde()
    
    if(o==actual_pregunta_data.correcta){  
        ganarPregunta()
    }else{
        perderPregunta(true)
    }
}

var respuesta_bot = 0

function clickResponde(){
    //click_mp3.play()
    
    //parar presentadora parpadea
    stopPresentadoraQuieta()

    stopTimer()
    var zonas = []
    if(actual_pregunta_data.tipo=='verdaderofalso'){
        zonas = getE('pregunta-cont-1').getElementsByTagName('pregunta-1-opcion')
        for(i = 0;i<zonas.length;i++){
            zonas[i].removeAttribute('onclick')
            zonas[i].removeAttribute('onmouseover')
            zonas[i].removeAttribute('onmouseout')
        }
        getE('pregunta-1-opciones').className = ''
        getE('pregunta-cont-1').className = 'pregunta-cont-1-out'

        stopParticipantePensar(5)
        //spdStopMovieclip(9)
        //spdStopMovieclip(13)
    }else{
        zonas = getE('pregunta-cont-2').getElementsByTagName('pregunta-2-opcion')
        for(i = 0;i<zonas.length;i++){
            zonas[i].removeAttribute('onclick')
            zonas[i].removeAttribute('onmouseover')
            zonas[i].removeAttribute('onmouseout')
        }
        getE('pregunta-2-opciones').className = ''
        getE('pregunta-cont-2').className = 'pregunta-cont-2-out'

        stopParticipantePensar(17)
        //spdStopMovieclip(9)
        //spdStopMovieclip(13)
    }
    
    suspenso_mp3.pause()
    suspenso_mp3.onended = null
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
                audio_general_mp3.src = 'assets/media/juego/'+actual_pregunta_data.id+'/'+actual_pregunta_data.audiocorrect+'.mp3'
                audio_general_mp3.load()
                audio_general_mp3.onloadedmetadata = function(){
                    spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                        audio_general_mp3.currentTime = 0
                        audio_general_mp3.play()
                
                        showPresentadora('habla')
                        getE('presentadora').classList.add('presentadora-intro')
                        spdPlayMovieclip({frame:1,stop:0,loop:true},3)
                        susurros_mp3.play()
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
                        nextPregunta()
                        //getE('presentadora').classList.add('presentadora-gone')
                        //puff_mp3.play()
                    }},2)
                }
            //}
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
                            audio_general_mp3.src = 'assets/media/juego/'+actual_pregunta_data.id+'/'+actual_pregunta_data.audioincorrect+'.mp3'
                        }else{
                            audio_general_mp3.src = 'assets/media/juego/'+actual_pregunta_data.id+'/'+actual_pregunta_data.audiotiempo+'.mp3'
                        }
                        
                        audio_general_mp3.load()
                        audio_general_mp3.onloadedmetadata = function(){
                            audio_general_mp3.currentTime = 0
                            audio_general_mp3.play()
                    
                            showPresentadora('habla')
                            getE('presentadora').classList.add('presentadora-intro')
                            spdPlayMovieclip({frame:1,stop:0,loop:true},3)
                            susurros_mp3.play()
                        }
                        audio_general_mp3.onended = function(){
                            audio_general_mp3.onloadedmetadata = null
                            audio_general_mp3.onended = null
        
                            spdStopMovieclip(3)
                            spdSetMovieclip({id:3,f:1})
                            showPresentadora('desprepara')
                            getE('presentadora').classList.add('presentadora-intro')
                            
                            spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                                nextPregunta()
                                //getE('presentadora').classList.add('presentadora-gone')
                                //puff_mp3.play()
                            }},2)
                        }
                    /*}else{
                        alert("No audio")
                    }*/
                }
            }},1)
        }
    )
}

function nextPregunta(){
    susurros_mp3.pause()
    susurros_mp3.currentTime = 0
    actual_pregunta++
    if(actual_pregunta==4){
        //comercial

        //se va
        getE('intro').className = 'video-on intro-out'
        animacion_entradas = setTimeout(function(){
            clearTimeout(animacion_entradas)
            animacion_entradas = null

            setTransition({title:'¡Ya regresamos!'},
                function(){
                    //resetear animaciones de concursantes tristes y felices
                    resetParticipantes()
                    resetPresentadora()

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
                    getE('tablero-score-1').className = ''
                    getE('tablero-score-2').className = ''
                    getE('tablero-score-3').className = ''

                    getE('intro').className = 'video-on intro-center'
                    getE('fondo-intro').className = 'fondo-intro-on'
                    getE('tablero').className = 'tablero-off'
                    getE('tablero-brillo').className = ''
                    
                    getE('comercial').className = 'video-on'
                },
                function(){
                    getE('video-comercial').src = 'assets/media/comercial.mp4'
                    getE('video-comercial').addEventListener('loadedmetadata',setVideoComercial,true)
                    //getE('video-comercial').addEventListener('loaded',setVideoComercial,true)
                    //getE('video-comercial').addEventListener('loadeddata',setVideoComercial,true)
                    //getE('video-comercial').addEventListener('error',function(){alert("error")},true)
                    getE('video-comercial').load()
                }
            )
        },1000)
    }else{
        if(actual_pregunta==data_preguntas.length){
            loadFinal()
        }else{
            preparePregunta('Siguiente Pregunta')
        }
    }
}
function setVideoComercial(e){
    getE('video-comercial').removeEventListener('loadedmetadata',setVideoComercial,true)
    getE('video-comercial').play()                
    getE('video-comercial').onended = function(){
        getE('video-comercial').onloadedmetadata = null
        getE('video-comercial').onended = null
        //tumbar video para que no estorbe
        var source = getE('video-comercial')
        source.src = ''

        getE('comercial').innerHTML = ''
        getE('comercial').className = 'video-off'
        continuePregunta('Siguiente Pregunta')
    }
}

function setDatePrisaAnim(){
    showPresentadora('prepara')
    getE('presentadora').classList.add('presentadora-big')
    spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
        dateprisa_mp3.currentTime = 0
        dateprisa_mp3.play()

        showPresentadora('habla')
        getE('presentadora').classList.add('presentadora-big')
        spdPlayMovieclip({frame:1,stop:0,loop:true},3)

        dateprisa_mp3.onended = function(){
            spdStopMovieclip(3)
            spdSetMovieclip({id:3,f:1})
            showPresentadora('desprepara')
            getE('presentadora').classList.add('presentadora-big')
            
            spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){

            }},2)
        }
    }},1)
}
function unsetDatePrisaAnim(){
    //parar animacion de date prisa
    spdStopMovieclip(1)
    spdSetMovieclip({id:1,f:1})
    spdStopMovieclip(2)
    spdSetMovieclip({id:2,f:1})
    spdStopMovieclip(3)
    spdSetMovieclip({id:3,f:1})
    dateprisa_mp3.pause()
    dateprisa_mp3.onended = null
}

function timeUp(){
    clickResponde()
    perderPregunta(false)
}

var animacion_tablero_puntos = null

var puntajes = [0,0,0]

function sumarPuntosTablero(datos){
    console.log(puntajes)
    for(i = 0;i<datos.length;i++){
        var new_score = puntajes[datos[i].p-1]+datos[i].s
        puntajes[datos[i].p-1] = new_score
        console.log(puntajes[datos[i].p-1])

        var score_txt = getE('tablero-score-'+datos[i].p)
        score_txt.innerHTML = new_score
        score_txt.className = 'tablero-score-active'
    }

    getE('tablero-brillo').className = 'tablero-brillo-on'
}

var menor = 0
var menor_ind = 0
var mayor = 0
var mayor_ind = 0
var mitad = 0
var mitad_ind = 0

function loadFinal(){
    //hola
    //se va
    getE('intro').className = 'video-on intro-out'
    animacion_entradas = setTimeout(function(){
        clearTimeout(animacion_entradas)
        animacion_entradas = null

        setTransition({title:'Hemos terminado'},
            function(){
                //resetear animaciones de concursantes tristes y felices
                resetParticipantes()
                resetPresentadora()
    
                showPresentadora('prepara')
                //getE('concursantes').className = 'concursantes-big'
                //getE('presentadora').classList.add('presentadora-big')
                getE('concursantes').className = 'concursantes-off'
                getE('presentadora').classList.add('presentadora-final')
    
                getE('intro').className = 'video-on intro-out'
                getE('video-intro').className = 'video-on'
                getE('fondo-intro').className = 'fondo-intro-off'
                getE('video-intro').play()
                getE('video-intro').onended = function(){
                    getE('video-intro').currentTime = 0
                    getE('video-intro').play()
                }
                intro_aplausos_mp3.currentTime = 0
                intro_aplausos_mp3.play()
                intro_aplausos_mp3.onended = function(){
                    intro_aplausos_mp3.currentTime = 0
                    intro_aplausos_mp3.play()
                }
                underground_mp3.currentTime = 0
                underground_mp3.play()
                underground_mp3.onended = function(){
                    underground_mp3.currentTime = 0
                    underground_mp3.play()
                }

                getE('trofeo').className = 'trofeo-intro'
                getE('tablero-score-1').className = ''
                getE('tablero-score-2').className = ''
                getE('tablero-score-3').className = ''
                getE('tablero').className = 'tablero-on'
                getE('reloj').className = 'reloj-off'
                                
                getE('podio').className = 'podio-on'

                menor = puntajes[0]
                menor_ind = 0
                mayor = 0
                mayor_ind = 0
                mitad = 0
                mitad_ind = 0

                for(i = 0;i<puntajes.length;i++){
                    if(puntajes[i]<=menor){
                        menor = puntajes[i]
                        menor_ind = i
                    }
                }
                for(i = 0;i<puntajes.length;i++){
                    if(i!=menor_ind){
                        if(puntajes[i]>=mayor){
                            mayor = puntajes[i]
                            mayor_ind = i
                        }
                    }
                }
                for(i = 0;i<puntajes.length;i++){
                    var esta = false
                    if(i!=menor_ind&&i!=mayor_ind){
                        mitad = puntajes[i]
                        mitad_ind = i
                    }
                }
                getE('p'+(mayor_ind+1)+'-celebra').classList.add('podio-pos1')
                getE('p'+(mitad_ind+1)+'-celebra').classList.add('podio-pos2')
                getE('p'+(menor_ind+1)+'-celebra').classList.add('podio-pos3')
            },
            function(){
                getE('intro').className = 'video-on intro-in'

                spdPlayMovieclip({frame:1,stop:0,loop:true},(18+mayor_ind))

                showPresentadora('prepara')
                getE('presentadora').classList.add('presentadora-final')
                spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                    final_mp3.currentTime = 0
                    final_mp3.play()

                    showPresentadora('habla')
                    getE('presentadora').classList.add('presentadora-final')
                    spdPlayMovieclip({frame:1,stop:0,loop:true},3)

                    final_mp3.onended = function(){
                        spdStopMovieclip(3)
                        spdSetMovieclip({id:3,f:1})
                        showPresentadora('desprepara')
                        getE('presentadora').classList.add('presentadora-final')
                        
                        spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
                            showPresentadora('feliz')
                            getE('presentadora').classList.add('presentadora-final')
                            spdPlayMovieclip({frame:1,stop:50,loop:false,end:function(){

                                setCortina({title:'¡Chao Chao!'},
                                    function(){
                                        //prepare
                                        
                                        getE('video-intro').pause()
                                        getE('video-intro').onended = null
                                        
                                        intro_aplausos_mp3.pause()
                                        intro_aplausos_mp3.onended = null
                                        underground_mp3.pause()
                                        underground_mp3.onended = null

                                        getE('tablero-brillo').className = 'tablero-off'

                                        spdStopMovieclip(0)
                                        spdSetMovieclip({id:0,f:1})
                                        showPresentadora('quieta')
                                        getE('presentadora').classList.add('presentadora-final')

                                        var mayor_mc = 18+mayor_ind
                                        spdStopMovieclip(mayor_mc)
                                        spdSetMovieclip({id:mayor_mc,f:1})

                                    },
                                    function(){
                                        //callback
                                        console.log("finish")
                                    }
                                )
                            }},0)
                        }},2)
                    }
                }},1)
            }
        )
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
