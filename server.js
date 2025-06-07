import appInsights from 'applicationinsights';

appInsights.setup('InstrumentationKey=1d905360-39b3-4bc0-8526-211ada0c9f5d;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=8d8ae807-61a4-4bd7-930c-8030663dd4ee')
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .start();

import express from 'express';
import { listBlobs } from './blobStorage.js';
import axios from 'axios';

// server.js
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get('/', async (req, res) => {
  const imageUrls = await listBlobs();
  const html = `
    <html>
      <body>
        <h1>Blob Images</h1>
        ${imageUrls.map(url => `<img src="${url}" style="max-width:300px; margin:10px;" />`).join('')}
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/fail-external', async (req, res) => {
  try {
    await axios.get('https://example.com/invalid-endpoint');
    res.send('should fail');
  } catch (error) {
    res.status(500).send('external call failed');
  }
});

app.get('/test-error', (req, res) => {
  throw new Error('Test error for Application Insights');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
