/*****************ARRASTRAR*************/

var actual_opcion_board = null
var actual_opcion_board_ind = -1
var actual_opcion_board_txt = ''
var rect_pieza = null
var piezas_correctos = 0
var piezas_total = 0

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
            board_selected = rects[i]
        }
    }

    if(board_selected!=null){
        //mirar si es correcto
        var ind = board_selected.getAttribute('ind')
        if(ind==actual_opcion_board_ind){
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
    clickResponde()
    ganarPregunta()
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

function setRayaGeo(rect1,rect2){
    var radians = Math.atan2((rect1.x - rect2.x), (rect1.y - rect2.y));
    var degree = (radians * (180 / Math.PI) * -1) + 90;
    
    actual_col_a_raya.style.transform = 'rotate('+degree+'deg)'
    actual_col_a_raya.style.webkitTransform = 'rotate('+degree+'deg)'
    actual_col_a_raya.style.oTransform = 'rotate('+degree+'deg)'

    var cat1 = rect1.x-rect2.x
    var cat2 = rect1.y-rect2.y
    var hipo = Math.hypot(cat1, cat2)
    actual_col_a_raya.style.width = hipo+'px'
}

function ganarJuegoEmparejamiento(){
    actual_col_a = null
    actual_col_a_raya = null
    actual_col_a_letra = null
    actual_col_a_rect = null
    actual_col_a_ind = -1

    unsetDatePrisaAnim()
    clickResponde()
    ganarPregunta()
}