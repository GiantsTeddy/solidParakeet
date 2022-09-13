//Sole Developer: Aiden J

const c = document.getElementById("canvas")
const clueboard = document.getElementById("mySection")
const ctx = c.getContext("2d")

c.width = (window.innerWidth-7) * .8
c.height = (window.innerHeight-7)

clueboard.width = (window.innerWidth-7) * .2
clueboard.height = (window.innerHeight-7)

function image(x, y, w, h, src){
  var kid = document.createElement("IMG")
  kid.style.height = x
  kid.style.width = y
  kid.src = src
  ctx.drawImage(kid, x, y, w, h)
  kid.remove()
}

class Hitbox{
  constructor(x, y, w, h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  show(){
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  detectCollision(obj){
    
    //console.log(`(${this.x} <= ${obj.x} && ${obj.x} <= ${this.x + this.w}) && (${this.x} <= ${obj.x+obj.w} && ${obj.x+obj.w} <= ${this.x + this.w}) && (${obj.x} <= ${this.x} && ${this.x + this.w} <= ${obj.x + obj.w})`)
    
    if((this.x <= obj.x && obj.x <= this.x + this.w) || (this.x <= obj.x+obj.w && obj.x+obj.w <= this.x + this.w) || (obj.x <= this.x && this.x + this.w <= obj.x + obj.w)){
      if((this.y <= obj.y && obj.y <= this.y + this.h) || (this.y <= obj.y+obj.h && obj.y+obj.h <= this.y + this.h) || (obj.y <= this.y && this.y + this.h <= obj.y + obj.h)){
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  wallDetection(){
    if(this.y <= 0){
      return "top"
    }else if(this.y+this.h >= c.height){
      return "bottom"
    }
    if(this.x <= 0){
      return "left"
    }else if(this.y+this.w>=c.width){
      return "right"
    }
    
  }
}

class Box {
  constructor(x, y, w, h, value, answer){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = "#FFFFFF"
    this.hitbox = new Hitbox(this.x, this.y, this.w, this.h)
    this.value = value
    this.ans = answer
  }
  draw(){
    this.hitbox = new Hitbox(this.x, this.y, this.w, this.h)
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.rect(this.x, this.y, this.w, this.h)
    ctx.stroke()
    ctx.fillStyle = "#000000"
    ctx.font = (this.w) + "px Arial";
    ctx.fillText(this.value, this.x, this.y+this.h-2)
  }
}

function remove(target, arr){
  var placeholder = []
  for(var item of arr){
    if(target==item){
      continue
    }
    placeholder.push(item)
  }
  return placeholder
}

function find(target, arr){
  for(var i = 0; i <= arr.length; i++){
    if(arr[i]==target){
      return i
    }
  }
}

var targetBox

var mouse = new Hitbox(0, 0, 1, 1)

var boxes = []


//Define Keyboard Stuff
var keyboard = {x: 0, y: c.height * .66}
var base = {w: c.height/9, h: c.height/9}
var keys = [
  [new Box(keyboard.x + (base.w*0), keyboard.y + (base.h*0), base.w, base.h, "Q", "Q"), new Box(keyboard.x + (base.w*1), keyboard.y + (base.h*0), base.w, base.h, "W", "W"), new Box(keyboard.x + (base.w*2), keyboard.y + (base.h*0), base.w, base.h, "E", "E"), new Box(keyboard.x + (base.w*3), keyboard.y + (base.h*0), base.w, base.h, "R", "R"), new Box(keyboard.x + (base.w*4), keyboard.y + (base.h*0), base.w, base.h, "T", "T"), new Box(keyboard.x + (base.w*5), keyboard.y + (base.h*0), base.w, base.h, "Y", "Y"), new Box(keyboard.x + (base.w*6), keyboard.y + (base.h*0), base.w, base.h, "U", "U"), new Box(keyboard.x + (base.w*7), keyboard.y + (base.h*0), base.w, base.h, "I", "I"), new Box(keyboard.x + (base.w*8), keyboard.y + (base.h*0), base.w, base.h, "O", "O"), new Box(keyboard.x + (base.w*9), keyboard.y + (base.h*0), base.w, base.h, "P", "P")],
  [new Box(keyboard.x + (base.w*0) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "A", "A"), new Box(keyboard.x + (base.w*1) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "S", "S"), new Box(keyboard.x + (base.w*2) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "D", "D"), new Box(keyboard.x + (base.w*3) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "F", "F"), new Box(keyboard.x + (base.w*4) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "G", "G"), new Box(keyboard.x + (base.w*5) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "H", "H"), new Box(keyboard.x + (base.w*6) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "J", "J"), new Box(keyboard.x + (base.w*7) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "K", "K"), new Box(keyboard.x + (base.w*8) + base.w/2, keyboard.y + (base.h*1), base.w, base.h, "L", "L")],
  [new Box(keyboard.x + (base.w*0) + base.w * 1.5, keyboard.y + (base.h*2), base.w, base.h, "Z", "Z"), new Box(keyboard.x + (base.w*1) + base.w * 1.5, keyboard.y + (base.h*2), base.w, base.h, "X", "X"), new Box(keyboard.x + (base.w*2) + base.w * 1.5, keyboard.y + (base.h*2), base.w, base.h, "C", "C"), new Box(keyboard.x + (base.w*3) + base.w * 1.5, keyboard.y + (base.h*2), base.w, base.h, "V", "V"), new Box(keyboard.x + (base.w*4) + base.w * 1.5, keyboard.y + (base.h*2), base.w, base.h, "B", "B"), new Box(keyboard.x + (base.w*5) + base.w * 1.5, keyboard.y + (base.h*2), base.w, base.h, "N", "N"), new Box(keyboard.x + (base.w*6) + base.w * 1.5, keyboard.y + (base.h*2), base.w, base.h, "M", "M")]
]

//Center The Keyboard
for(var row of keys){
  for(var key of row){
    key.x += c.width/2 - base.w * 5
  }
}

var boardString = [
  "         G",
  "FOSSILFUELS",
  "         O",
  "      CARBONFOOTPRINT",
  "      A  A",
  "      R  L",
  "      B  WEATHER",
  "      O  A",
  "      N  R",
  "      D  M",
  "      I  I",
  "      O  N",
  "      X  G",
  "      I",
  "      D",
  "CLIMATE"
]

var boardColor = "BRRRRRRRRRORBOOOOOOOOOOOOOOOPBPBPYYYYYYYPBPBPBPBPBPBPPGGGGGGG"

for(var i = 0; i < boardString.length; i++){
  //console.log(boardString[i].length)
  for(var k = 0; k < boardString[i].length; k++){
    var dimen = c.height * .66 / boardString.length
    var coords = [0, 0]

    var targetChar = boardString[i].charAt(k)

    if(targetChar==" "){
      continue
    } else {
      boxes.push(new Box(coords[0] + (dimen*k), coords[1] + (dimen*i), dimen, dimen, "", boardString[i].charAt(k)))
    }
  }
}

for(var i = 0; i < boardColor.length; i++){
  
targetChar = boardColor.charAt(i)

  console.log(targetChar)

  if(targetChar=="R"){
    boxes[i].color = "red"
  } else if(targetChar=="O"){
    boxes[i].color = "orange"
  } else if(targetChar=="Y"){
    boxes[i].color = "yellow"
  } else if(targetChar=="G"){
    boxes[i].color = "green"
  } else if(targetChar=="B"){
    boxes[i].color = "blue"
  } else if(targetChar=="P"){
    boxes[i].color = "purple"
  }
}



function main(){
  ctx.clearRect(0, 0, c.width, c.height)
  mouse.show()
  for(var box of boxes){
    box.draw()
  }

  /*
  for(var box of boxes){
    if(box.value == box.ans){
      continue
    } else {
      complete = false
    }
  }*/

  //Canvas Keyboard
  ctx.fillStyle = "#808080"
  ctx.fillRect(keyboard.x, keyboard.y, c.width, c.height * .34)

  for(var row of keys){
    for(var key of row){
      //console.log(key)
      key.draw()
    }
  }
}

addEventListener("click", function(e){
  mouse = new Hitbox(e.clientX-clueboard.width, e.clientY, 1, 1)
  
  for(var box of boxes){
    if(mouse.detectCollision(box.hitbox)){
      targetBox = box
    }
  }

  for(var row of keys){
    for(var key of row){
      if(mouse.detectCollision(key.hitbox)){
        targetBox.value = key.value
        main()
      }
    }
  }
})

addEventListener("keypress", function(e){
  //console.log(targetBox)
  targetBox.value = e.key.toUpperCase()
  main()
})

main()

//setInterval(main, 30)