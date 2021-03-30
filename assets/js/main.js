var audio_general_mp3 = null

function clickComenzar(){
    getE('welcome-page').className = 'welcome-page-off'

    turnTvOn(function(){
        getE('inicio').className = 'video-on'
        getE('video-inicio').play()
        getE('video-inicio').onended = function(){
            setTransition({title:'Comencemos'}, function(){
                getE('inicio').innerHTML = ''
                getE('inicio').style.display = 'none'

                getE('intro').className = 'video-on'
                getE('video-intro').play()
                getE('luces').className = 'luces-on'

                showPresentadora('habla')
                spdPlayMovieclip({frame:1,stop:0,loop:true},3)

                intro_mp3.play()
                getE('video-intro').onended = function(){
                    getE('video-intro').currentTime = 0
                    getE('video-intro').play()
                }
                intro_aplausos_mp3.play()
                introduccion_mp3.currentTime = 0
                introduccion_mp3.play()
                introduccion_mp3.onended = function(){
                    spdStopMovieclip(3)

                }
                
            })
        }
    })
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