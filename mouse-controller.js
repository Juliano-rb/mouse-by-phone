var robot = require("robotjs");

function mouseController(){
    const mouseDelay = 2;
    const deadZoneSize = 3;
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
}

mouseController();