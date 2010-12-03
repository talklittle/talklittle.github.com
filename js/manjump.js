// Globals
var canvas;
var ctx;
var currentDate;

// Constants
var MAX_FALLING_SPEED = 5.0;

// Classes
function Player() {
    // up is negative Y, down is positive Y
    this.position = [ 0.0, 0.0 ];
    this.velocity = [ 0.0, 0.0 ];
    this.acceleration = [ 0.0, 0.0 ];
    this.runAcceleration = 0.0;
    this.isDucking = false;
    this.frame = 0;

    // methods
    this.canClimb = canClimb;
    this.canDuck = canDuck;
    this.duck = duck;
    this.unduck = unduck;
    this.update = function() {
        this.frame = (this.frame + 1) % this.numFrames;
        // TODO physics
    }
    this.draw = function() {
        ctx.drawImage(this.getImage(), this.position[0], this.position[1],
                this.width, this.height);
    }
}
Player.prototype.RUN_ACCELERATION = 1.0;
Player.prototype.MAX_RUNNING_SPEED = 3.0;
Player.prototype.JUMP_SPEED = 5.0;
Player.prototype.CLIMB_SPEED = 3.0;
// Player methods
function canClimb() {
    // TODO
    return false;
}
function canDuck() {
    // TODO
    return false;
}
function duck() {
    this.isDucking = true;
}
function unduck() {
    this.isDucking = false;
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // init the current date (care about the time)
    currentDate = new Date();

    // set the keyboard handlers
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

    // Game loop
    setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec
}

function keyDown() {
    switch (event.keyCode) {
        case KeyEvent.DOM_VK_LEFT:
            if (player.runAcceleration != -player.RUN_ACCELERATION) {
                player.runAcceleration = -player.RUN_ACCELERATION;
            }
            break;
        case KeyEvent.DOM_VK_RIGHT:
            if (player.runAcceleration != player.RUN_ACCELERATION) {
                player.runAcceleration = player.RUN_ACCELERATION;
            }
            break;
        case KeyEvent.DOM_VK_UP:
            if (player.canClimb()) {
                player.climbVelocity = -player.CLIMB_SPEED;
            }
            else if (player.canJump()) {
                player.speed[1] = -player.JUMP_SPEED;
            }
            break;
        case KeyEvent.DOM_VK_DOWN:
            if (player.canDuck()) {
                player.duck();
            }
            else if (player.canClimb()) {
                player.climbVelocity = player.CLIMB_SPEED;
            }
            break;
        default:
            break;
    }
    return true;
}

function keyUp() {
    switch (event.keyCode) {
        case KeyEvent.DOM_VK_LEFT:
        case KeyEvent.DOM_VK_RIGHT:
            if (player.runAcceleration != 0) {
                player.runAcceleration = 0;
                player.runDrag = getDrag(player.getSurface());
            }
            break;
        case KeyEvent.DOM_VK_UP:
            if (player.climbVelocity < 0) {
                player.climbVelocity = 0;
            }
            break;
        case KeyEvent.DOM_VK_DOWN:
            if (player.climbVelocity > 0) {
                player.climbVelocity = 0;
            }
            else if (player.isDucking) {
                player.unduck();
                // if you release Down quickly, then fall through platform
                if (currentDate.getTime() - player.duckTime <= player.DUCK_FALL_THROUGH_TIME) {
                    player.fallThrough();
                }
            }
            break;
        default:
            break;
    }
    return true;
}

function onTimerTick() {
    currentDate = new Date();

    // updates
    for (var gameObject in gameObjects) {
        gameObject.update();
    }

    // draw
    for (var backgroundLayer in backgroundLayers) {
        backgroundLayer.draw();
    }
    for (var staticObject in staticObjects) {
        staticObject.draw();
    }
    for (var gameObject in gameObjects) {
        gameObject.draw();
    }
}
