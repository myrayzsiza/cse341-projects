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
      * { margin: 0; padding: 0; box-sizing: border-box; }
      
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        color: #222;
      }
      
      .container { 
        max-width: 600px;
        background: #fff;
        border-radius: 16px;
        padding: 3rem 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.6s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .header {
        text-align: center;
        margin-bottom: 2.5rem;
        border-bottom: 3px solid #667eea;
        padding-bottom: 1.5rem;
      }
      
      h1 { 
        font-size: 2.2rem;
        color: #222;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }
      
      .subtitle {
        font-size: 0.95rem;
        color: #666;
        font-weight: 500;
      }
      
      .status {
        margin: 1.5rem 0;
        padding: 1rem;
        background: #f0f9ff;
        border-left: 4px solid #0ea5e9;
        border-radius: 4px;
        font-size: 0.9rem;
        color: #0369a1;
      }
      
      .status.authenticated {
        background: #f0fdf4;
        border-left-color: #22c55e;
        color: #166534;
      }
      
      .section {
        margin-bottom: 2rem;
      }
      
      .section-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 1rem;
      }
      
      .buttons { 
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }
      
      .buttons.full {
        grid-template-columns: 1fr;
      }
      
      .buttons a { 
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        padding: 0.9rem 1rem;
        border-radius: 10px;
        text-align: center;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
      }
      
      .buttons a:hover { 
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
      }
      
      .buttons a:active {
        transform: translateY(0);
      }
      
      .btn-secondary {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        box-shadow: 0 4px 12px rgba(245, 87, 108, 0.2);
      }
      
      .btn-secondary:hover {
        box-shadow: 0 6px 16px rgba(245, 87, 108, 0.4);
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      .note { 
        padding: 1.25rem;
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border-left: 4px solid #f59e0b;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #92400e;
        margin-top: 1.5rem;
      }
      
      .note strong {
        color: #78350f;
      }
      
      .footer {
        text-align: center;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
        font-size: 0.85rem;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>⛩️ Temple API</h1>
        <p class="subtitle">Explore temples and reviews with GitHub authentication</p>
      </div>
      
      <div class="section">
        <div class="section-title">Authentication</div>
        <div class="buttons full">
          <a href="/auth/github" class="btn-secondary">🔐 Login with GitHub</a>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Account</div>
        <div class="buttons">
          <a href="/auth/status" class="btn-primary">📊 Check Status</a>
          <a href="/auth/logout" class="btn-secondary">🚪 Logout</a>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">API</div>
        <div class="buttons">
          <a href="/api-docs" class="btn-primary">📚 API Docs</a>
          <a href="/temples" class="btn-primary">⛩️ Temples</a>
          <a href="/reviews" class="btn-primary">⭐ Reviews</a>
        </div>
      </div>
      
      <div class="note">
        <strong>Pro Tip:</strong> Login with GitHub to automatically post reviews with your GitHub username. Visit <strong>/auth/github</strong> to start.
      </div>
      
      <div class="footer">
        Temple API v1.0 • Built with Express & Passport.js
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
