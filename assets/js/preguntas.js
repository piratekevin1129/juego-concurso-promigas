var actual_opcion_board = null
var actual_opcion_board_ind = -1
var actual_opcion_board_txt = ''
var rect_pieza = null
var piezas_correctos = 0

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
            if(piezas_correctos==4){
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