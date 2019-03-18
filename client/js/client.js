
Client();

function Client(){
    const clientConfiguration = {};

    Init();

    function Init(){
        registerEvents();
        updateClientConfigs()
    }

    function StartLiveGyro(){
        Log("Starting Gyro...")
    }

    function StopLiveGyro(){
        Log("Stopping Gyro.")
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
        clientConfiguration.mouseThreshold = document.getElementById("mouseThresholdInput").value
        
        console.log(clientConfiguration)
    }

    function registerEvents(){
        document.getElementById("startGyroBtn").onclick=StartLiveGyro;
        document.getElementById("stopGyroBtn").onclick=StopLiveGyro;

        document.getElementById("serverIpInput").onchange = updateClientConfigs;
        document.getElementById("serverPortInput").onchange = updateClientConfigs;
        document.getElementById("mouseThresholdInput").onchange = updateClientConfigs;

        document.getElementById("setHeadBtn").onclick=SetHead;

        document.getElementById("leftClickBtn").onclick=LeftMouseClick;
        document.getElementById("rightClickBtn").onclick=RightMouseClick;
    }
}

