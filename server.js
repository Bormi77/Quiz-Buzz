const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" } 
});

app.use(cors());

// ✅ Route pour tester si le serveur fonctionne
app.get("/", (req, res) => {
    res.send("✅ Serveur fonctionne !");
});

let rooms = {}; 

io.on("connection", (socket) => {
    console.log("✅ Un joueur s'est connecté :", socket.id);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
    console.log(`🌍 Ouvre cette URL : https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});
