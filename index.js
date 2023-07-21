const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/screenshot', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL parameter is missing.');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ fullPage: true });
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send('Error capturing screenshot.');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

