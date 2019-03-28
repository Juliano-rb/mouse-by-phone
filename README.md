<h1>Mouse By Phone<h2>
Take controll of the mouse position of your computer using your phone's gyroscope and acelerometer.

<h2>Running</h2>

1. Install dependences: npm install

2. Start server: **npm start**

3. Go to ***your-ip*:3000** in your phone or use **/client** as a aplication in your device

<h2>How it works?</h2>

When the server is started, a node server is created. The server listen to *POST* messages from the *client* aplication containing the data from *gyroscope* and *acelerometer* of the device. Then, the *server* calls the *mouse-controller* module to update the mouse position on screen.