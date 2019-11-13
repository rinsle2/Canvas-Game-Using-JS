var lives = 1
var player
var enemy = []
var scoreObj = []
var score
var request
var level = 1
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
    this.frames = 0
  },
  clear: function() {
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
  },
  stop: function() {
    window.cancelAnimationFrame(request)
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
  this.update = function() {
    ctx = game.context
    if(type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    else {
      ctx.fillStyle = color
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  this.collision = function(obj2) {
    var obj1left = this.x
    var obj1right = this.x + this.width
    var obj1top = this.y
    var obj1bottom = this.y + this.height
    var obj2left = obj2.x
    var obj2right = obj2.x + obj2.width
    var obj2top = obj2.y
    var obj2bottom = obj2.y + obj2.height
    var crash = true
    if(obj1bottom <= obj2top || obj1top >= obj2bottom || obj1left >= obj2right || obj1right <= obj2left) crash = false
    return crash
  }
  this.newPosition = function() {
    this.x += this.deltaX
    this.y += this.deltaY
  }
}

function updateGame() {
  var x
  var y
  var enemyHeight = Math.floor(Math.random() * canvas.height)
  var scoreWidth = Math.floor(Math.random() * canvas.width)
  for (i =0;i<enemy.length;i++) {
    if(player.collision(enemy[i])) {
      lives--
      if(lives == 0)
      {
        game.stop()
        return
      }
      enemy[i].x = canvas.width
      enemy[i].y = enemyHeight
    }
  }
  for (i =0;i<scoreObj.length;i++) {
    if(player.collision(scoreObj[i])) {
      score++
      if(score >= 100)
      {
        lives++
        score = 0
      }
      scoreObj[i].x = scoreWidth
      scoreObj[i].y = 0
    }
  }
  enemyHeight = Math.floor(Math.random() * canvas.height)
  scoreWidth = Math.floor(Math.random() * canvas.width)
  game.clear()
  game.frames++
  if(frames %1000 == 0) {
    level++
  }
  enemy.push(new component(30, 30, "img/enemy.png", canvas.width, enemyHeight, "image"))
  scoreObj.push(new component(30, 30, "img/moreScore.png", canvas.width, enemyHeight, "image"))
  for(i=0;i<enemy.length;i++) {
    enemy[i].x -= 1 * level
    enemy[i].update()
  }
  for(i=0;i<scoreObj.length;i++) {
    scoreObj[i].y -= 1 * level
    scoreObj[i].update()
  }
  player.newPosition()
  player.update()
  request = window.requestAnimationFrame(updateGame)
}

request = window.requestAnimationFrame(updateGame)