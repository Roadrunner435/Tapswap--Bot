const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const config = await fs.readFile("./config/config.json", "utf8");
  const { numberOfClicks, urls } = JSON.parse(config);

  const performActions = async (browser, url) => {
    const page = await browser.newPage();
    while (true) {
      try {
        console.log(`Navigating to ${url}`);
        await page.goto(url, { waitUntil: "networkidle0" });

        const balanceSelector = "h1._h1_tffsq_1";
        const imageSelector = "div#ex1-layer._tapContent_igohf_31 img";
        console.log(`Waiting for selectors ${imageSelector} and ${balanceSelector}`);
        await page.waitForSelector(imageSelector, { visible: true, timeout: 60000 });
        await page.waitForSelector(balanceSelector, { visible: true, timeout: 60000 });
        console.log(`Selectors ${imageSelector} and ${balanceSelector} found`);

        // Get the balance text content
        const balance = await page.$eval(balanceSelector, el => el.textContent.trim());
        console.log(`| Success | Balance: 🟡 ${balance} |`);

        await delay(1000);

        for (let i = 0; i < numberOfClicks; i++) {
          await page.click(imageSelector);
          await delay(100);
        }
      } catch (error) {
        console.error(`Error performing actions on ${url}:`, error);
      }

      await delay(1000);
    }
  };

  const browsers = await Promise.all([
    puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      headless: true,
    }),
    puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      headless: true,
    }),
    puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
      headless: true,
    })
  ]);

  await Promise.all(
    browsers.map((browser, index) =>
      performActions(browser, urls[index % urls.length])
    )
  );

  // Do not close the browsers to keep the pages open
  // browsers.forEach(browser => browser.close());
})();
