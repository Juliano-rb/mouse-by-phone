var gyroNorm;

function InitGyroFramework(){
    console.log("Initializing gyronorm");
    var args = {
        frequency:5,					// ( How often the object sends the values - milliseconds )
        gravityNormalized:true,			// ( If the gravity related values to be normalized )
        orientationBase:GyroNorm.GAME,		// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
        decimalCount:3,					// ( How many digits after the decimal point will there be in the return values )
        logger:function(data){alert(data.message)},					// ( Function to be called to log messages from gyronorm.js )
        screenAdjusted:true			// ( If set to true it will return screen adjusted values. )
    };

    gyroNorm = new GyroNorm();
    gyroNorm.init(args).then(function() {
        var isAvailable = gyroNorm.isAvailable();
        if(!isAvailable.deviceOrientationAvailable) {
            error('Device orientation is not available.');
        }
        if(!isAvailable.accelerationAvailable) {
            error('Device acceleration is not available.');
        }
        if(!isAvailable.accelerationIncludingGravityAvailable) {
            error('Device acceleration incl. gravity is not available.');
        }
        if(!isAvailable.rotationRateAvailable) {
            error('Device rotation rate is not available.');
        }
    }).catch(function(e){
        error(e);
    });

    function error(message){
        alert(message);
    }
}


function StartGyroDataFetching(CallBackFunction){
    gyroNorm.start(CallBackFunction);
}

function StopGyroDataFetching(){
    gyroNorm.stop();
}

InitGyroFramework();