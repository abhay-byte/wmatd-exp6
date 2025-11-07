const http = require('http');
const app = require('./index'); // Assuming your express app is exported from index.js

const server = app.listen(0, () => {
  const port = server.address().port;
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, res => {
    let data = '';
    res.on('data', d => {
      data += d;
    });
    res.on('end', () => {
      if (res.statusCode === 200 && data === 'WMATD EXPERIMENT 6!') {
        console.log('Tests passed!');
        server.close();
        process.exit(0);
      } else {
        console.error(`Tests failed. Status code: ${res.statusCode}, Data: ${data}`);
        server.close();
        process.exit(1);
      }
    });
  });

  req.on('error', error => {
    console.error(error);
    server.close();
    process.exit(1);
  });

  req.end();
});
