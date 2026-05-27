const routes = require('express').Router();
const temple = require('./temple');
const review = require('./review');

routes.use('/', require('./swagger'));
routes.use('/temples', temple);
routes.use('/reviews', review);
routes.get('/', (req, res) => {
  if (req.accepts('html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Temple API Dashboard</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f7f7f7; color: #222; margin: 0; padding: 0; }
      .container { max-width: 760px; margin: 4rem auto; background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 10px 24px rgba(0,0,0,.08); }
      h1 { margin-top: 0; }
      .buttons { display: grid; gap: 1rem; margin-top: 1.5rem; }
      .buttons a { display: inline-block; text-decoration: none; background: #2d6cdf; color: #fff; padding: 1rem 1.25rem; border-radius: 8px; text-align: center; font-weight: 600; }
      .buttons a:hover { background: #234dbf; }
      p { line-height: 1.6; }
      .note { margin-top: 1.5rem; padding: 1rem; background: #eef4ff; border-left: 4px solid #2d6cdf; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Temple API Launcher</h1>
      <p>Use the buttons below to navigate the key app endpoints without typing URLs manually.</p>
      <div class="buttons">
        <a href="/auth/github">Login with GitHub</a>
        <a href="/auth/status">Check Login Status</a>
        <a href="/auth/logout">Logout</a>
        <a href="/api-docs">Swagger API Docs</a>
        <a href="/temples">Temples</a>
        <a href="/reviews">Reviews</a>
      </div>
      <div class="note">
        <strong>Note:</strong> If you prefer API output, request this route with an API client or request header accepting JSON.
      </div>
    </div>
  </body>
</html>`);
  }

  res.send({
    message: 'Welcome to the Temple API',
    version: '1.0.0',
    routes: {
      documentation: '/api-docs',
      temples: '/temples',
      reviews: '/reviews',
    },
  });
});

module.exports = routes;
