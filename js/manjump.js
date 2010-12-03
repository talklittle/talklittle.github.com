/*
 * manjump.js
 * ManJump Engine
 * Copyright 2010 Andrew Shu
 */

// Globals
var canvas;
var ctx;
var currentDate;
var backgroundLayers = [];
var staticObjects = [];
var camera;
var viewport;
var viewportCameraScale = [1, 1];  // ratios of viewport dimensions to camera dimensions

// Constants
var MAX_FALLING_SPEED = 5.0;
var GRAVITY_ACCELERATION = 1.25;

///////////////////////////////////////
// Classes
///////////////////////////////////////

// begin class Player
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
        // physics
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];
        this.frame = (this.frame + 1) % this.numFrames;
    };
    this.draw = function() {
        ctx.drawImage(this.getImage(),
                this.position[0], this.position[1], this.dimensions[0], this.dimensions[1]);
    };
}
// Player constants
Player.prototype.RUN_ACCELERATION = 1.0;
Player.prototype.MAX_RUNNING_SPEED = 3.0;
Player.prototype.JUMP_SPEED = 5.0;
Player.prototype.CLIMB_SPEED = 3.0;
// end class Player

// begin class StaticObject
function StaticObject() {
    this.position = [ 0.0, 0.0 ];
    this.dimensions = [ 0.0, 0.0 ];
    this.image = null;
    this.draw = function() {
        // Find the onscreen portion of image.
        var inPosition = [0, 0];
        var inDimensions = [0, 0];
        var outPosition = [0, 0];
        var outDimensions = [0, 0];

        for (var i in [0, 1]) {
            // Check left edge onscreen.
            if (this.position[i] >= camera.position[i]
                    && this.position[i] < camera.position[i] + camera.dimensions[i]) {
                inPosition[i] = 0;  // can display from leftmost pixel of this object's image
                // Find dimensions onscreen; may trail off right edge
                if (this.position[i] + this.dimensions[i] <= camera.position[i] + camera.dimensions[i]) {
                    inDimensions[i] = this.dimensions[i];
                } else {
                    inDimensions[i] = camera.dimensions[i] - (this.position[i] - camera.position[i]);
                }
            }
            // Check left edge offscreen to left, object still visible.
            else if (this.position[i] < camera.position[i]
                    && this.position[i] + this.dimensions[i] > camera.position[i]) {
                inPosition[i] = camera.position[i] - this.position[i];
                // Find dimensions onscreen; may trail off right edge
                if (this.position[i] + this.dimensions[i] <= camera.position[i] + camera.dimensions[i]) {
                    inDimensions[i] = this.dimensions[i] - inPosition[i];
                } else {
                    inDimensions[i] = camera.dimensions[i];
                }
            }
            // Else too far to left or right.
            else {
                // TODO prune offscreen object. (immediately? after X number of calls to draw()?)
                return;
            }

            // Get the output location on screen.
            outPosition[i] = viewport.position[i] + inPosition[i];
            outDimensions[i] = inDimensions[i] * viewportCameraScale[i];
        }
        // Slice the onscreen portion of image.
        // (If slow, could instead draw whole image, and draw a frame around the viewport.
        //  But that may not work well for large images.)
        ctx.drawImage(this.image,
                inPosition[0], inPosition[1], inDimensions[0], inDimensions[1],
                outPosition[0], outPosition[1], outDimensions[0], outDimensions[1]);
    };
}
// end class StaticObject

// begin class BackgroundLayer
function BackgroundLayer() {
    this.position = [ 0.0, 0.0 ];
    this.dimensions = [ 0.0, 0.0 ];
    this.image = null;
    this.draw = function() {
        // slice image based on camera position
        // assume image has same dimensions as level
        ctx.drawImage(this.image,
                camera.position[0], camera.position[1], camera.dimensions[0], camera.dimensions[1],
                viewport.position[0], viewport.position[1], viewport.dimensions[0], viewport.dimensions[1]);
    };
}
// end class BackgroundLayer

// begin class Camera
function Camera(initialX, initialY, width, height) {
    // looking onto a portion of the level map
    this.position = [ initialX, initialY ];
    this.dimensions = [ width, height ];
}
// end class Camera

// begin class Viewport
function Viewport(x, y, width, height) {
    // represent position to draw on canvas
    this.position = [ x, y ];
    this.dimensions = [ width, height ];
}
// end class Viewport

// shared game object methods
// (Player)
function canClimb() {
    // TODO canClimb look at ladders
    return false;
}
function canDuck() {
    // TODO canDuck look at platforms
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

    // TODO init level info

    // init camera and viewport
    camera = new Camera(0, 0, 640, 480);
    viewport = new Viewport(0, 0, 640, 480);
    viewportCameraScale = [ 1, 1 ];

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
