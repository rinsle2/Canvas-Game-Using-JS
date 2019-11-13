var lives = 1
var player
var enemy = []
var score
function startGame() {
  player = new component(30, 30, "img/player.png", 10, 120, "image")
  game.start()
}

var game = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext("2d")
  },
  stop: function() {
    
  }
}
function component(width, height, color, x, y, type) {
  this.type = type
  if(type == "image") {
    this.image = new Image()
    this.image.src = color
  }
  this.width = width
  this.height = height
  this.deltaX = 0
  this.deltaY = 0
  this.x = x
  this.y = y
}