var canvas;
var ctx;
var TERMINAL_SPEED = 5.0;

function Player() {
    this.speed = [ 0.0, 0.0 ];
    this.acceleration = [ 0.0, 0.0 ];
    this.runAcceleration = [ 0.0, 0.0 ];
}
Player.prototype.MAX_RUNNING_SPEED = 3.0;
Player.prototype.JUMP_SPEED = 5.0;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // set the keyboard handlers
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
}

function keyDown() {
    switch (event.keyCode) {
        case KeyEvent.DOM_VK_LEFT:
            if (player.runAcceleration[0] != -1.0) {
                player.runAcceleration[0] = -1.0;
            }
            break;
        case KeyEvent.DOM_VK_RIGHT:
            if (player.runAcceleration[0] != 1.0) {
                player.runAcceleration[0] = 1.0;
            }
            break;
        case KeyEvent.DOM_VK_UP:
            if (!player.inputY && player.canJump()) {
                player.acceleration[1] = -1.0;
            }
            break;
        case KeyEvent.DOM_VK_DOWN:
            if (player.canDuck()) {
                player.duck();
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


    }
    return true;
}

function grow() {
    barLength++;
}

function draw() {
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(20, 180, barLength * 5, 40);
}
