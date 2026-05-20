const http = require('http');
const url = 'http://localhost:8080/temples';

http.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    try {
      const json = JSON.parse(data);
      console.log('RECORDS', Array.isArray(json) ? json.length : 'not-array');
      if (Array.isArray(json) && json.length > 0) {
        console.log('SAMPLE', JSON.stringify(json[0]));
      }
    } catch (e) {
      console.log('BODY', data.slice(0, 500));
    }
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('ERR', err.message);
  process.exit(1);
});
