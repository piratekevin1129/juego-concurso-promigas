var _actual_frames = null
var _actual_callback = null
var _actual_total = null

function spdCreateMovieClip(data){
    var element = document.getElementById(data.idname)
    var width = element.getAttribute("width")
    var height = element.getAttribute("height")
    var frames = element.getAttribute("frames")
    var src = element.getAttribute("src")
    element.style.width = width+'px'
    element.style.height = height+'px'

    _actual_frames = 0
    _actual_total = frames
    _actual_callback = data.callBack

    loadFrames(data.idname,width,height,src)
}

function loadFrames(idname,w,h,src){
    for(var _i = 0;_i<_actual_total;_i++){
        var url = src+'imagen'+(_i+1)+'.png'
        loadFrame(url,idname,w,h)
    }
}

function loadFrame(url,idname,w,h){
    var image_frame = new Image()
    
    image_frame.onload = function(){
        image_frame.onload = null
        image_frame.null = null

        var initial1 = String(this.src).split("n")
        var initial2 = initial1[initial1.length-2].split(".")
        var initial = initial2[0]
        //console.log("initial:"+initial)

        var canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.className = 'canvas_fotograma'
        canvas.id = idname+'_frame_'+(initial)

        var ctx = canvas.getContext('2d')
        ctx.drawImage(this,0,0,w,h)

        var object = document.getElementById(idname)
        object.appendChild(canvas)
        
        image_frame = null
        
        _actual_frames++
        if(_actual_frames>=_actual_total){
            for(var f = 2;f<=_actual_frames;f++){
                var canvas_id = document.getElementById(idname+'_frame_'+f)
                canvas_id.style.visibility = 'hidden'
            }
            _actual_callback()
        }
    }
    image_frame.onerror = function(){
        console.log("error cargando el fotograma : "+url)
        image_frame.onload = null
        image_frame.null = null
        
        image_frame = null

        /*_actual_frames++
        if(_actual_frames=>_actual_total){
            for(var f = 2;f<=_actual_frames;f++){
                var canvas_id = document.getElementById(idname+'_frame_'+f)
                canvas_id.style.visibility = 'hidden'
            }
            _actual_callback()
        }*/
    }
    image_frame.src = url
}

function setFotograma(fotograma,moviename){
    var object = document.getElementById(moviename)
    var fotogramas = object.getElementsByTagName('canvas')
    for(var f = 0;f<fotogramas.length;f++){
        var foto = fotogramas[f]
        foto.style.visibility = 'hidden'
    }
    var canvas_foto = document.getElementById(moviename+'_frame_'+fotograma)
    canvas_foto.style.visibility = 'visible'
    
}

var movieclips = []

function spdCreateMovieClipAnimation(data){
    var movieclip = document.getElementById(data.moviename)
    total_frames = 0
    if(movieclip!=null){
        total_frames = movieclip.getElementsByTagName('canvas').length
    }
    
    movieclips.push({
        animation:null,
        id:data.id,
        moviename:data.moviename,
        frame:1,
        total:total_frames
    })
}

function spdStopMovieclip(id){
    clearInterval(movieclips[id].animation)
    movieclips[id].animation = null
}

function spdPlayMovieclip(data,id){
    if(movieclips[id].animation!=null){
        clearInterval(movieclips[id].animation)
        movieclips[id] = null
    }

    if(data.frame!=0){
        movieclips[id].frame = data.frame
    }else{
        if(movieclips[id].frame==null||movieclips[id].frame==undefined){
            movieclips[id].frame = 1
        }
    }
    
    setFotograma(movieclips[id].frame,movieclips[id].moviename)

    movieclips[id].animation = setInterval(function(){
        var nuevo_frame = movieclips[id].frame+1
        if(nuevo_frame>movieclips[id].total){
            //mirar loop
            if(data.loop){
                nuevo_frame = 1
                movieclips[id].frame = nuevo_frame
                setFotograma(nuevo_frame,movieclips[id].moviename)
            }else{
                clearInterval(movieclips[id].animation)
                movieclips[id].animation = null
                //mirar callback
            }
        }else{
            if(data.stop==nuevo_frame){
                movieclips[id].frame = nuevo_frame
                setFotograma(nuevo_frame,movieclips[id].moviename)
                clearInterval(movieclips[id].animation)
                movieclips[id].animation = null
                //mirar callback
                if(data.end!=null&&data.end!=undefined){
                    data.end()
                }
            }else{
                movieclips[id].frame = nuevo_frame
                setFotograma(nuevo_frame,movieclips[id].moviename)
            }
        }
    },50)
}

function spdSetMovieclip(data){
    var id = data.id
    movieclips[id].frame = data.f
    setFotograma(movieclips[id].frame,movieclips[id].moviename)
}