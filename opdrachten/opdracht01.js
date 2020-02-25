const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;
  if (url == "/") {
    response.write("<html>");
    response.write("<head><title>HOME</title></head>");
    response.write("<body>");
    response.write("<h1>Welcome to exercise 1.</h1>");
    response.write(
      "<form action='/create-user' method='POST'><input type='text' name='name'/><input type='submit' value='verzenden'/></form"
    );
    response.write("</body>");
    response.write("</html>");
  } else if (url == "/users") {
    response.write("<html>");
    response.write("<head><title>HOME</title></head>");
    response.write("<body>");
    response.write("<ul><li>Aaron Noels</li><li>Aaron Noels</li></ul>");
    response.write("</body>");
    response.write("</html>");
  } else if (url == "/create-user" && method == "POST") {
    var body = [];
    request.on("data", chunck => {
      body.push(chunck);
    });

    request.on("end", () => {
      const buffer = new Buffer.concat(body).toString();
      fs.appendFile("logs.txt", `${buffer}\n`, () => {
        console.log("FILE OPERATION ENDED");
      });
    });
  } else {
  }

  return response.end();
});

server.listen(3000);

console.log(`De server is gestart op http://localhost:3000`);
