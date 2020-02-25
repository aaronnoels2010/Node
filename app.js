const http = require("http");
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(9000);

console.log("De server is gestart op http://localhost:9000");
