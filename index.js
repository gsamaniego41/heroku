// define a server
const server = require("./api/server");
const port = 9000;
// run the server
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
