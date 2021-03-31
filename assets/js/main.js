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
                    setParticipante(1,'quieto')
                    setParticipante(2,'quieto')
                    setParticipante(3,'quieto')

                    getE('presentadora').classList.add('presentadora-out')
                    getE('tablero').className = 'tablero-on'
                },
                function(){
                    //set
                    getE('video-intro').play()
                    getE('luces').className = 'luces-on'
                    getE('intro').className = 'video-on intro-in'
                    getE('presentadora').classList.add('presentadora-in')

                    spdPlayMovieclip({frame:1,stop:0,loop:true},7)
                    spdPlayMovieclip({frame:1,stop:0,loop:true},11)
                    spdPlayMovieclip({frame:1,stop:0,loop:true},15)

                    intro_mp3.play()
                    getE('video-intro').onended = function(){
                        getE('video-intro').currentTime = 0
                        getE('video-intro').play()
                    }
                    intro_aplausos_mp3.play()

                    animacion_entrada_presentadora = setTimeout(function(){
                        clearTimeout(animacion_entrada_presentadora)
                        animacion_entrada_presentadora = null

                        spdPlayMovieclip({frame:1,stop:0,loop:true},3)
                        introduccion_mp3.currentTime = 0
                        introduccion_mp3.play()
                        introduccion_mp3.onended = function(){
                            spdStopMovieclip(3)
                            spdSetMovieclip({id:3,f:1})

                            //parar concursantes parpadeando
                            spdStopMovieclip(7)
                            spdStopMovieclip(11)
                            spdStopMovieclip(15)

                            //se va
                            getE('intro').className = 'video-on intro-out'
                            getE('presentadora').classList.add('presentadora-gone')

                            animacion_entradas = setTimeout(function(){
                                clearTimeout(animacion_entradas)
                                animacion_entradas = null

                                setTransition({title:'¡Prepárate!'},
                                    function(){
                                        showPresentadora('prepara')
                                        getE('video-intro').currentTime = 0
                                        getE('video-intro').pause()
                                        getE('video-intro').className = 'video-intro-off'

                                        getE('fondo-intro').className = 'fondo-intro-on'
                                        getE('concursantes').className = 'concursantes-preguntas'
                                        getE('tablero-brillo').className = ''
                                    },
                                    function(){
                                        //spdPlayMovieclip({frame:1,stop:0,loop:true},7)
                                        //spdPlayMovieclip({frame:1,stop:0,loop:true},11)
                                        //spdPlayMovieclip({frame:1,stop:0,loop:true},15)

                                        //Empezar preguntas
                                        //getE('intro')
                                        empezarPreguntas()
                                    }
                                )
                            },1000)
                        }
                    },1000)
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
    spdPlayMovieclip({frame:1,stop:10,loop:false,end:function(){
        alert("ya")
        /*audio_general_mp3 = new Audio()
        audio_general_mp3.onloadedmetadata = null
        audio_general_mp3.src = 'assets/media/juego/'+(actual_pregunta+1)+'/pregunta.mp3'
        audio_general_mp3.load()
        audio_general_mp3.onloadedmetadata = function(){
            audio_general_mp3.onloadedmetadata = null
            audio_general_mp3.currentTime = 0
            audio_general_mp3.play()

            showPresentadora('habla')
            spdPlayMovieclip({frame:1,stop:0,loop:true},1)
        }
        audio_general_mp3.onended = function(){
            audio_general_mp3.onloadedmetadata = null
            audio_general_mp3.onended = null

            showPresentadora('desprepara')
            spdPlayMovieclip({frame:1,stop:0,loop:true},2)
        }*/

    }},1)
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