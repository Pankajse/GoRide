require('dotenv').config(); // Added missing semicolon
const PORT = process.env.PORT || 3000;
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket"); // Import the socket initialization function

const server = http.createServer(app);

initializeSocket(server); // Initialize the socket server

server.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});