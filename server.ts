import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import healthHandler from './api/health.ts';
import nourishMev2Handler from './api/NourishMev2.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Mount serverless /api endpoints in Express
  app.all('/api/health', (req, res) => {
    return healthHandler(req, res);
  });

  app.all('/api/NourishMev2', (req, res) => {
    return nourishMev2Handler(req, res);
  });

  if (!isProd) {
    // In development: mount Vite dev server as middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production: serve static build output
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SilverApron SG] Server running on http://0.0.0.0:${PORT} (Node ${process.version})`);
    console.log(`[SilverApron SG] Endpoints available: /api/health and /api/NourishMev2`);
  });
}

startServer().catch((err) => {
  console.error('[SilverApron SG] Failed to start server:', err);
  process.exit(1);
});
