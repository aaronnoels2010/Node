const fs = require("fs");

const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    response.write("<html>");
    response.write("<head><title>Enter message</title></head>");
    response.write("<body><h1>Home page</h1></body>");
    response.write("</html>");
    return response.end();
  } else if (url === "/logging" && method === "POST") {
    let dataChunck = [];
    request.on("data", chuck => {
      dataChunck.push(chuck);
    });
    request.on("end", () => {
      let message = Buffer.concat(dataChunck).toString();
      fs.appendFile(
        "logging.txt",
        `${request.method} ${request.url} MESSAGE ${message}`,
        () => {
          response.write("<html>");
          response.write("<head><title>Logging</title></head>");
          response.write("<body><h1>Logged</h1></body>");
          response.write("</html>");
          return response.end();
        }
      );
    });
  } else {
    response.write("<html>");
    response.write("<head><title>Enter message</title></head>");
    response.write("<body><h1>Other pages</h1></body>");
    response.write("</html>");
    response.end();
  }
};

module.exports = requestHandler;
