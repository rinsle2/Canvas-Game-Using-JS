var lives = 1
var player
var enemy
var scoreObj = []
var score = 1
var scoreTxt
var request
var level = 1
var levelTxt
var livesTxt
var gameover
var background
document.onkeydown = function (e) {
  switch(e.key) {
    case 'ArrowUp': {
      player.deltaY = -1
      break
    }
    case 'ArrowDown': {
      player.deltaY = 1
      break
    }
    case 'ArrowLeft': {
      player.deltaX = -1
      break
    }
    case 'ArrowRight': {
      player.deltaX = 1
      break
    }
  }
}
document.onkeyup = function (e) {
  switch(e.key) {
    case 'ArrowUp': {
      player.deltaY = 0
      break
    }
    case 'ArrowDown': {
      player.deltaY = 0
      break
    }
    case 'ArrowLeft': {
      player.deltaX = 0
      break
    }
    case 'ArrowRight': {
      player.deltaX = 0
      break
    }
      
  }
}
function startGame() {
  player = new component(30, 30, "img/player.png", 10, 120, "image")
  enemy = new component(30, 30, "img/enemy.png", game.canvas.width, Math.floor(Math.random() * game.canvas.height), "image")
  background = new component(960, 270, "img/background.png", 0,0, "background")
  scoreTxt = new component("24px", "Consolas", "black", 280, 40, "text")
  livesTxt = new component("24px", "Consolas", "black", 30, 40, "text")
  levelTxt = new component("24px", "Consolas", "black", 140, 40, "text")
  
  game.start()
}

var game = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext("2d")
    this.frames = 0
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    request = window.requestAnimationFrame(updateGame)
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
  if(type == "image" || type == "background") {
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
    if(type == "text") {
      ctx.font = this.width + " " + this.height
      ctx.fillStyle = color
      ctx.fillText(this.text, this.x, this.y)
    }
    if(type == "image" || type == "background") {
        ctx.drawImage(this.image,
                      this.x,
                      this.y,
                      this.width,
                      this.height)
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
    if(this.type == "background") {
      if(this.x == -(this.width)) {
        this.x = 0
      }
    }
  }
}

function updateGame() {
  var x
  var y
  var enemyHeight = Math.floor(Math.random() * game.canvas.height)
  var scoreWidth = Math.floor(Math.random() * game.canvas.width)
    if(player.collision(enemy)) {
      lives = lives -1
      enemy.x = game.canvas.width
      enemy.y = Math.floor(Math.random() * game.canvas.height)
      if(lives == 0)
      {
        gameover = new component("24px", "Consolas", "black", game.canvas.width/2, game.canvas.height/2, "text")
        gameover.text = "Game Over"
        game.stop()
        return
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
        scoreTxt.text =  "Score: " + score
      scoreObj[i].x = Math.floor(Math.random() * game.canvas.width)
      scoreObj[i].y = 0
    }
  }
  game.clear()
  background.deltaX = -1
  background.newPosition()
  background.update()
  enemyHeight = Math.floor(Math.random() * game.canvas.height)
  scoreWidth = Math.floor(Math.random() * game.canvas.width)
  game.frames++
  if(frames %1000 == 0) {
    level++
    levelTxt.text = "Level: " + level
  }
  scoreObj.push(new component(30, 30, "img/moreScore.png", scoreWidth, 0, "image"))
    enemy.x -= 1 * level * 4
  if(enemy.x < 0) {
    enemy.x = game.canvas.width
    enemy.y = Math.floor(Math.random() * game.canvas.height)
  }
    enemy.update()
  for(i=0;i<scoreObj.length;i++) {
    if(i > 500) break
    scoreObj[i].y += 1 * level * 2
    if(scoreObj[i].y > game.canvas.height) {
      scoreObj[i].y = 0
      scoreObj[i].x = Math.floor(Math.random() * game.canvas.width)
    }
    scoreObj[i].update()
  }
  player.newPosition()
  player.update()
  livesTxt.text =  "Lives: " + lives
  livesTxt.update()
  scoreTxt.text =  "Score: " + score
  scoreTxt.update()
  levelTxt.text = "Level: " + level
  levelTxt.update()
  request = window.requestAnimationFrame(updateGame)
}

