function Client(){
    const clientConfiguration = {};
    var chanelIsOpen = true;

    Init();

    function Init(){
        registerEvents();
        updateClientConfigs()
    }

    function StartLiveGyro(){
        StartGyroDataFetching(handleSensorsData);
    }

    function StopLiveGyro(){
        StopGyroDataFetching();
    }

    function LeftMouseClick(){
        Log("Left mouse click.");
    }

    function RightMouseClick(){
       Log("Right mouse click.");
    }

    function SetHead(){
        Log("Setting head direction");
    }

    function Log(text){
        const textArea = document.getElementById("logAreaInput");
        textArea.value += text + "\n";
        textArea.scrollTo(0,textArea.scrollWidth);
    }
    function updateClientConfigs(){
        Log("Updating client configurations.")
        clientConfiguration.serverIP = document.getElementById("serverIpInput").value
        clientConfiguration.serverPort = document.getElementById("serverPortInput").value
        clientConfiguration.mouseDeadZone = document.getElementById("mouseDeadzone").value
        clientConfiguration.mouseSpeed = document.getElementById("mouseSpeed").value

        console.log(clientConfiguration)
    }

    function registerEvents(){
        document.getElementById("startGyroBtn").onclick=StartLiveGyro;
        document.getElementById("stopGyroBtn").onclick=StopLiveGyro;

        document.getElementById("serverIpInput").onchange = updateClientConfigs;
        document.getElementById("serverPortInput").onchange = updateClientConfigs;
        document.getElementById("mouseDeadzone").onchange = updateClientConfigs;
        document.getElementById("mouseSpeed").onchange = updateClientConfigs;

        document.getElementById("mouseDeadzone").oninput = updateGuiLabels;
        document.getElementById("mouseSpeed").oninput = updateGuiLabels;

        document.getElementById("setHeadBtn").onclick=SetHead;

        document.getElementById("leftClickBtn").onclick=LeftMouseClick;
        document.getElementById("rightClickBtn").onclick=RightMouseClick;
    }

    function updateGuiLabels(){
        document.getElementById("mouseSpeedLabel").innerHTML = document.getElementById("mouseSpeed").value;
        document.getElementById("mouseDeadzoneLabel").innerHTML = document.getElementById("mouseDeadzone").value;
    }

    function handleSensorsData(data){
        var clientData=
        {
            type: "sensorsData",
            rotationRate:{
                x : data.dm.alpha,
                y : data.dm.beta,
                z : data.dm.gamma
            },
            aceleration:{
                x : data.dm.x,
                y : data.dm.y,
                z : data.dm.z
            },
            acelerationWithGravity:{
                x : data.dm.gx,
                y : data.dm.gy,
                z : data.dm.gz
            }
        };
        if(chanelIsOpen)
            sendClientData(clientData);
    }

    function sendClientData(data){
        chanelIsOpen = false;

        var dataTosend = {
            title : "sensors_data",
            message : data
        }; 

        if(!clientConfiguration.serverIP || !clientConfiguration.serverPort ){
            Log("Please fill the Server IP and Server Port on configurations");
        }

        const serverUrl = "http://" + clientConfiguration.serverIP + ":" + clientConfiguration.serverPort;

        $.ajax({
            type: 'POST',
            data: JSON.stringify(dataTosend),
            contentType: 'application/json',
            url: serverUrl,						
            success: function(data) {
                chanelIsOpen = true;
                console.log(JSON.stringify(data));
            },
            error: function(data){
                Log("Error in sensors data sending. Stopping...")
                //console.log(JSON.stringify(data));
                chanelIsOpen = true;
                StopLiveGyro();
            }
        });
    }
}

Client();
