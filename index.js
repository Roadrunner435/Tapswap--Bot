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

  if (!urls || urls.length === 0) {
    console.error("==> Error: No URLs defined in the configuration.");
    process.exit(1);
  }

  console.log(`==> ${urls.length} URLs defined`);

  const browsers = await Promise.all(
    urls.map(() =>
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
        headless: false,
      })
    )
  );

  await Promise.all(
    browsers.map(async (browser, index) => {
      const page = await browser.newPage();
      const url = urls[index % urls.length];
      await performActions(page, url, numberOfClicks);
    })
  );
})();

(async () => {
  const config = await fs.readFile("./config/config.json", "utf8");
  const { numberOfClicks, urls } = JSON.parse(config);

  if (!urls || urls.length === 0) {
    console.error("==> Error: No URLs defined in the configuration.");
    process.exit(1);
  }

  console.log(`==> ${urls.length} URLs defined`);

  const browsers = await Promise.all(
    urls.map(() =>
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
    )
  );

  await Promise.all(
    urls.map(async (url, index) => {
      const browserIndex = index % browsers.length;
      const browser = browsers[browserIndex];
      const page = await browser.newPage();
      await performActions(page, url, numberOfClicks, index);
    })
  );
})();

async function performActions(page, url, numberOfClicks, index) {
  while (true) {
    try {
      console.log(`==> Your service is live 🎉`);
      const accountNumber = `Account${index + 1}`;
      console.log(`==> 🔍Checking for required elements on ${accountNumber}`);

      await page.goto(url, { waitUntil: "networkidle0" });

      const balanceSelector = "h1._h1_tffsq_1";
      const imageSelector = "div#ex1-layer._tapContent_igohf_31 img";

      await page.waitForSelector(imageSelector, { visible: true, timeout: 60000 });
      await page.waitForSelector(balanceSelector, { visible: true, timeout: 60000 });
      console.log(`==> Found necessary elements on ${url}`);

      const balance = await page.$eval(balanceSelector, el => el.textContent.trim());
      console.log(`==> | Success | ${accountNumber} Balance: 🟡 ${balance} |`);

      await delay(1000);

      for (let i = 0; i < numberOfClicks; i++) {
        await page.click(imageSelector);
        await delay(100);
      }
    } catch (error) {
      console.error(`==> Error performing actions on ${url}:`, error);
    }

    await delay(1000);
  }
}

(async () => {
  const config = await fs.readFile("./config/config.json", "utf8");
  const { numberOfClicks, urls } = JSON.parse(config);

  if (!urls || urls.length === 0) {
    console.error("==> Error: No URLs defined in the configuration.");
    process.exit(1);
  }

  console.log(`==> ${urls.length} URLs defined`);

  const browsers = await Promise.all(
    urls.map(() =>
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
    )
  );

  console.log(`==> 🚀Starting up ${browsers.length} clients 🖥️`);

  await Promise.all(
    urls.map(async (url, index) => {
      const browserIndex = index % browsers.length;
      const browser = browsers[browserIndex];
      const page = await browser.newPage();
      await performActions(page, url, numberOfClicks, index);
    })
  );
})();



