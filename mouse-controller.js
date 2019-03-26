var robot = require("robotjs");

function mouseController(){
    var mouseDelay = 2;
    var deadZoneSize = 3;
    var mouseSpeed = 1;
    
    robot.setMouseDelay(mouseDelay);

    module.exports.moveMouse = function(deltaX,deltaY){
        var mouse = robot.getMousePos();

        if (Math.abs(deltaX) < deadZoneSize){
            deltaX = 0;
        }
        if (Math.abs(deltaY) < deadZoneSize){
            deltaY = 0;
        }

        robot.moveMouse(mouse.x + -deltaX, mouse.y + -deltaY);
    }

    module.exports.setMouseDeadzone = function(deadZoneValue){
        deadZoneSize = deadZoneValue;
    }

    module.exports.setMouseSpeed = function(speedValue){
        mouseSpeed = speedValue;
    }
}

mouseController();