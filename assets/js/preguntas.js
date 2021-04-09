/*****************ARRASTRAR*************/

var actual_opcion_board = null
var actual_opcion_board_ind = -1
var actual_opcion_board_txt = ''
var rect_pieza = null
var piezas_correctos = 0
var piezas_total = 0
var piezas_completadas = []

function setJuegoArrastra(leng){
    piezas_total = leng
    piezas_completadas = []
    piezas_correctos = 0
    getE('pregunta-3-piezas').innerHTML = ''
    for(i = 0;i<piezas_total;i++){
        piezas_completadas.push(false)
    }

    var desorden = unorderArray(piezas_total)
    for(i = 0;i<desorden.length;i++){
        var div_p = document.createElement('div')
        div_p.id = 'pregunta-pieza'+desorden[i]
        div_p.setAttribute('ind',desorden[i])
        div_p.className = 'pregunta-pieza'
        div_p.innerHTML = '<p>'+actual_pregunta_data.opciones[desorden[i]]+'</p><div class="pregunta-3-zona" onmousedown="downOpcion(event,'+desorden[i]+')" onmouseover="overOpcion()" onmouseout="outOpcion()"></div>'
        getE('pregunta-3-piezas').appendChild(div_p)
    }

}

function downOpcion(event,id){
    document.body.addEventListener('mousemove',moveOpcion,true)
    document.body.addEventListener('mouseup',upOpcion,true)

    var opcion_div = getE('pregunta-pieza'+id)
    actual_opcion_board = opcion_div
    actual_opcion_board_ind = opcion_div.getAttribute('ind')
    actual_opcion_board.classList.add('pregunta-pieza-locked')

    getE('pregunta-3-pieza').className = 'pregunta-3-pieza-on'
    rect_pieza = {
        w:getE('pregunta-3-pieza').offsetWidth,
        h:getE('pregunta-3-pieza').offsetHeight
    }
    
    var posx = event.pageX
    var posy = event.pageY
    getE('pregunta-3-pieza').style.left = (posx-(rect_pieza.w/2))+'px'
    getE('pregunta-3-pieza').style.top = (posy-(rect_pieza.h/2))+'px'
    actual_opcion_board_txt = actual_opcion_board.getElementsByTagName('p')[0].innerHTML
    getE('pregunta-3-pieza').innerHTML = '<p>'+actual_opcion_board_txt+'</p>'

    //console.log("down")
    over2_mp3.play()
}

function moveOpcion(event){
    var posx = event.pageX
    var posy = event.pageY
    getE('pregunta-3-pieza').style.left = (posx-(rect_pieza.w/2))+'px'
    getE('pregunta-3-pieza').style.top = (posy-(rect_pieza.h/2))+'px'
}

function upOpcion(event){
    document.body.removeEventListener('mousemove',moveOpcion,true)
    document.body.removeEventListener('mouseup',upOpcion,true)

    var posx = event.pageX
    var posy = event.pageY

    var rects = getE('pregunta-3-boards').getElementsByClassName('pregunta-board')
    var board_selected = null
    var board_selected_ind = -1
    for(i = 0;i<rects.length;i++){
        var rect = {
            w:rects[i].offsetWidth,
            h:rects[i].offsetHeight,
            x:rects[i].getBoundingClientRect().left,
            y:rects[i].getBoundingClientRect().top
        }
        if(
            posx>rect.x&&posx<(rect.x+rect.w)&&
            posy>rect.y&&posy<(rect.y+rect.h)
        ){
            board_selected_ind = i
            board_selected = rects[i]
        }
    }

    if(board_selected!=null){
        //mirar si es correcto
        var ind = board_selected.getAttribute('ind')
        if(ind==actual_opcion_board_ind){
            piezas_completadas[ind] = true
            var p_board = board_selected.getElementsByClassName('pregunta-board-text')[0]
            p_board.innerHTML = actual_opcion_board_txt
            correct_mp3.play()
            piezas_correctos++
            actual_opcion_board.classList.remove('pregunta-pieza-locked')
            actual_opcion_board.classList.add('pregunta-pieza-used')
            if(piezas_correctos==piezas_total){
                //ganar
                actual_opcion_board.classList.remove('pregunta-pieza-locked')
                ganarJuegoArrastra()
            }
        }else{
            wrong_mp3.play()
            actual_opcion_board.classList.remove('pregunta-pieza-locked')
        }
    }else{
        actual_opcion_board.classList.remove('pregunta-pieza-locked')
    }
    
    actual_opcion_board = null
    actual_opcion_board_ind = -1
    actual_opcion_board_txt = ''
    getE('pregunta-3-pieza').className = 'pregunta-3-pieza-off'
}

function ganarJuegoArrastra(){
    actual_opcion_board.classList.remove('pregunta-pieza-locked')
    actual_opcion_board = null
    actual_opcion_board_ind = -1
    actual_opcion_board_txt = ''
    getE('pregunta-3-pieza').className = 'pregunta-3-pieza-off'

    unsetDatePrisaAnim()
    clickResponde(function(){
        ganarPregunta()
    },'correcto')
}

function perderJuegoArrastra(){
    document.body.removeEventListener('mousemove',moveOpcion,true)
    document.body.removeEventListener('mouseup',upOpcion,true)

    if(actual_opcion_board!=null){
        actual_opcion_board.className = 'pregunta-pieza'
    }
    actual_opcion_board = null
    actual_opcion_board_ind = -1
    actual_opcion_board_txt = ''
    getE('pregunta-3-pieza').className = 'pregunta-3-pieza-off'    
}

var animacion_arrastra_automatico = null
var aaa_i = 0 //animacion_arrastra_automatico
function juegoAutomaticoArrastra(){
    juegoAutomaticoArrastra2()
}

function juegoAutomaticoArrastra2(){
    //mirar si faltan
    var piezas_faltantes = false
    for(i = 0;i<piezas_completadas.length;i++){
        if(!piezas_completadas[i]){
            piezas_faltantes = true
        }
    }
    console.log(piezas_completadas)
    //console.log(piezas_faltantes)

    if(piezas_faltantes){
        if(piezas_completadas[aaa_i]==false){
            var pieza_clave = getE('pregunta-pieza'+aaa_i)
            console.log('pregunta-pieza'+aaa_i)
            var rect_pieza_clave = pieza_clave.getBoundingClientRect()
            var txt_pieza_clave = pieza_clave.getElementsByTagName('p')[0].innerHTML
            
            //acomodar esta
            getE('pregunta-3-pieza').className = 'pregunta-3-pieza-unmove'
            getE('pregunta-3-pieza').style.left = (rect_pieza_clave.left)+'px'
            getE('pregunta-3-pieza').style.top = (rect_pieza_clave.top)+'px'
            getE('pregunta-3-pieza').innerHTML = '<p>'+txt_pieza_clave+'</p>'

            pieza_clave.className = 'pregunta-pieza pregunta-pieza-used'
            animacion_arrastra_automatico = setTimeout(function(){
                clearTimeout(animacion_arrastra_automatico)
                animacion_arrastra_automatico = null
                getE('pregunta-3-pieza').className = 'pregunta-3-pieza-move'

                var espacio_clave = getE('pregunta-board-'+(aaa_i+1))
                var nuevo_rect = espacio_clave.getBoundingClientRect()
                getE('pregunta-3-pieza').style.left = (nuevo_rect.left)+'px'
                getE('pregunta-3-pieza').style.top = (nuevo_rect.top)+'px'

                animacion_arrastra_automatico = setTimeout(function(){
                    clearTimeout(animacion_arrastra_automatico)
                    animacion_arrastra_automatico = null

                    //poner texto en el espacio
                    //quitar pieza moviente
                    getE('pregunta-3-pieza').className = 'pregunta-3-pieza-unmove'
                    getE('pregunta-3-pieza').innerHTML = '<p></p>'
                    espacio_clave.getElementsByClassName('pregunta-board-text')[0].innerHTML = txt_pieza_clave
                    correct_mp3.play()

                    piezas_completadas[aaa_i] = true
                    aaa_i++
                    juegoAutomaticoArrastra2()
                },1000)
            },20)
        }else{
            aaa_i++
            juegoAutomaticoArrastra2()
        }
    }else{
        //poner btn continuar
        getE('reloj').className = 'reloj-off'
        getE('pregunta-3-btn').classList.remove('pregunta-continuar-btn-off')
        getE('pregunta-3-btn').classList.add('pregunta-continuar-btn-on')
        click_continuar_mp3.play()
    }
}


/*****************APAREAMIENTO*************/

var actual_col_a = null
var actual_col_a_raya = null
var actual_col_a_letra = null
var actual_col_a_rect = null
var actual_col_a_ind = -1
var columnas_correctos = 0
var columnas_colors = ['00b7e8','5ebe30','ff9c00','004492','ad3094','364d68','00929b']
var columnas_letras = ['A','B','C','D','E','F','G']
var columnas_total = 0

var columnas_completadas = []

function setJuegoEmparejamiento(leng){
    columnas_total = leng

    columnas_correctos = 0
    columnas_completadas = []
    getE('pregunta-4-col1').innerHTML = ''
    getE('pregunta-4-col2').innerHTML = ''
    for(i = 0;i<columnas_total;i++){
        columnas_completadas.push(false)
    }

    var desorden = unorderArray(columnas_total)
    var desorden2 = unorderArray(columnas_total)
    for(i = 0;i<desorden.length;i++){
        var col_a = document.createElement('div')
        col_a.className = 'pregunta-col-a'
        col_a.id = 'pregunta-col-a-'+desorden[i]
        col_a.setAttribute('ind',desorden[i])
        col_a.innerHTML = '<div class="pregunta-col-raya" style="background-color:#'+columnas_colors[desorden[i]]+'"></div><section class="pregunta-col-a-section-'+(desorden[i]+1)+'"></section><p>'+actual_pregunta_data.opciones[desorden[i]].opcion1+'</p><div class="pregunta-col-letter" onmouseover="overOpcion()" onmouseout="outOpcion()" onmousedown="downCol(event,'+desorden[i]+')" style="background-color:#'+columnas_colors[desorden[i]]+'">'+columnas_letras[i]+'</div>'

        getE('pregunta-4-col1').appendChild(col_a)
    }
    for(i = 0;i<desorden2.length;i++){
        var col_b = document.createElement('div')
        col_b.className = 'pregunta-col-b'
        col_b.id = 'pregunta-col-b-'+desorden2[i]
        col_b.setAttribute('ind',desorden2[i])
        col_b.innerHTML = '<p>'+actual_pregunta_data.opciones[desorden2[i]].opcion2+'</p><div class="pregunta-col-number">'+(i+1)+'</div>'

        getE('pregunta-4-col2').appendChild(col_b)
    }
}

function downCol(event,id){
    over2_mp3.play()
    actual_col_a = getE('pregunta-col-a-'+id)
    actual_col_a_raya = actual_col_a.getElementsByClassName('pregunta-col-raya')[0]
    actual_col_a_raya.style.width = '0px'
    actual_col_a_raya.style.transform = 'rotate(0deg)'
    actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
    actual_col_a_raya.style.oTransform = 'rotate(0deg)'

    actual_col_a_ind = actual_col_a.getAttribute('ind')
    actual_col_a_letra = actual_col_a.getElementsByClassName('pregunta-col-letter')[0]

    actual_col_a_rect = {
        x:(actual_col_a_letra.getBoundingClientRect().left+(actual_col_a_letra.offsetWidth/2)),
        y:(actual_col_a_letra.getBoundingClientRect().top+(actual_col_a_letra.offsetHeight/2))
    }
        
    document.body.addEventListener('mousemove', moveCol, true)
    document.body.addEventListener('mouseup', upCol, true)
}

function moveCol(event){
    var rect1 = {
        x:event.pageX,
        y:event.pageY
    }
    setRayaGeo(rect1,actual_col_a_rect)
}

function upCol(event){
    var posx = event.pageX
    var posy = event.pageY

    document.body.removeEventListener('mousemove', moveCol, true)
    document.body.removeEventListener('mouseup', upCol, true)

    var colsb = getE('pregunta-4-col2').getElementsByClassName('pregunta-col-b')
    var actual_col_b = null
    for(i = 0;i<colsb.length;i++){
        var r = {
            x:colsb[i].getBoundingClientRect().left,
            y:colsb[i].getBoundingClientRect().top,
            w:colsb[i].offsetWidth,
            h:colsb[i].offsetHeight
        }
        if(
            posx>=(r.x-30)&&posx<=(r.x+r.w)&&
            posy>=r.y&&posy<=(r.y+r.h)
        ){
            actual_col_b = colsb[i]
        }
    }

    if(actual_col_b!=null){
        var ind_b = actual_col_b.getAttribute('ind')
        var number_b = actual_col_b.getElementsByClassName('pregunta-col-number')[0]
        if(ind_b==actual_col_a_ind){
            columnas_completadas[ind_b] = true
            correct_mp3.play()
            columnas_correctos++
            actual_col_a_letra.removeAttribute('onmousedown')
            number_b.style.backgroundColor = actual_col_a_letra.style.backgroundColor
            number_b.style.color = '#FFFFFF'

            var rect3 = {
                x:(number_b.getBoundingClientRect().left+(number_b.offsetWidth/2)),
                y:(number_b.getBoundingClientRect().top+(number_b.offsetHeight/2))
            }
            setRayaGeo(rect3,actual_col_a_rect)

            //console.log(columnas_correctos,columnas_total)
            if(columnas_correctos==columnas_total){
                ganarJuegoEmparejamiento()  
            }
        }else{
            wrong_mp3.play()
            actual_col_a_raya.style.width = '0px'
            actual_col_a_raya.style.transform = 'rotate(0deg)'
            actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
            actual_col_a_raya.style.oTransform = 'rotate(0deg)'
        }
    }else{
        actual_col_a_raya.style.width = '0px'
        actual_col_a_raya.style.transform = 'rotate(0deg)'
        actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
        actual_col_a_raya.style.oTransform = 'rotate(0deg)'
    }

    actual_col_a = null
    actual_col_a_raya = null
    actual_col_a_letra = null
    actual_col_a_rect = null
    actual_col_a_ind = -1
}

function setRayaGeo(rect1,rect2,raya){
    var radians = Math.atan2((rect1.x - rect2.x), (rect1.y - rect2.y));
    var degree = (radians * (180 / Math.PI) * -1) + 90;
    
    if(raya!=null&&raya!=undefined){
        raya.style.transform = 'rotate('+degree+'deg)'
        raya.style.webkitTransform = 'rotate('+degree+'deg)'
        raya.style.oTransform = 'rotate('+degree+'deg)'    
    }else{
        actual_col_a_raya.style.transform = 'rotate('+degree+'deg)'
        actual_col_a_raya.style.webkitTransform = 'rotate('+degree+'deg)'
        actual_col_a_raya.style.oTransform = 'rotate('+degree+'deg)'
    }

    var cat1 = rect1.x-rect2.x
    var cat2 = rect1.y-rect2.y
    var hipo = Math.hypot(cat1, cat2)

    if(raya!=null&&raya!=undefined){
        raya.style.width = hipo+'px'
    }else{
        actual_col_a_raya.style.width = hipo+'px'
    }
}

function ganarJuegoEmparejamiento(){
    if(actual_col_a_raya!=null){
        actual_col_a_raya.style.width = '0px'
        actual_col_a_raya.style.transform = 'rotate(0deg)'
        actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
        actual_col_a_raya.style.oTransform = 'rotate(0deg)'
    }
    actual_col_a = null
    actual_col_a_raya = null
    actual_col_a_letra = null
    actual_col_a_rect = null
    actual_col_a_ind = -1

    unsetDatePrisaAnim()
    clickResponde(function(){
        ganarPregunta()
    },'correcto')
}

function perderJuegoEmparejamiento(){
    document.body.removeEventListener('mousemove', moveCol, true)
    document.body.removeEventListener('mouseup', upCol, true)

    if(actual_col_a_raya!=null){
        actual_col_a_raya.style.width = '0px'
        actual_col_a_raya.style.transform = 'rotate(0deg)'
        actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
        actual_col_a_raya.style.oTransform = 'rotate(0deg)'
    }

    actual_col_a = null
    actual_col_a_raya = null
    actual_col_a_letra = null
    actual_col_a_rect = null
    actual_col_a_ind = -1
}

var animacion_emparejamiento_automatico = null
var aea_i = 0 //animacion_emparejamiento_automatico
function juegoAutomaticoEmparejamiento(){
    juegoAutomaticoEmparejamiento2()
}

function juegoAutomaticoEmparejamiento2(){
    //mirar si faltan
    var columnas_faltantes = false
    for(i = 0;i<columnas_completadas.length;i++){
        if(!columnas_completadas[i]){
            columnas_faltantes = true
        }
    }
    console.log(columnas_completadas)
    //console.log(columnas_faltantes)

    if(columnas_faltantes){
        if(columnas_completadas[aea_i]==false){
            var col_clave = getE('pregunta-col-a-'+aea_i)
            console.log('pregunta-col-a-'+aea_i)
            var raya_clave = col_clave.getElementsByClassName('pregunta-col-raya')[0]
            raya_clave.style.width = '0px'
            raya_clave.style.transform = 'rotate(0deg)'
            raya_clave.style.webkitTransform = 'rotate(0deg)'
            raya_clave.style.oTransform = 'rotate(0deg)'

            var letra_clave = col_clave.getElementsByClassName('pregunta-col-letter')[0]

            var rect_letra_clave = letra_clave.getBoundingClientRect()

            var numero_clave = getE('pregunta-col-b-'+aea_i).getElementsByClassName('pregunta-col-number')[0]
            var rect_numero_clave = numero_clave.getBoundingClientRect()
            
            var rect3 = {
                x:(rect_numero_clave.left+(numero_clave.offsetWidth/2)),
                y:(rect_numero_clave.top+(numero_clave.offsetHeight/2))
            }
            var rect4 = {
                x:(rect_letra_clave.left+(letra_clave.offsetWidth/2)),
                y:rect_letra_clave.top+((letra_clave.offsetHeight/2))
            }
            raya_clave.classList.add('pregunta-col-raya-move')

            animacion_emparejamiento_automatico = setTimeout(function(){
                clearTimeout(animacion_emparejamiento_automatico)
                animacion_emparejamiento_automatico = null
                setRayaGeo(rect3,rect4,raya_clave)

                animacion_emparejamiento_automatico = setTimeout(function(){
                    clearTimeout(animacion_emparejamiento_automatico)
                    animacion_emparejamiento_automatico = null

                    //poner el numero del color
                    numero_clave.style.backgroundColor = letra_clave.style.backgroundColor
                    numero_clave.style.color = '#FFFFFF'

                    correct_mp3.play()

                    columnas_completadas[aea_i] = true
                    aea_i++
                    juegoAutomaticoEmparejamiento2()
                },1000)
            },20)
        }else{
            aea_i++
            juegoAutomaticoEmparejamiento2()
        }
    }else{
        //poner btn continuar
        getE('reloj').className = 'reloj-off'
        getE('pregunta-4-btn').classList.remove('pregunta-continuar-btn-off')
        getE('pregunta-4-btn').classList.add('pregunta-continuar-btn-on')
        click_continuar_mp3.play()
    }
}