var partes_transicion = []

function prepareTransition(){
    var f = 10
    var c = 10

    for(i = 0;i<c;i++){
        var col = document.createElement('div')
        col.className = 'transicion-fondo-col'

        var col2 = document.createElement('div')
        col2.className = 'transicion-fondo-col'

        for(j = 0;j<f;j++){
            var dot = document.createElement('div')
            dot.className = 'transicion-fondo-dot transicion-fondo-dot-l'+getRand(1,10)

            var dot2 = document.createElement('div')
            dot2.className = 'transicion-fondo-dot transicion-fondo-dot-l'+getRand(1,10)

            col.appendChild(dot)
            col2.appendChild(dot2)
        }
        getE('transicion-fondo-dots-1').appendChild(col)
        getE('transicion-fondo-dots-2').appendChild(col2)
    }
}

var animacion_transition_dots = null
var animacion_transition_titulo_span = null
function setTransition(data,prepare,callBack){
    var titulo = data.title
    var titulo_array = titulo.split("")

    var spans = ""
    for(i = 0;i<titulo_array.length;i++){
        if(titulo_array[i]==" "){
            spans+='<span class="transicion-titulo-span transicion-titulo-span-init transicion-titulo-span-space">-</span>'
        }else{
            spans+='<span class="transicion-titulo-span transicion-titulo-span-init">'
                spans+='<span class="transicion-titulo-span-2">'+titulo_array[i]+'</span>'
                spans+='<span class="transicion-titulo-span-1">'+titulo_array[i]+'</span>'
            spans+='</span>'
        }
    }
    getE('transcicion-titulo1').innerHTML = spans
    getE('transcicion-titulo2').innerHTML = titulo
    getE('transcicion-titulo3').innerHTML = titulo

    var spans_array = getE('transcicion-titulo1').getElementsByClassName('transicion-titulo-span')
    var s = 0

    animacion_transicion = setTimeout(function(){
        clearTimeout(animacion_transicion)
        animacion_transicion = null

        animacion_transition_titulo_span = setInterval(function(){
            if(s==spans_array.length){
                clearInterval(animacion_transition_titulo_span)
                animacion_transition_titulo_span = null
    
                animacion_transition_titulo_span = setTimeout(function(){
                    clearTimeout(animacion_transition_titulo_span)
                    animacion_transition_titulo_span = null
    
                    getE('transicion').className = "transicion-on-2"
    
                    animacion_transition_titulo_span = setTimeout(function(){
                        clearTimeout(animacion_transition_titulo_span)
                        animacion_transition_titulo_span = null
    
                        getE('transicion').className = "transicion-out"
                        prepare()
    
                        animacion_transition_titulo_span = setTimeout(function(){
                            clearTimeout(animacion_transition_titulo_span)
                            animacion_transition_titulo_span = null
    
                            getE('transicion').className = "transicion-off"
                            callBack()
                        },1000)
                    },2000)
                },1000)
            }else{
                spans_array[s].classList.remove('transicion-titulo-span-init')
                spans_array[s].classList.add('transicion-titulo-span-in')
                spans_array[s].classList.add('transicion-titulo-span-ining')
                s++
            }
        },100)
    },500)
    
    getE('transcicion-titulo1').className = 'transicion-titulo1-on'
    getE('transcicion-titulo2').className = 'transicion-titulo2-on'
    getE('transcicion-titulo3').className = 'transicion-titulo3-on'
    getE('transicion').className = "transicion-on"
    transicion_mp3.currentTime = 0
    transicion_mp3.play()
}

var animacion_transicion = null