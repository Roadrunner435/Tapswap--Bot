# TapSwap Auto Clicker

Welcome to the TapSwap Auto Clicker repository. This script automates the clicking process in the TapSwap game, allowing you to maximize your earnings by running continuously 24/7. Unlike the manual tapping required in the game, this script ensures every second is utilized efficiently.

## Features

- Automates the tap-to-earn process in the TapSwap game.
- Runs continuously 24/7 to maximize earnings.
- Configurable click intervals and target URLs.
- Uses Puppeteer for browser automation.
- Runs About 3 mining Accounts

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Telegram(Android
- Render Account : To deploy and run this code 24/7 without consuming your power and internet connection, you will need a [Render](https://render.com/) account.
- Cron-job.org Account : To run cron job on your server so that it does not go inactive.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/WackyDawg/Tapswap--Bot.git
   cd Tapswap--Bot
   ```
2. Install the required packages:

   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following content:

   ```env
   PORT=3000
   ```
4. Open Telegram on your Android device, navigate to the TapSwapBot, and click the "Start" button. Please note that this procedure is specifically for Android devices, as it does not work on iOS devices.![1716671095113](images/Readme/1716671095113.png)
5. Turn off your mobile data or Wi-Fi connection. Next, click the three dots in the upper-right corner of the screen and select "Reload Page." Once the page reloads, copy the full URL that appears![1716671344482](images/Readme/1716671344482.png)
6. Paste the copied URL into the `urls` array in the `config/config.json` file.![1716671693352](images/Readme/1716671693352.png)
7. 🎉 Voila! Now you can run the script. 🚀

## Usage

1. Start the server:

   ```sh
   node index.js
   ```

   ![1716678281988](images/Readme/1716678281988.png)
2. The frontend server will start running on `http://localhost:3000`. Note that this frontend was created just for fun. The automated clicker will begin operating based on the provided configuration.![1716672376303](images/Readme/1716672376303.png)
