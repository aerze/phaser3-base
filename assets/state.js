import Phaser from 'phaser-ce'
import loadDino from './utils/loadDino'

const DARK_BLUE = '#3E80BE'
const PLAYER_SPEED = 10

class mainState extends Phaser.State {
  constructor () {
    super()

    this.spawnBall = this.spawnBall.bind(this)
    this.collectBall = this.collectBall.bind(this)
    this.holdBall = this.holdBall.bind(this)
    this.checkIfScored = this.checkIfScored.bind(this)
  }

  preload () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true

    this.game.renderer.renderSession.roundPixels = true
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    const names = ['doux', 'mort', 'tard', 'vita']
    names.forEach(loadDino(this.game))

    this.game.load.image('ball', '/assets/ball.png')

    this.game.stage.backgroundColor = DARK_BLUE
  }

  spawnBall (ball) {
    ball.player.score += 1
    ball.player.ball = null
    ball.player = null

    const x = Phaser.Math.random(0, 512)
    const y = Phaser.Math.random(20, 512)
    this.ball.reset(x, y)
  }

  collectBall (player, ball) {
    if (!ball.player) {
      player.ball = ball
      ball.player = player
    }
  }

  holdBall (player, ball) {
    if (ball.player === player) {
      ball.x = player.x
      ball.y = player.y
    } else {
      // steal ball
    }
  }

  create () {
    const { width, height } = this.game.canvas

    this.game.input.gamepad.start()
    this.pad = [this.game.input.gamepad.pad1, this.game.input.gamepad.pad2]

    this.p1 = this.game.add.sprite(100, 100, 'doux')
    this.p1.smoothed = false
    this.p1.scale.set(2)
    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE)
    this.p1.body.collideWorldBounds = true
    this.p1.score = 0
    this.p1.ball = null
    this.p1.zone = new Phaser.Rectangle(0, 0, this.p1.width, 100)

    this.p2 = this.game.add.sprite(200, 200, 'mort')
    this.p2.smoothed = false
    this.p2.scale.set(2)
    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE)
    this.p2.body.collideWorldBounds = true
    this.p2.score = 0
    this.p2.ball = null
    this.p2.zone = new Phaser.Rectangle(width - this.p2.width, height - 100, this.p2.width, 100)

    this.ball = this.game.add.sprite(width * 0.5, height * 0.5, 'ball')
    this.ball.scale.set(0.4)
    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE)
    this.ball.body.collideWorldBounds = true

    this.p1text = this.game.add.text(0, 0, `Score: ${this.p1.score}`, {
      fill: '#9999ff'
    })

    this.p2text = this.game.add.text(this.game.canvas.width, 0, `Score: ${this.p2.score}`, { fill: '#ff9999' })
    this.p2text.anchor.set(1, 0)

    this.line = new Phaser.Line()
  }

  checkIfScored (player) {
    const { width, height } = Phaser.Rectangle.intersection(player, player.zone)
    if (width && height && player.ball) {
      this.spawnBall(this.ball)
    }
  }

  update () {
    const { supported, active, pad1, pad2 } = this.game.input.gamepad

    this.line.fromSprite(this.p1, this.p2, true)
    const power = 100 / Math.floor(this.line.length / 20)
    console.log('power', power)

    // player one movement
    if (supported && active && pad1.connected) {
      const axisX = Math.round(Number(pad1.axis(Phaser.Gamepad.AXIS_0)))
      const axisY = Math.round(Number(pad1.axis(Phaser.Gamepad.AXIS_1)))
      const justPressedA = pad1.justPressed(Phaser.Gamepad.BUTTON_1)
      const justPressedB = pad1.justPressed(Phaser.Gamepad.BUTTON_0)
      const isDownA = pad1.isDown(Phaser.Gamepad.BUTTON_1)

      const leftPressed = axisX === -1
      const rightPressed = axisX === 1
      const upPressed = axisY === -1
      const downPressed = axisY === 1

      if (justPressedB && this.p2.ball) {
        if (this.line.length < 100) {
          const deg = Phaser.Math.radToDeg(this.line.angle)
          if (power > 1.5) {
            const halfPower = power * 0.5
            this.ball.player.ball = null
            this.ball.player = null
            this.ball.x += halfPower * Math.cos(deg)
            this.ball.y += halfPower * Math.sin(deg)
          }
          this.p2.x += power * Math.cos(deg)
          this.p2.y += power * Math.sin(deg)
        }
      }

      if (justPressedA) {
        this.game.physics.arcade.overlap(this.p1, this.ball, this.collectBall)
      }

      if (isDownA) {
        this.game.physics.arcade.overlap(this.p1, this.ball, this.holdBall)
      }

      if (!isDownA && this.p1.ball) {
        this.p1.ball.player = null
        this.p1.ball = null
      }

      if (leftPressed) {
        this.p1.x -= PLAYER_SPEED
      }

      if (rightPressed) {
        this.p1.x += PLAYER_SPEED
      }

      if (upPressed) {
        this.p1.y -= PLAYER_SPEED
      }

      if (downPressed) {
        this.p1.y += PLAYER_SPEED
      }

      this.p1.x = Phaser.Math.clamp(this.p1.x, 0, this.game.canvas.width - this.p1.width)
      this.p1.y = Phaser.Math.clamp(this.p1.y, 0, this.game.canvas.height - this.p1.height)
    }

    // player two movement
    if (supported && active && pad2.connected) {
      const axisX = Math.round(Number(pad2.axis(Phaser.Gamepad.AXIS_0)))
      const axisY = Math.round(Number(pad2.axis(Phaser.Gamepad.AXIS_1)))
      const justPressedA = pad2.justPressed(Phaser.Gamepad.BUTTON_1)
      const justPressedB = pad2.justPressed(Phaser.Gamepad.BUTTON_0)
      const isDownA = pad2.isDown(Phaser.Gamepad.BUTTON_1)

      if (justPressedB && this.p1.ball) {
        if (this.line.length < 100) {
          if (power > 1.5) {
            const halfPower = power * 0.5
            this.ball.player.ball = null
            this.ball.player = null
            this.ball.x += this.line.length * this.line.angle * halfPower
            this.ball.y += this.line.length * this.line.angle * halfPower
          }
          this.p1.x += this.p1.x - this.p2.x > 0 ? power : power * -1
          this.p1.y += this.p1.y - this.p2.y > 0 ? power * -1 : power
        }
      }

      const leftPressed = axisX === -1
      const rightPressed = axisX === 1
      const upPressed = axisY === -1
      const downPressed = axisY === 1

      if (justPressedA) {
        this.game.physics.arcade.overlap(this.p2, this.ball, this.collectBall)
      }

      if (isDownA) {
        this.game.physics.arcade.overlap(this.p2, this.ball, this.holdBall)
      }

      if (!isDownA && this.p2.ball) {
        this.p2.ball.player = null
        this.p2.ball = null
      }

      if (leftPressed) {
        this.p2.x -= PLAYER_SPEED
      }

      if (rightPressed) {
        this.p2.x += PLAYER_SPEED
      }

      if (upPressed) {
        this.p2.y -= PLAYER_SPEED
      }

      if (downPressed) {
        this.p2.y += PLAYER_SPEED
      }

      this.p2.x = Phaser.Math.clamp(this.p2.x, 0, this.game.canvas.width - this.p2.width)
      this.p2.y = Phaser.Math.clamp(this.p2.y, 0, this.game.canvas.height - this.p2.height)
    }

    this.checkIfScored(this.p1)
    this.checkIfScored(this.p2)

    this.p1text.setText(`Score: ${this.p1.score}`)
    this.p2text.setText(`Score: ${this.p2.score}`)

    this.game.debug.geom(this.p1.zone, 'rgba(0,0,255,0.5)')
    this.game.debug.geom(this.p2.zone, 'rgba(255,0,0,0.5)')
    this.game.debug.geom(this.line)
    // this.game.debug.lineInfo(this.line, 100, 100)

    this.game.debug.text(Phaser.Math.radToDeg(this.line.angle), 90, 90)
    this.game.debug.text(Phaser.Math.radToDeg(this.line.normalAngle), 120, 120)

    // console.log('angle', this.line.angle)
    // console.log('normal', this.line.normalAngle)
    // this.game.physics.arcade.collide(this.p1, this.p2)
    // this.game.debug.bodyInfo(this.p1, 32, 32)
    // this.game.debug.body(this.p1)
    // this.game.debug.body(this.p2)
  }
}

export default mainState
