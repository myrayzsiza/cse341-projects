const http = require('http');

const data = JSON.stringify({
  review_id: 1001,
  temple_id: 1,
  author: 'Automated Tester',
  rating: 5,
  comment: 'Smoke test review',
  date: new Date().toISOString(),
  isPublic: true,
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/reviews',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('BODY', body);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('ERR', e.message);
  process.exit(1);
});

req.write(data);
req.end();
