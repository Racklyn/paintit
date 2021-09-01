var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// var cursor = document.getElementById('cursor')
var canvasContainer = document.getElementById('canvas-container')


var colors = [
            '#F00', "#00F", "#0F0", "#FF0", "#0FF", "#F0F", "#F70", "#CCC", "#777", "#FC9",
            '#F07', "#34F", "#051", "#FB0", "#39B", "#80A", "#520", "#000", "#222", "#FFF"
            ]

var userColors = [
                "#FFF","#FFF","#FFF",
                "#FFF","#FFF","#FFF"
                ]    
var userColorSelectedID = -1

var screenColor = '#FFF'

var eraser = {isActivated: false, size: 10}

var obj = {x: 200, y: 200, radius: 4, color: colors[17]}
var previousPos = {x: 200, y: 200}
var usePrevious = false

var config = {step: 1}
var mouseDown = false

function clear() {
    ctx.fillStyle = screenColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}


canvasContainer.addEventListener("mousedown", e => {
    mouseDown = true
    // console.log("Canva")
    draw()
})
// cursor.addEventListener("mouseleave", e => {
    
// })


document.addEventListener("mouseup", e =>{
    mouseDown = false
    usePrevious = false
})
document.addEventListener("mouseout", e =>{
    usePrevious = false
})

canvas.addEventListener("mousemove", e => {
    obj.x = e.offsetX
    obj.y = e.offsetY

    // console.log(obj.x)
    // Desenhando cursor:
    // cursor.style = `top: ${obj.y - (eraser.size/2)}px; left: ${obj.x - (eraser.size/2)}px`

    // cursor.style = `top: ${obj.y - (obj.radius+30)}px; left: ${obj.x - (obj.radius+30)}px; border-color: ${obj.color};
    //                 border-radius: 50%; height: ${obj.radius*2}px; width: ${obj.radius*2}px`

    // if(eraser.isActivated){
    //     cursor.style = `top: ${obj.y - 25}px; left: ${obj.x - 25}px; border-color: #000;
    //                 border-width: 1px; height: 30px; width: 30px; background-color: ${screenColor}`
    // }
    
    // obj.x -= (obj.radius+30)
    // obj.y -= (obj.radius+30)

    draw()
})


function draw() {

    // console.log(obj.x, obj.y)


    
    if (mouseDown){

        if (!eraser.isActivated){ // DESENHANDO ###########

            ctx.fillStyle = obj.color
            
            if (usePrevious){
                // Desenhando linha entre pontos (compensar atraso)
                ctx.lineWidth = obj.radius * 2
                ctx.strokeStyle = obj.color
                ctx.beginPath()
                ctx.moveTo(previousPos.x, previousPos.y)
                ctx.lineTo(obj.x, obj.y)
                ctx.stroke()
            }
            
            // Desenhando ponto
            let circle = new Path2D()
            circle.arc(obj.x, obj.y, obj.radius, 0, 2* Math.PI)
            ctx.fill(circle)

        }else{    // BORRACHA ###########################

            ctx.fillStyle = screenColor
            
            if (usePrevious){
                // Desenhando linha entre pontos (compensar atraso)
                ctx.lineWidth = eraser.size
                ctx.strokeStyle = screenColor
                ctx.beginPath()
                ctx.moveTo(previousPos.x, previousPos.y)
                ctx.lineTo(obj.x, obj.y)
                ctx.stroke()
            }
            
            // Desenhando borracha
            ctx.fillRect(obj.x - (eraser.size/2), obj.y - (eraser.size/2), 
                        eraser.size, eraser.size)

        }


        // Salvando última posição do cursor
        previousPos.x = obj.x
        previousPos.y = obj.y

        usePrevious = true
    }
    else{
        usePrevious = false
    }



}

clear()

// setInterval(draw, 20)
