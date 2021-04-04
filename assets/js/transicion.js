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
    
                animacion_transicion = setTimeout(function(){
                    clearTimeout(animacion_transicion)
                    animacion_transicion = null
    
                    getE('transicion').className = "transicion-on-2"
    
                    animacion_transicion = setTimeout(function(){
                        clearTimeout(animacion_transicion)
                        animacion_transicion = null
    
                        getE('transicion').className = "transicion-out"
                        prepare()
    
                        animacion_transicion = setTimeout(function(){
                            clearTimeout(animacion_transicion)
                            animacion_transicion = null
    
                            getE('transicion').className = "transicion-off"
                            getE('transcicion-titulo1').classList.remove('transicion-titulo1-on')
                            getE('transcicion-titulo2').classList.remove('transicion-titulo2-on')
                            getE('transcicion-titulo3').classList.remove('transicion-titulo3-on')
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

/***********************CORTINA*******************/

var cortina_colors = ['00b7e8','5ebe30','ff9c00','004492','ad3094','364d68','00929b']
var animacion_cortina_titulo_span = null
function setCortina(data,prepare,callBack){
    var titulo = data.title
    var titulo_array = titulo.split("")

    var spans = ""
    for(i = 0;i<titulo_array.length;i++){
        spans+='<span class="cortina-titulo-span cortina-titulo-span-init">'
            spans+='<span class="cortina-titulo-span-1" style="color:#'+cortina_colors[getRand(0,(cortina_colors.length-1))]+'">'+titulo_array[i]+'</span>'
        spans+='</span>'
    }
    getE('cortina-titulo').innerHTML = spans
    
    var spans_array = getE('cortina-titulo').getElementsByClassName('cortina-titulo-span')
    var s = 0

    animacion_cortina = setTimeout(function(){
        clearTimeout(animacion_cortina)
        animacion_cortina = null

        animacion_cortina_titulo_span = setInterval(function(){
            if(s==spans_array.length){
                clearInterval(animacion_cortina_titulo_span)
                animacion_cortina_titulo_span = null
    
                animacion_cortina = setTimeout(function(){
                    clearTimeout(animacion_cortina)
                    animacion_cortina = null

                    unsetCortina(prepare,callBack)
                },1000)            
            }else{
                spans_array[s].classList.remove('cortina-titulo-span-init')
                spans_array[s].classList.add('cortina-titulo-span-in')
                spans_array[s].classList.add('cortina-titulo-span-ining')
                s++
            }
        },50)
    },20)
    
    getE('cortina').className = "cortina-on"
    getE('cortina-titulo').className = 'cortina-titulo-on'
}

function unsetCortina(prepare,callBack){
    getE('cortina-fondo').className = 'cortina-fondo-on'
    animacion_cortina = setTimeout(function(){
        clearTimeout(animacion_cortina)
        animacion_cortina = null

        prepare()
        getE('cortina-fondo').className = 'cortina-fondo-off'
        getE('cortina-titulo').className = 'cortina-titulo-off'

        animacion_cortina = setTimeout(function(){
            clearTimeout(animacion_cortina)
            animacion_cortina = null
    
            getE('cortina').className = 'cortina-off'
            callBack()
        },500)
    },500)
}

var animacion_cortina = null