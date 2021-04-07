var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function unorderArray(lengt){
    var array = []
    while(array.length<lengt){
        var r = getRand(0,(lengt-1))
        if(!array.includes(r)){
            array.push(r)
        }
    }
    return array
}

function getE(idname){
    return document.getElementById(idname)
}

function loadAudio(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        data.callBack(null)
    })
}

function loadImage(data){
    var img = new Image()
    img.onload = function(){
        img.onload = null
        img.onerror = null
        img = null
        
        data.callBack({src:this.src,width:this.width,height:this.height})
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        img = null
        console.log("error: "+data.url)
        data.callBack(this)
    }
    img.src = data.url
}

window.onresize = function(){
    
}